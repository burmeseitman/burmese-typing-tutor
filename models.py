import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
DB_NAME = os.getenv("DB_NAME", "burmese_typing_tutor")

client = MongoClient(MONGODB_URI)
db = client[DB_NAME]

users_collection = db["users"]
tutorials_collection = db["tutorials"]

users_collection.create_index("name", unique=True)
tutorials_collection.create_index("level", unique=True)

DEFAULT_TUTORIALS = [
    {
        "level": 1,
        "title": "Basic Burmese Vowels",
        "practice_texts": [
            "အ အာ အိ အီ အု အူ",
            "အေ အဲ အော အော်",
            "က ကာ ကိ ကီ ကု ကူ",
            "ကေ ကဲ ကော ကော်"
        ],
        "description": "Learn basic Burmese vowels and consonant combinations"
    },
    {
        "level": 2,
        "title": "Simple Words",
        "practice_texts": [
            "မင်္ဂလာပါ နမောတဿ",
            "ကျေးဇူးတင်ပါသည်",
            "မင်းကို ချစ်တယ်",
            "ကောင်းသော နေ့လေးပါ"
        ],
        "description": "Practice common Burmese greetings and phrases"
    },
    {
        "level": 3,
        "title": "Short Sentences",
        "practice_texts": [
            "ယနေ့ ရာသီဥတု ကောင်းသည်",
            "ငါ မြန်မာ လူမျိုး ဖြစ်သည်",
            "ကျောင်းသားများ ကျောင်းသို့ သွားကြသည်",
            "ရန်ကုန်မြို့သည် ကြီးပွားသည်"
        ],
        "description": "Type simple Burmese sentences"
    },
    {
        "level": 4,
        "title": "Complex Sentences",
        "practice_texts": [
            "မြန်မာနိုင်ငံသည် ရွှေတိဂုံစေတီတော်ကြီးဖြင့် ကမ္ဘာကျော်သည်",
            "ပဲခူးမြို့သည် ရှေးဟောင်း မွန်ဘာသာစကားဖြင့် ဥတုရာ ဟုခေါ်သည်",
            "မြန်မာ့ရိုးရာ ယဉ်ကျေးမှုသည် ရှေးနှစ်ပေါင်းများစွာ ကတည်းက ရှိခဲ့သည်"
        ],
        "description": "Master longer and more complex sentences"
    },
    {
        "level": 5,
        "title": "Advanced Paragraphs",
        "practice_texts": [
            "မြန်မာနိုင်ငံ၏ မြို့တော်ဖြစ်သော နေပြည်တော်သည် ပြန်လည်တည်ဆောက်ထားသော မြို့တစ်မြို့ဖြစ်ပြီး ၂၀၀၅ ခုနှစ်တွင် တရားဝင် မြို့တော်အဖြစ် ကြေညာခဲ့သည်။",
            "ရွှေတိဂုံစေတီတော်သည် ရန်ကုန်မြို့ ဆင်ခြေဖုံးတွင် တည်ရှိပြီး မြန်မာနိုင်ငံ၏ အထွတ်အမြတ် ထားရာ ဘုရားဖြစ်သည်။ ယင်းသည် ရွှေသင်္ကန်း ကပ်လှူပူဇော်ထားသောကြောင့် ထင်ရှားသည်။"
        ],
        "description": "Expert level paragraphs with complex grammar"
    }
]

def initialize_tutorials():
    existing_count = tutorials_collection.count_documents({})
    if existing_count == 0:
        tutorials_collection.insert_many(DEFAULT_TUTORIALS)
        print("Default tutorials initialized")

def get_user_by_name(name):
    return users_collection.find_one({"name": name})

def create_user(name):
    try:
        result = users_collection.insert_one({
            "name": name,
            "scores": [],
            "current_level": 1,
            "total_score": 0,
            "completed_levels": []
        })
        return result.inserted_id
    except Exception as e:
        return None

def get_similar_names(name):
    similar = []
    existing = users_collection.find({"name": {"$regex": f"^{name}", "$options": "i"}})
    for user in existing:
        similar.append(user["name"])
    return similar[:5]

def suggest_available_name(name):
    counter = 1
    while True:
        suggested = f"{name}{counter}"
        if not get_user_by_name(suggested):
            return suggested
        counter += 1

def update_user_score(user_name, level, wpm, accuracy, score):
    users_collection.update_one(
        {"name": user_name},
        {
            "$push": {
                "scores": {
                    "level": level,
                    "wpm": wpm,
                    "accuracy": accuracy,
                    "score": score
                }
            },
            "$inc": {"total_score": score},
            "$set": {"current_level": level + 1},
            "$addToSet": {"completed_levels": level}
        }
    )

def get_top_users(limit=10):
    return list(users_collection.find({}, {"_id": 0}).sort("total_score", -1).limit(limit))

def get_tutorial(level):
    return tutorials_collection.find_one({"level": level})

def get_all_tutorials():
    return list(tutorials_collection.find({}, {"_id": 0}).sort("level", 1))

def check_level_completion(user_name, level):
    user = get_user_by_name(user_name)
    if not user:
        return False
    completed = user.get("completed_levels", [])
    return level in completed or user.get("current_level", 1) > level
