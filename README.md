# Vector Basis Finder

A lightweight web application that calculates the basis of a span of vectors in $\mathbb{R}^n$. Built with **Python (Flask)** and **SymPy**.

## Live Demo
The application is deployed and visitable via the following link:
**[https://math206-vector-basis-finder.vercel.app/](https://math206-vector-basis-finder.vercel.app/)**

## Setup & Installation for Development

Follow these steps to get the program running on your local machine.

### 1. Prerequisites
* **Python 3.8+** installed.
* **Git** installed.

### 2. Clone the Repository
Open your terminal (PowerShell or Command Prompt) and run:
```bash
git clone https://github.com/5kappa/Vector-Basis-Finder.git
cd Vector-Basis-Finder
```

### 3. Create a Virtual Environment
Windows:
```bash
python -m venv venv
.\venv\Scripts\Activate
```

Mac/Linux:
```bash
python3 -m venv venv
source venv/bin/activate
```

### 4. Install Dependencies
```bash
pip install -r requirements.txt
```
___

## How to Run
1. Make sure your virtual environment is active (step 3 above).
2. Start the Flask server:
```bash
python web_app.py
```
3. You will see output like ``Running on http://127.0.0.1:5000``.
4. Open your web browser and go to http://127.0.0.1:5000.

Note: This method of running the program is subject to change. See to-do below.
---

### To-do:
- [X] **Vercel Configuration:** Configure the project for serverless deployment