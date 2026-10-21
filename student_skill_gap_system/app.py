"""
Student Skill Gap Analysis and Course Suggestion System
Flask Application Entry Point
"""
import os
import sqlite3
import json
from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'college_project_secret_key_2026')

DB_PATH = os.path.join(os.path.dirname(__file__), 'database', 'skill_gap.db')

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

CAREERS_DATA = {
    'Data Analyst': {
        'required_skills': ['SQL and Database Management', 'Data Analysis', 'Excel', 'Data Visualization', 'Statistics', 'Communication Skills'],
        'description': 'Transforms raw business data into actionable visual insights and metrics for decision-makers.'
    },
    'Data Scientist': {
        'required_skills': ['Python Programming', 'Statistics', 'Machine Learning', 'Data Analysis', 'SQL and Database Management', 'Data Visualization'],
        'description': 'Applies statistical modeling, machine learning, and advanced algorithms to predict trends.'
    },
    'Machine Learning Engineer': {
        'required_skills': ['Python Programming', 'Machine Learning', 'Data Analysis', 'SQL and Database Management', 'Statistics'],
        'description': 'Researches, designs, and builds scalable AI algorithms and deploys production pipelines.'
    },
    'Business Analyst': {
        'required_skills': ['Excel', 'Data Analysis', 'SQL and Database Management', 'Communication Skills', 'Data Visualization'],
        'description': 'Bridges the gap between IT and business objectives using data analytics.'
    },
    'Python Developer': {
        'required_skills': ['Python Programming', 'SQL and Database Management', 'Communication Skills'],
        'description': 'Writes robust backend server logic, REST APIs, and database integrations using Python.'
    }
}

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'student_id' not in session:
            flash('Please log in to access this page.', 'warning')
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
def index():
    return render_template('index.html', careers=CAREERS_DATA)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')
        department = request.form.get('department', '').strip()
        year_of_study = request.form.get('year_of_study', '').strip()

        if not name or not email or not password or not department or not year_of_study:
            flash('All fields are required.', 'danger')
            return render_template('register.html')

        conn = get_db()
        cursor = conn.cursor()
        cursor.execute('SELECT id FROM students WHERE email = ?', (email,))
        if cursor.fetchone():
            conn.close()
            flash('Email already registered. Please log in.', 'danger')
            return redirect(url_for('login'))

        pwd_hash = generate_password_hash(password)
        cursor.execute('''
        INSERT INTO students (name, email, password_hash, department, year_of_study)
        VALUES (?, ?, ?, ?, ?)
        ''', (name, email, pwd_hash, department, year_of_study))
        conn.commit()
        conn.close()

        flash('Registration successful! Please log in.', 'success')
        return redirect(url_for('login'))

    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')

        conn = get_db()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM students WHERE email = ?', (email,))
        student = cursor.fetchone()
        conn.close()

        if student and check_password_hash(student['password_hash'], password):
            session['student_id'] = student['id']
            session['student_name'] = student['name']
            session['student_email'] = student['email']
            session['department'] = student['department']
            session['year_of_study'] = student['year_of_study']
            session['target_career'] = student['target_career']
            flash(f"Welcome back, {student['name']}!", 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid email or password.', 'danger')

    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    flash('You have been logged out successfully.', 'info')
    return redirect(url_for('index'))

@app.route('/dashboard')
@login_required
def dashboard():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM students WHERE id = ?', (session['student_id'],))
    student = cursor.fetchone()

    cursor.execute('''
    SELECT * FROM assessments WHERE student_id = ? ORDER BY created_at DESC
    ''', (session['student_id'],))
    assessments = cursor.fetchall()

    latest_assessment = assessments[0] if assessments else None
    recommended_courses = []

    if latest_assessment:
        try:
            missing_skills = json.loads(latest_assessment['missing_skills'])
            if missing_skills:
                placeholders = ','.join(['?'] * len(missing_skills))
                query = f'SELECT * FROM courses WHERE skill_covered IN ({placeholders}) LIMIT 6'
                cursor.execute(query, missing_skills)
                recommended_courses = cursor.fetchall()
        except Exception:
            pass

    conn.close()
    return render_template('dashboard.html',
                           student=student,
                           latest=latest_assessment,
                           assessments=assessments,
                           recommended_courses=recommended_courses)

@app.route('/analyze', methods=['GET', 'POST'])
def skill_analysis():
    selected_career = request.args.get('career', 'Data Analyst')
    if request.method == 'POST':
        career = request.form.get('career', 'Data Analyst')
        existing_skills = request.form.getlist('skills')

        required_skills = CAREERS_DATA.get(career, {}).get('required_skills', [])

        missing_skills = [s for s in required_skills if s not in existing_skills]
        matched_skills = [s for s in required_skills if s in existing_skills]

        if len(required_skills) > 0:
            skill_gap_pct = round((len(missing_skills) / len(required_skills)) * 100, 1)
        else:
            skill_gap_pct = 0.0

        if 'student_id' in session:
            conn = get_db()
            cursor = conn.cursor()
            cursor.execute('''
            INSERT INTO assessments (student_id, target_career, existing_skills, required_skills, missing_skills, skill_gap_percentage)
            VALUES (?, ?, ?, ?, ?, ?)
            ''', (
                session['student_id'],
                career,
                json.dumps(existing_skills),
                json.dumps(required_skills),
                json.dumps(missing_skills),
                skill_gap_pct
            ))
            cursor.execute('UPDATE students SET target_career = ? WHERE id = ?', (career, session['student_id']))
            conn.commit()
            conn.close()

        conn = get_db()
        cursor = conn.cursor()
        recommended_courses = []
        if missing_skills:
            placeholders = ','.join(['?'] * len(missing_skills))
            cursor.execute(f'SELECT * FROM courses WHERE skill_covered IN ({placeholders})', missing_skills)
            recommended_courses = cursor.fetchall()
        conn.close()

        return render_template('recommendations.html',
                               career=career,
                               existing_skills=existing_skills,
                               required_skills=required_skills,
                               matched_skills=matched_skills,
                               missing_skills=missing_skills,
                               skill_gap_pct=skill_gap_pct,
                               courses=recommended_courses)

    return render_template('skill_analysis.html', careers=CAREERS_DATA, selected_career=selected_career)

@app.route('/recommendations')
def recommendations():
    skill = request.args.get('skill', '')
    conn = get_db()
    cursor = conn.cursor()
    if skill:
        cursor.execute('SELECT * FROM courses WHERE skill_covered = ?', (skill,))
    else:
        cursor.execute('SELECT * FROM courses')
    courses = cursor.fetchall()
    conn.close()
    return render_template('recommendations.html', courses=courses, filter_skill=skill)

@app.route('/careers')
def careers():
    return render_template('careers.html', careers=CAREERS_DATA)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        flash('Thank you for reaching out! Your message has been received.', 'success')
        return redirect(url_for('contact'))
    return render_template('contact.html')

if __name__ == '__main__':
    if not os.path.exists(DB_PATH):
        try:
            import database.init_db as init_db
            init_db.init_database()
        except Exception as e:
            print("DB init error:", e)
    app.run(debug=True, port=5000)
