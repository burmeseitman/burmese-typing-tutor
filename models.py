import os
import sqlite3
import json
from contextlib import contextmanager

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "typing_tutor.db")

DEFAULT_TUTORIALS = [
    {
        "level": 1,
        "title": "အခြေခံ သရနှင့် ဗျည်းများ",
        "practice_texts": [
            "အ အာ အိ အီ အု အူ",
            "အေ အဲ အော အော်",
            "က ကာ ကိ ကီ ကု ကူ",
            "ကေ ကဲ ကော ကော်"
        ],
        "description": "မြန်မာသရများနှင့် ဗျည်းသရတွဲများကို သင်ယူကာ လေ့ကျင့်ပါ"
    },
    {
        "level": 2,
        "title": "ရိုးရှင်းသော စကားလုံးများ",
        "practice_texts": [
            "မင်္ဂလာပါ နမောတဿ",
            "ကျေးဇူးတင်ပါသည်",
            "မင်းကို ချစ်တယ်",
            "ကောင်းသော နေ့လေးပါ"
        ],
        "description": "မြန်မာဘာသာ နေ့စဉ်သုံးစကားများနှင့် ဆုမို့်စကားများကို လေ့ကျင့်ပါ"
    },
    {
        "level": 3,
        "title": "တိုတိုသော ဝါကျများ",
        "practice_texts": [
            "ယနေ့ ရာသီဥတု ကောင်းသည်",
            "ငါ မြန်မာ လူမျိုး ဖြစ်သည်",
            "ကျောင်းသားများ ကျောင်းသို့ သွားကြသည်",
            "ရန်ကုန်မြို့သည် ကြီးပွားသည်"
        ],
        "description": "ရိုးရှင်းသော မြန်မာဝါကျများကို ရိုက်နှိပ်လေ့ကျင့်ပါ"
    },
    {
        "level": 4,
        "title": "ရှုပ်ထွေးသော ဝါကျများ",
        "practice_texts": [
            "မြန်မာနိုင်ငံသည် ရွှေတိဂုံစေတီတော်ကြီးဖြင့် ကမ္ဘာကျော်သည်",
            "ပဲခူးမြို့သည် ရှေးဟောင်း မွန်ဘာသာစကားဖြင့် ဥတုရာ ဟုခေါ်သည်",
            "မြန်မာ့ရိုးရာ ယဉ်ကျေးမှုသည် ရှေးနှစ်ပေါင်းများစွာ ကတည်းက ရှိခဲ့သည်"
        ],
        "description": "ရှည်လျားပြီး ရှုပ်ထွေးသော ဝါကျများကို ကျွမ်းကျင်အောင် လေ့ကျင့်ပါ"
    },
    {
        "level": 5,
        "title": "အဆင့်မြင့် စာပိုဒ်များ",
        "practice_texts": [
            "မြန်မာနိုင်ငံ၏ မြို့တော်ဖြစ်သော နေပြည်တော်သည် ပြန်လည်တည်ဆောက်ထားသော မြို့တစ်မြို့ဖြစ်ပြီး ၂၀၀၅ ခုနှစ်တွင် တရားဝင် မြို့တော်အဖြစ် ကြေညာခဲ့သည်။",
            "ရွှေတိဂုံစေတီတော်သည် ရန်ကုန်မြို့ ဆင်ခြေဖုံးတွင် တည်ရှိပြီး မြန်မာနိုင်ငံ၏ အထွတ်အမြတ် ထားရာ ဘုရားဖြစ်သည်။ ယင်းသည် ရွှေသင်္ကန်း ကပ်လှူပူဇော်ထားသောကြောင့် ထင်ရှားသည်။"
        ],
        "description": "ရှုပ်ထွေးသော သဒ္ဒါဖွဲ့စည်းပုံများဖြင့် အဆင့်မြင့် စာပိုဒ်များကို လေ့ကျင့်ပါ"
    }
]

@contextmanager
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

def init_db():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE NOT NULL,
                current_level INTEGER DEFAULT 1,
                total_score INTEGER DEFAULT 0,
                completed_levels TEXT DEFAULT '[]',
                scores TEXT DEFAULT '[]'
            )
        """)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS tutorials (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                level INTEGER UNIQUE NOT NULL,
                title TEXT NOT NULL,
                practice_texts TEXT NOT NULL,
                description TEXT
            )
        """)
        conn.commit()
    initialize_tutorials()

def initialize_tutorials():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM tutorials")
        count = cursor.fetchone()[0]
        if count == 0:
            for tutorial in DEFAULT_TUTORIALS:
                cursor.execute(
                    "INSERT INTO tutorials (level, title, practice_texts, description) VALUES (?, ?, ?, ?)",
                    (tutorial["level"], tutorial["title"], json.dumps(tutorial["practice_texts"]), tutorial["description"])
                )
            conn.commit()
            print("Default tutorials initialized")

def get_user_by_name(name):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE name = ?", (name,))
        row = cursor.fetchone()
        if row:
            return {
                "name": row["name"],
                "current_level": row["current_level"],
                "total_score": row["total_score"],
                "completed_levels": json.loads(row["completed_levels"]),
                "scores": json.loads(row["scores"])
            }
        return None

def create_user(name):
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO users (name) VALUES (?)",
                (name,)
            )
            conn.commit()
            return cursor.lastrowid
    except sqlite3.IntegrityError:
        return None

def get_similar_names(name):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM users WHERE name LIKE ?", (f"{name}%",))
        rows = cursor.fetchall()
        return [row["name"] for row in rows[:5]]

def suggest_available_name(name):
    counter = 1
    while True:
        suggested = f"{name}{counter}"
        if not get_user_by_name(suggested):
            return suggested
        counter += 1

def update_user_score(user_name, level, wpm, accuracy, score):
    user = get_user_by_name(user_name)
    if not user:
        return
    
    scores = user.get("scores", [])
    scores.append({
        "level": level,
        "wpm": wpm,
        "accuracy": accuracy,
        "score": score
    })
    
    completed_levels = user.get("completed_levels", [])
    if level not in completed_levels:
        completed_levels.append(level)
    
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE users 
            SET scores = ?, 
                total_score = total_score + ?, 
                current_level = ?, 
                completed_levels = ?
            WHERE name = ?
        """, (
            json.dumps(scores),
            score,
            level + 1,
            json.dumps(completed_levels),
            user_name
        ))
        conn.commit()

def get_top_users(limit=10):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT name, total_score FROM users ORDER BY total_score DESC LIMIT ?", (limit,))
        rows = cursor.fetchall()
        return [{"name": row["name"], "total_score": row["total_score"]} for row in rows]

def get_tutorial(level):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM tutorials WHERE level = ?", (level,))
        row = cursor.fetchone()
        if row:
            return {
                "level": row["level"],
                "title": row["title"],
                "practice_texts": json.loads(row["practice_texts"]),
                "description": row["description"]
            }
        return None

def get_all_tutorials():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM tutorials ORDER BY level ASC")
        rows = cursor.fetchall()
        return [
            {
                "level": row["level"],
                "title": row["title"],
                "practice_texts": json.loads(row["practice_texts"]),
                "description": row["description"]
            }
            for row in rows
        ]

def check_level_completion(user_name, level):
    user = get_user_by_name(user_name)
    if not user:
        return False
    completed = user.get("completed_levels", [])
    return level in completed or user.get("current_level", 1) > level
