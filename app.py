import os
import secrets
from flask import Flask, render_template, request, jsonify, session
from models import (
    init_db,
    get_user_by_name,
    create_user,
    get_similar_names,
    suggest_available_name,
    update_user_score,
    get_top_users,
    get_tutorial,
    get_all_tutorials,
    check_level_completion
)

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", secrets.token_hex(32))

init_db()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name", "").strip()
    
    if not name:
        return jsonify({"success": False, "error": "အမည် လိုအပ်ပါသည်"}), 400
    
    existing_user = get_user_by_name(name)
    if existing_user:
        similar = get_similar_names(name)
        suggested = suggest_available_name(name)
        return jsonify({
            "success": False,
            "error": "အမည်ရှိပြီးသားဖြစ်ပါသည်",
            "similar_names": similar,
            "suggested_name": suggested
        }), 409
    
    user_id = create_user(name)
    if user_id:
        session["user_name"] = name
        return jsonify({"success": True, "name": name})
    
    return jsonify({"success": False, "error": "အသုံးပြုသူ ဖန်တီး၍ မရပါ"}), 500

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    name = data.get("name", "").strip()
    
    if not name:
        return jsonify({"success": False, "error": "အမည် လိုအပ်ပါသည်"}), 400
    
    user = get_user_by_name(name)
    if user:
        session["user_name"] = name
        return jsonify({
            "success": True,
            "name": name,
            "current_level": user.get("current_level", 1),
            "completed_levels": user.get("completed_levels", []),
            "total_score": user.get("total_score", 0)
        })
    
    return jsonify({"success": False, "error": "အသုံးပြုသူကို ရှာမတွေ့ပါ"}), 404

@app.route("/tutor")
def tutor():
    user_name = session.get("user_name")
    if not user_name:
        return render_template("index.html")
    return render_template("tutor.html", user_name=user_name)

@app.route("/api/user")
def get_user():
    user_name = session.get("user_name")
    if not user_name:
        return jsonify({"success": False, "error": "လော့ဂ်အင် မပြုလုပ်ထားပါ"}), 401
    
    user = get_user_by_name(user_name)
    if user:
        return jsonify({
            "success": True,
            "name": user["name"],
            "current_level": user.get("current_level", 1),
            "completed_levels": user.get("completed_levels", []),
            "total_score": user.get("total_score", 0),
            "scores": user.get("scores", [])
        })
    
    return jsonify({"success": False, "error": "အသုံးပြုသူကို ရှာမတွေ့ပါ"}), 404

@app.route("/api/tutorials")
def api_tutorials():
    tutorials = get_all_tutorials()
    return jsonify({"success": True, "tutorials": tutorials})

@app.route("/api/tutorial/<int:level>")
def api_tutorial_level(level):
    tutorial = get_tutorial(level)
    if tutorial:
        return jsonify({"success": True, "tutorial": tutorial})
    return jsonify({"success": False, "error": "သင်ခန်းစာကို ရှာမတွေ့ပါ"}), 404

@app.route("/api/submit-score", methods=["POST"])
def submit_score():
    user_name = session.get("user_name")
    if not user_name:
        return jsonify({"success": False, "error": "လော့ဂ်အင် မပြုလုပ်ထားပါ"}), 401
    
    data = request.get_json()
    level = data.get("level")
    wpm = data.get("wpm", 0)
    accuracy = data.get("accuracy", 0)
    
    if not level:
        return jsonify({"success": False, "error": "အဆင့် လိုအပ်ပါသည်"}), 400
    
    user = get_user_by_name(user_name)
    if not user:
        return jsonify({"success": False, "error": "အသုံးပြုသူကို ရှာမတွေ့ပါ"}), 404
    current_level = user.get("current_level", 1)
    
    if level > current_level:
        return jsonify({
            "success": False,
            "error": "ယခင်အဆင့်များကို ပြီးမြောက်ပါ",
            "current_level": current_level
        }), 403
    
    score = int(wpm * accuracy / 100 * level)
    
    update_user_score(user_name, level, wpm, accuracy, score)
    
    return jsonify({
        "success": True,
        "score": score,
        "wpm": wpm,
        "accuracy": accuracy
    })

@app.route("/api/leaderboard")
def leaderboard():
    top_users = get_top_users(10)
    return jsonify({"success": True, "leaderboard": top_users})

@app.route("/api/check-level/<int:level>")
def check_level(level):
    user_name = session.get("user_name")
    if not user_name:
        return jsonify({"success": False, "error": "လော့ဂ်အင် မပြုလုပ်ထားပါ"}), 401
    
    can_access = check_level_completion(user_name, level - 1) if level > 1 else True
    return jsonify({"success": True, "can_access": can_access})

if __name__ == "__main__":
    app.run(debug=True, port=5001)
