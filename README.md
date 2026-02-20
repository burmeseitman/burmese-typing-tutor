# Burmese Typing Tutor

A web application for learning and practicing Burmese keyboard typing skills.

## Features

- User registration with unique name validation
- Progressive difficulty levels (5 levels from basic vowels to advanced paragraphs)
- Real-time typing speed (WPM) and accuracy tracking
- Visual keyboard with key highlighting
- Score tracking and leaderboard
- MongoDB database for persistent data storage

## Requirements

- Python 3.8+
- MongoDB

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd burmese-typing-tutor
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your MongoDB connection details
```

5. Start MongoDB (if not already running):
```bash
mongod
```

6. Run the application:
```bash
python app.py
```

7. Open your browser and navigate to:
```
http://localhost:5000
```

## Usage

1. Enter your name on the welcome page
2. If the name exists, you'll get suggestions for alternative names
3. Start typing practice at Level 1
4. Complete all texts in a level to unlock the next level
5. Your scores are saved and displayed on the leaderboard

## Project Structure

```
burmese-typing-tutor/
├── app.py              # Flask application
├── models.py           # MongoDB models and data operations
├── requirements.txt    # Python dependencies
├── .env.example        # Environment variables template
├── .gitignore
├── README.md
├── static/
│   ├── css/
│   │   └── style.css   # Application styles
│   └── js/
│       ├── keyboard.js # Keyboard visualization
│       └── typing.js   # Typing practice logic
└── templates/
    ├── index.html      # Welcome page
    └── tutor.html      # Main practice interface
```

## API Endpoints

- `GET /` - Welcome page
- `POST /api/register` - Register new user
- `POST /api/login` - Login existing user
- `GET /tutor` - Practice interface
- `GET /api/user` - Get current user data
- `GET /api/tutorials` - Get all tutorials
- `GET /api/tutorial/<level>` - Get specific tutorial
- `POST /api/submit-score` - Submit practice score
- `GET /api/leaderboard` - Get top users

## Database Collections

### Users
- `name` (unique) - User's name
- `scores` - Array of score objects
- `current_level` - Current unlocked level
- `total_score` - Cumulative score
- `completed_levels` - List of completed levels

### Tutorials
- `level` (unique) - Level number
- `title` - Level title
- `practice_texts` - Array of practice texts
- `description` - Level description

## License

MIT License
