"""
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
