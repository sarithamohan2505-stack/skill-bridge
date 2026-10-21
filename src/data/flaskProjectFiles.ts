export interface FlaskFile {
  path: string;
  name: string;
  language: string;
  category: 'Backend' | 'Database' | 'Templates' | 'Static' | 'Documentation';
  content: string;
}

export const FLASK_PROJECT_FILES: FlaskFile[] = [
  {
    path: 'requirements.txt',
    name: 'requirements.txt',
    language: 'plaintext',
    category: 'Backend',
    content: `Flask==3.0.2
Werkzeug==3.0.1
Jinja2==3.1.3
python-dotenv==1.0.1
`
  },
  {
    path: 'README.md',
    name: 'README.md',
    language: 'markdown',
    category: 'Documentation',
    content: `# Student Skill Gap Analysis and Course Suggestion System
A comprehensive college mini-project built with **Python (Flask)**, **SQLite**, **HTML5/Bootstrap 5**, and **JavaScript (Chart.js)**.

---

## 🎯 1. Project Overview
This system helps college students:
1. Select target career roles (e.g., Data Analyst, Data Scientist, ML Engineer, Python Developer, Business Analyst).
2. Assess their existing skills and proficiency levels.
3. Quantify their **Skill Gap Percentage** using the formula:
   $$\\text{Skill Gap \\%} = \\left(\\frac{\\text{Missing Skills}}{\\text{Total Required Skills}}\\right) \\times 100$$
4. Receive targeted, real-world course recommendations (freeCodeCamp, Harvard CS50, Kaggle Learn, Khan Academy, Coursera) to bridge the missing competencies.
5. Track their assessment history on a personalized Student Dashboard.

---

## 💻 2. Windows & VS Code Setup Instructions (Step-by-Step)

### Prerequisites:
- Python 3.9+ installed on Windows ([python.org/downloads](https://www.python.org/downloads)).
  * *Important:* Ensure you check **"Add Python to PATH"** during installation.
- Visual Studio Code installed ([code.visualstudio.com](https://code.visualstudio.com)).

### Step 1: Extract the ZIP
Extract \`student_skill_gap_system.zip\` to a clean folder (e.g. \`C:\\Users\\YourName\\Desktop\\student_skill_gap_system\`).

### Step 2: Open in Visual Studio Code
1. Open VS Code.
2. Click **File -> Open Folder...** and select the \`student_skill_gap_system\` folder.
3. Open the integrated terminal in VS Code: **Terminal -> New Terminal** (or press \`Ctrl + \`\`).

### Step 3: Create & Activate a Python Virtual Environment
In the VS Code terminal, run:
\`\`\`powershell
# Create virtual environment
python -m venv venv

# Activate on Windows PowerShell:
.\\venv\\Scripts\\Activate.ps1
# Or on Command Prompt (CMD):
.\\venv\\Scripts\\activate.bat
\`\`\`
*(If PowerShell displays an ExecutionPolicy error, run: \`Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass\` then re-run the activate command).*

### Step 4: Install Dependencies
\`\`\`powershell
pip install -r requirements.txt
\`\`\`

### Step 5: Initialize the SQLite Database
Run the database initialization script to create tables and pre-populate courses and sample accounts:
\`\`\`powershell
python database/init_db.py
\`\`\`
You will see: \`[OK] SQLite database initialized successfully at database/skill_gap.db\`

### Step 6: Run the Flask Application
\`\`\`powershell
python app.py
\`\`\`
You will see:
\`\`\`text
 * Running on http://127.0.0.1:5000
 * Press CTRL+C to quit
\`\`\`

### Step 7: Open in Browser
Open your browser and visit: **http://127.0.0.1:5000**

---

## 🔑 3. Pre-Seeded Sample Accounts for Testing
| Student Name | Email | Password | Department | Year |
| :--- | :--- | :--- | :--- | :--- |
| **Alex Chen** | \`alex@college.edu\` | \`password123\` | Computer Science | 3rd Year |
| **Priya Sharma** | \`priya@college.edu\` | \`password123\` | Information Tech | 4th Year |
| **Rahul Patel** | \`rahul@college.edu\` | \`password123\` | Electronics | 2nd Year |

You can also register a brand new student account on the **/register** page!

---

## 🧪 4. Complete Testing Guide
1. **Registration & Login**:
   - Go to \`/register\` -> enter name, email, department, year, password -> submit -> redirects to login with success flash.
   - Enter credentials -> logs into \`/dashboard\`.
2. **Skill Gap Analysis**:
   - Navigate to \`/analyze\`.
   - Select "Data Analyst" as target career. Notice required skills populate automatically.
   - Check off skills you currently have (e.g., "Excel", "Communication Skills") and assign proficiency.
   - Click "Analyze Skills".
   - View Skill Gap \\% (e.g., 66.7%), Matched Skills list, Missing Skills list, and dynamic Chart.js doughnut.
3. **Course Recommendations**:
   - On the results page or \`/recommendations\`, examine how courses are dynamically matched to your missing skills.
   - Click any course card to visit the verified external learning resource.
4. **Dashboard History**:
   - Navigate to \`/dashboard\` to see your saved assessment history and updated readiness score.

---

## 🏛️ 5. Project Architecture & Database Schema
- **\`students\` Table**: \`id\`, \`name\`, \`email\`, \`password_hash\`, \`department\`, \`year_of_study\`, \`created_at\`
- **\`courses\` Table**: \`id\`, \`title\`, \`skill_covered\`, \`platform\`, \`description\`, \`difficulty\`, \`duration\`, \`url\`, \`is_free\`
- **\`assessments\` Table**: \`id\`, \`student_id\`, \`target_career\`, \`matched_skills\`, \`missing_skills\`, \`skill_gap_percentage\`, \`timestamp\`
`
  },
  {
    path: 'data/courses.csv',
    name: 'courses.csv',
    language: 'plaintext',
    category: 'Database',
    content: `title,skill_covered,platform,description,difficulty,duration,url,is_free
"Scientific Computing with Python","Python Programming","freeCodeCamp","Learn Python fundamentals, loops, data structures, and OOP with hands-on coding.","Beginner","300 Hours","https://www.freecodecamp.org/learn/scientific-computing-with-python/",1
"CS50P: Introduction to Programming with Python","Python Programming","Harvard University","Harvard introductory course covering Python syntax, testing, file I/O, and libraries.","Beginner","10 Weeks","https://cs50.harvard.edu/python/",1
"Kaggle: Python Micro-Course","Python Programming","Kaggle Learn","Fast-paced tutorial covering Python data structures and syntax for data science.","Beginner","5 Hours","https://www.kaggle.com/learn/python",1
"Relational Database Certification","SQL and Database Management","freeCodeCamp","Master SQL, PostgreSQL, relational schema design, and terminal commands.","Intermediate","300 Hours","https://www.freecodecamp.org/learn/relational-database/",1
"Intro to SQL: Querying Relational Databases","SQL and Database Management","Kaggle Learn","Learn standard SQL queries, GROUP BY, HAVING, and table joins.","Beginner","3 Hours","https://www.kaggle.com/learn/intro-to-sql",1
"CS50S: Introduction to Databases with SQL","SQL and Database Management","Harvard University","In-depth exploration of database design, normalization, indexes, and queries.","Intermediate","7 Weeks","https://cs50.harvard.edu/sql/",1
"Data Analysis with Python","Data Analysis","freeCodeCamp","Process datasets using NumPy and Pandas to extract actionable statistical insights.","Intermediate","300 Hours","https://www.freecodecamp.org/learn/data-analysis-with-python/",1
"Google Data Analytics Professional Certificate","Data Analysis","Coursera & Google","Industry-standard training covering data cleaning, analysis, spreadsheets, and SQL.","Beginner","6 Months","https://www.coursera.org/professional-certificates/google-data-analytics",0
"High School & College Statistics","Statistics","Khan Academy","Probability distributions, hypothesis testing, p-values, and regression models.","Beginner","40 Hours","https://www.khanacademy.org/math/statistics-probability",1
"Microsoft Excel Official Training Video Library","Excel","Microsoft Support","Official training covering formulas (VLOOKUP, XLOOKUP), pivot tables, and charts.","Beginner","15 Hours","https://support.microsoft.com/en-us/office/excel-video-training-9bc05390-e94c-46af-a5b3-d7c22f6990bb",1
"Data Visualization with Seaborn and Matplotlib","Data Visualization","Kaggle Learn","Create informative bar charts, heatmaps, and scatter plots to tell visual stories.","Beginner","4 Hours","https://www.kaggle.com/learn/data-visualization",1
"Machine Learning Specialization by Andrew Ng","Machine Learning","Coursera & DeepLearning.AI","World-famous machine learning course covering supervised and unsupervised algorithms.","Intermediate","3 Months","https://www.coursera.org/specializations/machine-learning-introduction",0
"Intro to Machine Learning","Machine Learning","Kaggle Learn","Build your first predictive models using Decision Trees and Random Forests.","Beginner","3 Hours","https://www.kaggle.com/learn/intro-to-machine-learning",1
"Effective Communication for Engineers & Analysts","Communication Skills","Coursera","Interpersonal clarity, slide design, technical writing, and presentation skills.","Beginner","4 Weeks","https://www.coursera.org/learn/effective-communication",0
"Professional Technical Documentation","Communication Skills","freeCodeCamp","Learn how to articulate technical concepts, create docs, and present ideas clearly.","Beginner","10 Hours","https://www.freecodecamp.org/news/how-to-write-technical-documentation/",1
`
  },
  {
    path: 'database/init_db.py',
    name: 'init_db.py',
    language: 'python',
    category: 'Database',
    content: `"""
Database Initialization Script for SQLite
Run: python database/init_db.py
"""
import sqlite3
import os
import csv
from werkzeug.security import generate_password_hash

DB_PATH = os.path.join(os.path.dirname(__file__), 'skill_gap.db')
CSV_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'courses.csv')

def init_database():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # 1. Students Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        department TEXT NOT NULL,
        year_of_study TEXT NOT NULL,
        target_career TEXT DEFAULT 'Data Analyst',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    # 2. Courses Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        skill_covered TEXT NOT NULL,
        platform TEXT NOT NULL,
        description TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        duration TEXT NOT NULL,
        url TEXT NOT NULL,
        is_free INTEGER DEFAULT 1
    )
    ''')

    # 3. Assessments Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS assessments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        target_career TEXT NOT NULL,
        existing_skills TEXT NOT NULL,
        required_skills TEXT NOT NULL,
        missing_skills TEXT NOT NULL,
        skill_gap_percentage REAL NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES students(id)
    )
    ''')

    # Seed Sample Students if empty
    cursor.execute('SELECT COUNT(*) FROM students')
    if cursor.fetchone()[0] == 0:
        sample_users = [
            ('Alex Chen', 'alex@college.edu', generate_password_hash('password123'), 'Computer Science & Engineering', '3rd Year', 'Data Scientist'),
            ('Priya Sharma', 'priya@college.edu', generate_password_hash('password123'), 'Information Technology', '4th Year', 'Data Analyst'),
            ('Rahul Patel', 'rahul@college.edu', generate_password_hash('password123'), 'Electronics & Communication', '2nd Year', 'Python Developer')
        ]
        cursor.executemany('''
        INSERT INTO students (name, email, password_hash, department, year_of_study, target_career)
        VALUES (?, ?, ?, ?, ?, ?)
        ''', sample_users)
        print("[+] Seeded 3 sample student accounts.")

    # Seed Courses from CSV if empty
    cursor.execute('SELECT COUNT(*) FROM courses')
    if cursor.fetchone()[0] == 0 and os.path.exists(CSV_PATH):
        with open(CSV_PATH, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            courses_to_insert = [
                (
                    row['title'],
                    row['skill_covered'],
                    row['platform'],
                    row['description'],
                    row['difficulty'],
                    row['duration'],
                    row['url'],
                    int(row['is_free'])
                )
                for row in reader
            ]
            cursor.executemany('''
            INSERT INTO courses (title, skill_covered, platform, description, difficulty, duration, url, is_free)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', courses_to_insert)
        print(f"[+] Loaded {len(courses_to_insert)} courses into database.")

    conn.commit()
    conn.close()
    print(f"[OK] SQLite database initialized successfully at: {DB_PATH}")

if __name__ == '__main__':
    init_database()
`
  },
  {
    path: 'app.py',
    name: 'app.py',
    language: 'python',
    category: 'Backend',
    content: `"""
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

# Career Definitions & Required Skills
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

# Login Required Decorator
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
    # Fetch student profile
    cursor.execute('SELECT * FROM students WHERE id = ?', (session['student_id'],))
    student = cursor.fetchone()

    # Fetch recent assessments
    cursor.execute('''
    SELECT * FROM assessments WHERE student_id = ? ORDER BY created_at DESC
    ''', (session['student_id'],))
    assessments = cursor.fetchall()

    latest_assessment = assessments[0] if assessments else None
    recommended_courses = []

    if latest_assessment:
        missing_skills = json.loads(latest_assessment['missing_skills'])
        if missing_skills:
            placeholders = ','.join(['?'] * len(missing_skills))
            query = f'SELECT * FROM courses WHERE skill_covered IN ({placeholders}) LIMIT 6'
            cursor.execute(query, missing_skills)
            recommended_courses = cursor.fetchall()

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

        # Formula: Missing Skills = Required Skills - Existing Skills
        missing_skills = [s for s in required_skills if s not in existing_skills]
        matched_skills = [s for s in required_skills if s in existing_skills]

        # Skill Gap Percentage = (Missing Skills / Total Required Skills) * 100
        if len(required_skills) > 0:
            skill_gap_pct = round((len(missing_skills) / len(required_skills)) * 100, 1)
        else:
            skill_gap_pct = 0.0

        # Save to database if student is logged in
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

        # Query recommended courses for missing skills
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
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        flash('Thank you for reaching out! Your message has been received.', 'success')
        return redirect(url_for('contact'))
    return render_template('contact.html')

if __name__ == '__main__':
    # Auto-initialize database if not present
    if not os.path.exists(DB_PATH):
        import database.init_db as init_db
        init_db.init_database()
    app.run(debug=True, port=5000)
`
  },
  {
    path: 'templates/base.html',
    name: 'base.html',
    language: 'html',
    category: 'Templates',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}Student Skill Gap Analysis{% endblock %}</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <!-- Custom CSS -->
    <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
</head>
<body class="d-flex flex-column min-vh-100 bg-light">
    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow-sm">
        <div class="container">
            <a class="navbar-brand fw-bold d-flex align-items-center gap-2" href="{{ url_for('index') }}">
                <i class="bi bi-mortarboard-fill text-warning fs-4"></i>
                <span>SkillBridge AI</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navMenu">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item"><a class="nav-link" href="{{ url_for('index') }}">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="{{ url_for('skill_analysis') }}">Skill Analysis</a></li>
                    <li class="nav-item"><a class="nav-link" href="{{ url_for('recommendations') }}">Explore Courses</a></li>
                    <li class="nav-item"><a class="nav-link" href="{{ url_for('careers') }}">Career Roles</a></li>
                    <li class="nav-item"><a class="nav-link" href="{{ url_for('about') }}">About</a></li>
                    <li class="nav-item"><a class="nav-link" href="{{ url_for('contact') }}">Contact</a></li>
                </ul>
                <div class="d-flex align-items-center gap-2">
                    {% if session.get('student_id') %}
                        <a href="{{ url_for('dashboard') }}" class="btn btn-outline-light btn-sm">
                            <i class="bi bi-speedometer2 me-1"></i> Dashboard
                        </a>
                        <a href="{{ url_for('logout') }}" class="btn btn-warning btn-sm text-dark fw-semibold">
                            <i class="bi bi-box-arrow-right me-1"></i> Logout
                        </a>
                    {% else %}
                        <a href="{{ url_for('login') }}" class="btn btn-outline-light btn-sm">Login</a>
                        <a href="{{ url_for('register') }}" class="btn btn-warning btn-sm text-dark fw-semibold">Register</a>
                    {% endif %}
                </div>
            </div>
        </div>
    </nav>

    <!-- Flash Messages -->
    <div class="container mt-3">
        {% with messages = get_flashed_messages(with_categories=true) %}
            {% if messages %}
                {% for category, message in messages %}
                    <div class="alert alert-{{ category }} alert-dismissible fade show" role="alert">
                        {{ message }}
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                {% endfor %}
            {% endif %}
        {% endwith %}
    </div>

    <!-- Main Content Block -->
    <main class="flex-grow-1">
        {% block content %}{% endblock %}
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white pt-5 pb-3 mt-5">
        <div class="container">
            <div class="row g-4">
                <div class="col-md-4">
                    <h5 class="text-warning fw-bold"><i class="bi bi-mortarboard-fill me-2"></i>SkillBridge</h5>
                    <p class="text-secondary small">A College Academic Mini-Project for Student Skill Gap Analysis & Smart Course Recommendations based on target industry benchmarks.</p>
                </div>
                <div class="col-md-4">
                    <h6 class="text-white fw-bold">Quick Links</h6>
                    <ul class="list-unstyled small">
                        <li><a href="{{ url_for('skill_analysis') }}" class="text-secondary text-decoration-none">Run Skill Gap Analysis</a></li>
                        <li><a href="{{ url_for('recommendations') }}" class="text-secondary text-decoration-none">Verified Course Catalog</a></li>
                        <li><a href="{{ url_for('careers') }}" class="text-secondary text-decoration-none">Career Roadmaps</a></li>
                        <li><a href="{{ url_for('about') }}" class="text-secondary text-decoration-none">Project Purpose & Architecture</a></li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <h6 class="text-white fw-bold">Academic Project Info</h6>
                    <p class="text-secondary small mb-1"><strong>Stack:</strong> Python Flask, SQLite, Bootstrap 5, Chart.js</p>
                    <p class="text-secondary small mb-1"><strong>Department:</strong> Computer Science & Engineering</p>
                    <p class="text-secondary small">Tested locally in Visual Studio Code on Windows.</p>
                </div>
            </div>
            <hr class="border-secondary my-3">
            <p class="text-center text-secondary small mb-0">&copy; 2026 Student Skill Gap Analysis System. Built for academic demonstration.</p>
        </div>
    </footer>

    <!-- Bootstrap Bundle JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="{{ url_for('static', filename='js/script.js') }}"></script>
    {% block scripts %}{% endblock %}
</body>
</html>
`
  },
  {
    path: 'templates/index.html',
    name: 'index.html',
    language: 'html',
    category: 'Templates',
    content: `{% extends "base.html" %}
{% block title %}Home - Student Skill Gap Analysis{% endblock %}

{% block content %}
<!-- Hero Section -->
<section class="hero-section py-5 text-white">
    <div class="container py-4 text-center">
        <span class="badge bg-warning text-dark px-3 py-2 rounded-pill fw-semibold mb-3">College Final/Mini Project Demonstration</span>
        <h1 class="display-4 fw-extrabold mb-3">Discover Your Skills.<br><span class="text-warning">Bridge Your Gaps.</span> Build Your Future.</h1>
        <p class="lead mb-4 mx-auto" style="max-width: 720px; opacity: 0.92;">
            An intelligent, data-driven skill assessment platform designed to help students map their competencies against real-world industry benchmarks and unlock tailored course recommendations.
        </p>
        <div class="d-flex justify-content-center gap-3 flex-wrap">
            <a href="{{ url_for('skill_analysis') }}" class="btn btn-warning btn-lg fw-bold px-4 shadow">
                <i class="bi bi-graph-up-arrow me-2"></i>Analyze My Skills
            </a>
            <a href="{{ url_for('recommendations') }}" class="btn btn-outline-light btn-lg px-4">
                <i class="bi bi-book-half me-2"></i>Explore Courses
            </a>
            {% if not session.get('student_id') %}
            <a href="{{ url_for('register') }}" class="btn btn-light btn-lg px-4 text-primary fw-semibold">
                Get Started
            </a>
            {% endif %}
        </div>
    </div>
</section>

<!-- Features Section -->
<section class="py-5 bg-white">
    <div class="container">
        <div class="text-center mb-5">
            <h2 class="fw-bold">Intelligent Career Guidance Features</h2>
            <p class="text-muted">Designed specifically to bridge the academia-to-industry employability divide.</p>
        </div>
        <div class="row g-4">
            <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm p-4 text-center feature-card">
                    <div class="icon-bubble mx-auto mb-3 bg-primary text-white">
                        <i class="bi bi-bullseye fs-3"></i>
                    </div>
                    <h4 class="fw-bold">Mathematical Skill Gap Analysis</h4>
                    <p class="text-muted">Computes your exact skill deficit percentage against target job roles using standardized skill difference formulas.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm p-4 text-center feature-card">
                    <div class="icon-bubble mx-auto mb-3 bg-purple text-white">
                        <i class="bi bi-compass fs-3"></i>
                    </div>
                    <h4 class="fw-bold">Targeted Career Exploration</h4>
                    <p class="text-muted">Explore curated career paths including Data Analyst, Data Scientist, ML Engineer, Python Developer, and Business Analyst.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm p-4 text-center feature-card">
                    <div class="icon-bubble mx-auto mb-3 bg-success text-white">
                        <i class="bi bi-award fs-3"></i>
                    </div>
                    <h4 class="fw-bold">Curated Course Suggestions</h4>
                    <p class="text-muted">Receive 100% verified, real-world course recommendations from freeCodeCamp, Harvard CS50, Kaggle Learn, and Khan Academy.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- How It Works Section -->
<section class="py-5 bg-light">
    <div class="container">
        <div class="text-center mb-5">
            <h2 class="fw-bold">How It Works</h2>
            <p class="text-muted">Three simple steps to transition from academic learning to career readiness.</p>
        </div>
        <div class="row g-4 text-center">
            <div class="col-md-4">
                <div class="p-3">
                    <div class="step-badge mx-auto mb-3">1</div>
                    <h5 class="fw-bold">Choose Career & Enter Skills</h5>
                    <p class="text-muted small">Select your target profession and check the skills you have learned in college coursework or self-study.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="p-3">
                    <div class="step-badge mx-auto mb-3">2</div>
                    <h5 class="fw-bold">Automated Gap Calculation</h5>
                    <p class="text-muted small">Our algorithm compares existing skills with market requirements and determines your precise deficiency percentage.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="p-3">
                    <div class="step-badge mx-auto mb-3">3</div>
                    <h5 class="fw-bold">Follow Course Recommendations</h5>
                    <p class="text-muted small">Access free, top-rated learning resources specifically addressing your missing skills to become job-ready.</p>
                </div>
            </div>
        </div>
    </div>
</section>
{% endblock %}
`
  },
  {
    path: 'templates/skill_analysis.html',
    name: 'skill_analysis.html',
    language: 'html',
    category: 'Templates',
    content: `{% extends "base.html" %}
{% block title %}Skill Gap Analysis{% endblock %}

{% block content %}
<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-lg-9">
            <div class="card border-0 shadow-sm p-4 p-md-5">
                <div class="d-flex align-items-center gap-3 mb-4">
                    <div class="bg-primary text-white p-3 rounded-circle">
                        <i class="bi bi-calculator fs-4"></i>
                    </div>
                    <div>
                        <h2 class="fw-bold mb-1">Skill Gap Assessment</h2>
                        <p class="text-muted mb-0">Evaluate your current skills against industry standard career requirements.</p>
                    </div>
                </div>

                <form method="POST" action="{{ url_for('skill_analysis') }}" id="analysisForm">
                    <!-- Target Career Selection -->
                    <div class="mb-4">
                        <label class="form-label fw-bold">Select Target Career / Job Role</label>
                        <select name="career" id="careerSelect" class="form-select form-select-lg" required>
                            {% for c_name, c_info in careers.items() %}
                                <option value="{{ c_name }}" {% if c_name == selected_career %}selected{% endif %}>
                                    {{ c_name }}
                                </option>
                            {% endfor %}
                        </select>
                        <div class="form-text" id="careerDesc"></div>
                    </div>

                    <!-- Required Skills Display -->
                    <div class="mb-4 p-3 bg-light rounded border">
                        <h6 class="fw-bold text-primary mb-2">Required Skills for this Role:</h6>
                        <div id="requiredSkillsBadges" class="d-flex flex-wrap gap-2"></div>
                    </div>

                    <!-- Existing Skills Selection -->
                    <div class="mb-4">
                        <label class="form-label fw-bold d-flex justify-content-between">
                            <span>Check All Skills You Currently Possess:</span>
                            <span class="text-muted small">Select your proficiencies</span>
                        </label>
                        <div class="row g-2">
                            {% set all_skills = [
                                'Python Programming',
                                'SQL and Database Management',
                                'Data Analysis',
                                'Statistics',
                                'Excel',
                                'Data Visualization',
                                'Machine Learning',
                                'Communication Skills'
                            ] %}
                            {% for skill in all_skills %}
                            <div class="col-md-6">
                                <div class="form-check p-2 border rounded bg-white">
                                    <input class="form-check-input ms-1 me-2" type="checkbox" name="skills" value="{{ skill }}" id="skill_{{ loop.index }}">
                                    <label class="form-check-label fw-semibold" for="skill_{{ loop.index }}">
                                        {{ skill }}
                                    </label>
                                </div>
                            </div>
                            {% endfor %}
                        </div>
                    </div>

                    <div class="text-end">
                        <button type="submit" class="btn btn-primary btn-lg px-4 shadow">
                            <i class="bi bi-cpu me-2"></i>Analyze Skills Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<script>
const careersData = {{ careers | tojson }};
const careerSelect = document.getElementById('careerSelect');
const careerDesc = document.getElementById('careerDesc');
const requiredBadges = document.getElementById('requiredSkillsBadges');

function updateCareerView() {
    const selected = careerSelect.value;
    const info = careersData[selected];
    if (info) {
        careerDesc.textContent = info.description;
        requiredBadges.innerHTML = info.required_skills.map(s => \`<span class="badge bg-secondary px-3 py-2">\${s}</span>\`).join(' ');
    }
}
careerSelect.addEventListener('change', updateCareerView);
updateCareerView();
</script>
{% endblock %}
`
  },
  {
    path: 'templates/recommendations.html',
    name: 'recommendations.html',
    language: 'html',
    category: 'Templates',
    content: `{% extends "base.html" %}
{% block title %}Skill Gap Results & Recommendations{% endblock %}

{% block content %}
<div class="container py-5">
    {% if skill_gap_pct is defined %}
    <!-- Assessment Summary Card -->
    <div class="card border-0 shadow-sm p-4 mb-4">
        <div class="row align-items-center">
            <div class="col-md-8">
                <span class="badge bg-primary px-3 py-2 rounded-pill mb-2">Target Career: {{ career }}</span>
                <h2 class="fw-bold">Your Skill Gap Analysis Results</h2>
                <p class="text-muted mb-3">
                    Calculated via: <code>Skill Gap % = (Missing Skills / Total Required Skills) × 100</code>
                </p>

                <div class="row g-3">
                    <div class="col-sm-4">
                        <div class="p-3 bg-light rounded text-center border">
                            <div class="fs-3 fw-bold text-primary">{{ required_skills | length }}</div>
                            <div class="small text-muted">Required Skills</div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="p-3 bg-light rounded text-center border">
                            <div class="fs-3 fw-bold text-success">{{ matched_skills | length }}</div>
                            <div class="small text-muted">Matched Skills</div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="p-3 bg-light rounded text-center border">
                            <div class="fs-3 fw-bold text-danger">{{ missing_skills | length }}</div>
                            <div class="small text-muted">Missing Skills</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 text-center mt-4 mt-md-0">
                <div class="position-relative d-inline-block">
                    <canvas id="gapChart" width="180" height="180"></canvas>
                </div>
                <h5 class="fw-bold mt-2 text-danger">Skill Gap: {{ skill_gap_pct }}%</h5>
            </div>
        </div>

        <hr class="my-4">

        <div class="row g-4">
            <div class="col-md-6">
                <h5 class="fw-bold text-success"><i class="bi bi-check-circle-fill me-2"></i>Skills You Already Have</h5>
                {% if matched_skills %}
                    <ul class="list-group">
                    {% for s in matched_skills %}
                        <li class="list-group-item list-group-item-success d-flex justify-content-between align-items-center">
                            {{ s }}
                            <span class="badge bg-success">Matched</span>
                        </li>
                    {% endfor %}
                    </ul>
                {% else %}
                    <p class="text-muted small">No matching skills detected for this role yet. Don't worry—the recommended courses below will get you started!</p>
                {% endif %}
            </div>
            <div class="col-md-6">
                <h5 class="fw-bold text-danger"><i class="bi bi-exclamation-triangle-fill me-2"></i>Skills You Need to Learn</h5>
                {% if missing_skills %}
                    <ul class="list-group">
                    {% for s in missing_skills %}
                        <li class="list-group-item list-group-item-danger d-flex justify-content-between align-items-center">
                            {{ s }}
                            <span class="badge bg-danger">Action Needed</span>
                        </li>
                    {% endfor %}
                    </ul>
                {% else %}
                    <div class="alert alert-success">
                        <strong>Outstanding!</strong> You have matched 100% of the core skills for {{ career }}.
                    </div>
                {% endif %}
            </div>
        </div>
    </div>
    {% endif %}

    <!-- Recommended Courses Header -->
    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
            <h3 class="fw-bold mb-0">Recommended Courses</h3>
            <p class="text-muted mb-0">Verified learning paths to close your identified skill gaps.</p>
        </div>
        <a href="{{ url_for('skill_analysis') }}" class="btn btn-outline-primary btn-sm">
            <i class="bi bi-arrow-repeat me-1"></i>Perform New Analysis
        </a>
    </div>

    <!-- Course Cards Grid -->
    <div class="row g-4">
        {% if courses %}
            {% for c in courses %}
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 border-0 shadow-sm course-card">
                    <div class="card-body d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <span class="badge bg-primary">{{ c.skill_covered }}</span>
                            <span class="badge bg-secondary">{{ c.platform }}</span>
                        </div>
                        <h5 class="card-title fw-bold">{{ c.title }}</h5>
                        <p class="card-text text-muted small flex-grow-1">{{ c.description }}</p>
                        <div class="py-2 border-top border-bottom small text-secondary d-flex justify-content-between mb-3">
                            <span><i class="bi bi-bar-chart-fill me-1"></i>{{ c.difficulty }}</span>
                            <span><i class="bi bi-clock-fill me-1"></i>{{ c.duration }}</span>
                        </div>
                        <a href="{{ c.url }}" target="_blank" rel="noopener noreferrer" class="btn btn-primary w-100">
                            <i class="bi bi-box-arrow-up-right me-1"></i>Start Course
                        </a>
                    </div>
                </div>
            </div>
            {% endfor %}
        {% else %}
            <div class="col-12 text-center py-5">
                <i class="bi bi-check2-all text-success display-3"></i>
                <h4 class="fw-bold mt-3">No Missing Skills Found!</h4>
                <p class="text-muted">You already meet all the core requirements for this career track.</p>
                <a href="{{ url_for('careers') }}" class="btn btn-outline-primary">Explore Other Careers</a>
            </div>
        {% endif %}
    </div>
</div>

{% if skill_gap_pct is defined %}
<script>
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('gapChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Skills Matched', 'Skill Gap'],
            datasets: [{
                data: [{{ matched_skills | length }}, {{ missing_skills | length }}],
                backgroundColor: ['#198754', '#dc3545'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: false,
            cutout: '70%',
            plugins: {
                legend: { display: false }
            }
        }
    });
});
</script>
{% endif %}
{% endblock %}
`
  },
  {
    path: 'templates/dashboard.html',
    name: 'dashboard.html',
    language: 'html',
    category: 'Templates',
    content: `{% extends "base.html" %}
{% block title %}Dashboard - {{ student.name }}{% endblock %}

{% block content %}
<div class="container py-5">
    <!-- Welcome Header -->
    <div class="card bg-primary text-white border-0 shadow-sm p-4 mb-4">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
                <span class="badge bg-warning text-dark px-3 py-1 mb-2">Student Portal</span>
                <h2 class="fw-bold mb-1">Welcome back, {{ student.name }}!</h2>
                <p class="mb-0 opacity-75">
                    {{ student.department }} &bull; {{ student.year_of_study }} &bull; Target Career: <strong>{{ student.target_career }}</strong>
                </p>
            </div>
            <a href="{{ url_for('skill_analysis') }}" class="btn btn-warning text-dark fw-bold px-3">
                <i class="bi bi-graph-up-arrow me-1"></i>New Skill Analysis
            </a>
        </div>
    </div>

    <!-- Latest Assessment Result Overview -->
    {% if latest %}
    <div class="row g-4 mb-4">
        <div class="col-md-4">
            <div class="card border-0 shadow-sm p-4 text-center h-100">
                <h6 class="text-muted fw-bold">Current Skill Gap</h6>
                <div class="display-4 fw-bold text-danger my-2">{{ latest.skill_gap_percentage }}%</div>
                <p class="text-muted small mb-0">For {{ latest.target_career }}</p>
            </div>
        </div>
        <div class="col-md-8">
            <div class="card border-0 shadow-sm p-4 h-100">
                <h5 class="fw-bold mb-3">Action Items for {{ latest.target_career }}</h5>
                <div class="mb-2">
                    <strong class="text-danger small">Missing Skills to Master:</strong>
                    <div class="d-flex flex-wrap gap-2 mt-1">
                        {% set missing = latest.missing_skills | from_json if latest.missing_skills is string else latest.missing_skills %}
                        {% for s in missing %}
                            <span class="badge bg-danger-subtle text-danger border border-danger">{{ s }}</span>
                        {% endfor %}
                    </div>
                </div>
            </div>
        </div>
    </div>
    {% endif %}

    <!-- Assessment History Table -->
    <div class="card border-0 shadow-sm p-4">
        <h5 class="fw-bold mb-3">Assessment History</h5>
        {% if assessments %}
        <div class="table-responsive">
            <table class="table table-hover align-middle">
                <thead class="table-light">
                    <tr>
                        <th>Date & Time</th>
                        <th>Target Career</th>
                        <th>Gap %</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {% for a in assessments %}
                    <tr>
                        <td>{{ a.created_at }}</td>
                        <td><span class="badge bg-primary">{{ a.target_career }}</span></td>
                        <td>
                            <div class="progress" style="height: 18px; min-width: 120px;">
                                <div class="progress-bar bg-danger" style="width: {{ a.skill_gap_percentage }}%;">
                                    {{ a.skill_gap_percentage }}%
                                </div>
                            </div>
                        </td>
                        <td>
                            <a href="{{ url_for('skill_analysis', career=a.target_career) }}" class="btn btn-outline-primary btn-sm">
                                Re-Assess
                            </a>
                        </td>
                    </tr>
                    {% endfor %}
                </tbody>
            </table>
        </div>
        {% else %}
        <p class="text-muted mb-0">No past assessments found. Take your first analysis today!</p>
        {% endif %}
    </div>
</div>
{% endblock %}
`
  },
  {
    path: 'templates/login.html',
    name: 'login.html',
    language: 'html',
    category: 'Templates',
    content: `{% extends "base.html" %}
{% block title %}Student Login{% endblock %}

{% block content %}
<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-md-5">
            <div class="card border-0 shadow-sm p-4 p-md-5">
                <div class="text-center mb-4">
                    <i class="bi bi-person-circle fs-1 text-primary"></i>
                    <h3 class="fw-bold mt-2">Student Login</h3>
                    <p class="text-muted small">Sign in to track your skill gap progress and recommendations.</p>
                </div>
                <form method="POST" action="{{ url_for('login') }}">
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Email Address</label>
                        <input type="email" name="email" class="form-control" placeholder="name@college.edu" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Password</label>
                        <input type="password" name="password" class="form-control" placeholder="Enter password" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100 py-2 fw-semibold">Login</button>
                </form>
                <div class="text-center mt-4">
                    <p class="small text-muted mb-1">Sample test account: <code>alex@college.edu</code> / <code>password123</code></p>
                    <p class="small text-muted mb-0">Don't have an account? <a href="{{ url_for('register') }}">Register here</a></p>
                </div>
            </div>
        </div>
    </div>
</div>
{% endblock %}
`
  },
  {
    path: 'templates/register.html',
    name: 'register.html',
    language: 'html',
    category: 'Templates',
    content: `{% extends "base.html" %}
{% block title %}Student Registration{% endblock %}

{% block content %}
<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card border-0 shadow-sm p-4 p-md-5">
                <div class="text-center mb-4">
                    <i class="bi bi-mortarboard fs-1 text-primary"></i>
                    <h3 class="fw-bold mt-2">Create Student Account</h3>
                    <p class="text-muted small">Register to save assessments and receive customized course roadmaps.</p>
                </div>
                <form method="POST" action="{{ url_for('register') }}">
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Full Name</label>
                        <input type="text" name="name" class="form-control" placeholder="e.g. Alex Chen" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-semibold">College Email</label>
                        <input type="email" name="email" class="form-control" placeholder="e.g. alex@college.edu" required>
                    </div>
                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Department</label>
                            <input type="text" name="department" class="form-control" placeholder="e.g. Computer Science" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Year of Study</label>
                            <select name="year_of_study" class="form-select" required>
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year" selected>3rd Year</option>
                                <option value="4th Year">4th Year</option>
                                <option value="Post-Graduate">Post-Graduate</option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="form-label fw-semibold">Password</label>
                        <input type="password" name="password" class="form-control" placeholder="Min 6 characters" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100 py-2 fw-semibold">Register Student</button>
                </form>
                <div class="text-center mt-3">
                    <p class="small text-muted mb-0">Already registered? <a href="{{ url_for('login') }}">Log in</a></p>
                </div>
            </div>
        </div>
    </div>
</div>
{% endblock %}
`
  },
  {
    path: 'templates/careers.html',
    name: 'careers.html',
    language: 'html',
    category: 'Templates',
    content: `{% extends "base.html" %}
{% block title %}Career Roles - Student Skill Gap Analysis{% endblock %}

{% block content %}
<div class="container py-5">
    <div class="text-center mb-5">
        <h2 class="fw-bold">Explore Career Pathways</h2>
        <p class="text-muted">Discover industry demands and required core competencies for top technology roles.</p>
    </div>

    <div class="row g-4">
        {% for c_name, c_info in careers.items() %}
        <div class="col-md-6 col-lg-4">
            <div class="card h-100 border-0 shadow-sm p-4 d-flex flex-column">
                <h4 class="fw-bold text-primary mb-2">{{ c_name }}</h4>
                <p class="text-muted small flex-grow-1">{{ c_info.description }}</p>
                <h6 class="fw-bold small text-secondary">Required Core Skills:</h6>
                <div class="d-flex flex-wrap gap-1 mb-4">
                    {% for skill in c_info.required_skills %}
                        <span class="badge bg-light text-dark border">{{ skill }}</span>
                    {% endfor %}
                </div>
                <a href="{{ url_for('skill_analysis', career=c_name) }}" class="btn btn-primary w-100">
                    <i class="bi bi-graph-up me-1"></i>Analyze Gap for This Role
                </a>
            </div>
        </div>
        {% endfor %}
    </div>
</div>
{% endblock %}
`
  },
  {
    path: 'templates/about.html',
    name: 'about.html',
    language: 'html',
    category: 'Templates',
    content: `{% extends "base.html" %}
{% block title %}About the Project{% endblock %}

{% block content %}
<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-lg-9">
            <div class="card border-0 shadow-sm p-4 p-md-5">
                <h2 class="fw-bold text-primary mb-3">About the Skill Gap Analysis System</h2>
                <p class="lead text-muted">
                    This project was created to address the significant employability divide facing undergraduate college students in technical fields.
                </p>
                <hr class="my-4">
                <h4 class="fw-bold">1. Project Purpose</h4>
                <p class="text-secondary">
                    While university curricula provide theoretical grounding, employers look for specific applied tooling and programming competencies. This tool enables students to self-audit their skill profiles against authentic market requirements.
                </p>

                <h4 class="fw-bold mt-4">2. Core Methodology & Formula</h4>
                <p class="text-secondary">
                    The system evaluates student inputs through strict set-theoretic comparison:
                </p>
                <div class="p-3 bg-light rounded border mb-3 font-monospace small">
                    Missing Skills = Required Skills − Existing Skills<br>
                    Skill Gap Percentage = (Number of Missing Skills / Total Required Skills) × 100
                </div>

                <h4 class="fw-bold mt-4">3. Honest System Limitations</h4>
                <ul class="text-secondary small">
                    <li><strong>Self-Reported Data:</strong> Skill proficiency relies on student input rather than automated code tests.</li>
                    <li><strong>Standardized Profiles:</strong> Roles like "Data Scientist" vary across firms; standard templates represent generalized industry consensus.</li>
                    <li><strong>Static Course Catalog:</strong> Course links are curated and verified but don't track dynamic third-party price changes.</li>
                </ul>
            </div>
        </div>
    </div>
</div>
{% endblock %}
`
  },
  {
    path: 'templates/contact.html',
    name: 'contact.html',
    language: 'html',
    category: 'Templates',
    content: `{% extends "base.html" %}
{% block title %}Contact & Support{% endblock %}

{% block content %}
<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card border-0 shadow-sm p-4 p-md-5">
                <h3 class="fw-bold mb-3">Contact Project Team</h3>
                <p class="text-muted small mb-4">Have questions about skill evaluation or course additions? Send us a message.</p>

                <form method="POST" action="{{ url_for('contact') }}">
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Your Name</label>
                        <input type="text" name="name" class="form-control" placeholder="e.g. Priya Sharma" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Email Address</label>
                        <input type="email" name="email" class="form-control" placeholder="name@college.edu" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Message</label>
                        <textarea name="message" rows="4" class="form-control" placeholder="Write your inquiry or feedback..." required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary w-100 py-2 fw-semibold">Send Message</button>
                </form>
            </div>
        </div>
    </div>
</div>
{% endblock %}
`
  },
  {
    path: 'static/css/style.css',
    name: 'style.css',
    language: 'css',
    category: 'Static',
    content: `/* Student Skill Gap Analysis Custom Styling */
:root {
    --primary-color: #2563eb;
    --primary-hover: #1d4ed8;
    --accent-purple: #7c3aed;
    --accent-warning: #f59e0b;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #1e293b;
}

.hero-section {
    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #7c3aed 100%);
}

.icon-bubble {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.bg-purple {
    background-color: #7c3aed !important;
}

.step-badge {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #2563eb;
    color: #fff;
    font-size: 1.25rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
}

.feature-card, .course-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.feature-card:hover, .course-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08) !important;
}
`
  },
  {
    path: 'static/js/script.js',
    name: 'script.js',
    language: 'javascript',
    category: 'Static',
    content: `// Client-side interactions for Student Skill Gap Analysis System
document.addEventListener('DOMContentLoaded', () => {
    // Auto-dismiss alert boxes after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000);
    });
});
`
  }
];
