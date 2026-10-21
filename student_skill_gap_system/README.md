# Student Skill Gap Analysis and Course Suggestion System
A comprehensive college academic project built with **Python (Flask)**, **SQLite**, **Bootstrap 5**, and **Chart.js**.

---

## 🎯 1. Project Objective & Methodology
This system helps students identify existing skills, discover missing competencies required for career roles (Data Analyst, Data Scientist, ML Engineer, Business Analyst, Python Developer), and receive verified course recommendations to bridge the gap.

### Mathematical Formulation
$$\text{Missing Skills} = \text{Required Skills} - \text{Existing Skills}$$
$$\text{Skill Gap Percentage} = \left(\frac{\text{Number of Missing Skills}}{\text{Total Required Skills}}\right) \times 100$$
$$\text{Skill Readiness Percentage} = \left(\frac{\text{Number of Matched Skills}}{\text{Total Required Skills}}\right) \times 100$$

---

## 💻 2. Windows Installation and Execution Steps (Visual Studio Code)

### Prerequisites:
1. Python 3.9 or higher installed on Windows ([python.org/downloads](https://www.python.org/downloads)).
   * *Critical:* Ensure you check the box **"Add python.exe to PATH"** during setup.
2. Visual Studio Code installed ([code.visualstudio.com](https://code.visualstudio.com)).

### Step 1: Open Project in VS Code
1. Open VS Code.
2. Click **File -> Open Folder...** and select `student_skill_gap_system`.
3. Open the integrated terminal using `Ctrl + \`` or **Terminal -> New Terminal**.

### Step 2: Create and Activate Virtual Environment
Run in the VS Code terminal:
```powershell
# Create venv
python -m venv venv

# Activate on Windows PowerShell:
.\venv\Scripts\Activate.ps1
# (Or on Windows Command Prompt CMD):
.\venv\Scripts\activate.bat
```
*Note: If PowerShell says "running scripts is disabled", run:*
`Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`

### Step 3: Install Required Packages
```powershell
pip install -r requirements.txt
```

### Step 4: Initialize the SQLite Database
```powershell
python database/init_db.py
```
*Output: `[OK] SQLite database initialized successfully at database/skill_gap.db`*

### Step 5: Start the Flask Web Server
```powershell
python app.py
```
*Output: `* Running on http://127.0.0.1:5000`*

### Step 6: Access the Website
Open Google Chrome, Edge, or Firefox and go to:
**http://127.0.0.1:5000**

---

## 🔑 3. Pre-Seeded Sample Accounts
| Name | Email | Password | Target Career |
| :--- | :--- | :--- | :--- |
| **Alex Chen** | `alex@college.edu` | `password123` | Data Scientist |
| **Priya Sharma** | `priya@college.edu` | `password123` | Data Analyst |
| **Rahul Patel** | `rahul@college.edu` | `password123` | Python Developer |

You can also create brand-new accounts anytime on the **/register** page.

---

## 🧪 4. Testing Steps for College Demonstration
1. **Student Registration**: Navigate to `/register`, enter details for a new student, and verify user creation in SQLite.
2. **Student Login**: Sign in at `/login` using seeded or newly created credentials.
3. **Skill Gap Analysis**: Go to `/analyze`, pick "Data Analyst", check current skills (e.g. Excel, Communication Skills), and click "Analyze Skills".
4. **View Formula & Gap**: Observe the dynamic doughnut chart, Matched Skills list, and Missing Skills list.
5. **Course Suggestions**: Verify course recommendations directly target missing competencies with verified, real URLs.
6. **Dashboard History**: Open `/dashboard` to review persisted assessment logs and readiness metrics.
