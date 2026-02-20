let currentLevel = 1;
let currentTextIndex = 0;
let practiceTexts = [];
let startTime = null;
let timerInterval = null;
let totalKeystrokes = 0;
let correctKeystrokes = 0;
let isPracticeRunning = false;
let userData = null;

async function init() {
    createKeyboard();
    await loadUserData();
    await loadTutorials();
    await loadLeaderboard();
    setupEventListeners();
}

async function loadUserData() {
    try {
        const response = await fetch('/api/user');
        const data = await response.json();
        if (data.success) {
            userData = data;
            document.getElementById('userName').textContent = data.name;
            document.getElementById('currentLevel').textContent = data.current_level;
            document.getElementById('totalScore').textContent = data.total_score || 0;
            currentLevel = data.current_level;
        } else {
            window.location.href = '/';
        }
    } catch (err) {
        console.error('Failed to load user data:', err);
        window.location.href = '/';
    }
}

async function loadTutorials() {
    try {
        const response = await fetch('/api/tutorials');
        const data = await response.json();
        if (data.success) {
            renderLevelList(data.tutorials);
            selectLevel(currentLevel);
        }
    } catch (err) {
        console.error('Failed to load tutorials:', err);
    }
}

function renderLevelList(tutorials) {
    const levelList = document.getElementById('levelList');
    const completedLevels = userData?.completed_levels || [];
    
    levelList.innerHTML = tutorials.map(tutorial => {
        const isCompleted = completedLevels.includes(tutorial.level);
        const isAccessible = tutorial.level <= currentLevel;
        const isLocked = !isAccessible;
        
        return `
            <div class="level-item ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''} ${tutorial.level === currentLevel ? 'active' : ''}"
                 data-level="${tutorial.level}"
                 onclick="${isAccessible ? `selectLevel(${tutorial.level})` : ''}">
                <span class="level-num">${tutorial.level}</span>
                <span class="level-title">${tutorial.title}</span>
                ${isCompleted ? '✓' : ''}
                ${isLocked ? '🔒' : ''}
            </div>
        `;
    }).join('');
}

async function selectLevel(level) {
    if (level > currentLevel) {
        alert('Complete previous levels first!');
        return;
    }
    
    currentLevel = level;
    document.getElementById('currentLevel').textContent = level;
    
    document.querySelectorAll('.level-item').forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.dataset.level) === level) {
            item.classList.add('active');
        }
    });
    
    try {
        const response = await fetch(`/api/tutorial/${level}`);
        const data = await response.json();
        if (data.success) {
            const tutorial = data.tutorial;
            document.getElementById('levelTitle').textContent = `Level ${tutorial.level}: ${tutorial.title}`;
            document.getElementById('levelDescription').textContent = tutorial.description;
            practiceTexts = tutorial.practice_texts;
            currentTextIndex = 0;
            resetPractice();
            displayPracticeText();
        }
    } catch (err) {
        console.error('Failed to load tutorial:', err);
    }
}

function displayPracticeText() {
    const practiceTextDiv = document.getElementById('practiceText');
    const text = practiceTexts[currentTextIndex];
    
    practiceTextDiv.innerHTML = text.split('').map((char, index) => {
        return `<span class="char" data-index="${index}">${char}</span>`;
    }).join('');
    
    const firstChar = practiceTextDiv.querySelector('.char');
    if (firstChar) {
        firstChar.classList.add('current');
    }
}

function setupEventListeners() {
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    const nextLevelBtn = document.getElementById('nextLevelBtn');
    const inputArea = document.getElementById('inputArea');
    
    startBtn.addEventListener('click', startPractice);
    resetBtn.addEventListener('click', resetPractice);
    nextLevelBtn.addEventListener('click', goToNextLevel);
    
    inputArea.addEventListener('input', handleInput);
}

function startPractice() {
    isPracticeRunning = true;
    startTime = new Date();
    totalKeystrokes = 0;
    correctKeystrokes = 0;
    
    document.getElementById('inputArea').disabled = false;
    document.getElementById('inputArea').value = '';
    document.getElementById('inputArea').focus();
    document.getElementById('startBtn').disabled = true;
    document.getElementById('resetBtn').disabled = false;
    document.getElementById('nextLevelBtn').style.display = 'none';
    
    timerInterval = setInterval(updateTimer, 1000);
}

function resetPractice() {
    isPracticeRunning = false;
    clearInterval(timerInterval);
    startTime = null;
    totalKeystrokes = 0;
    correctKeystrokes = 0;
    
    document.getElementById('inputArea').disabled = true;
    document.getElementById('inputArea').value = '';
    document.getElementById('startBtn').disabled = false;
    document.getElementById('resetBtn').disabled = true;
    document.getElementById('nextLevelBtn').style.display = 'none';
    document.getElementById('wpmDisplay').textContent = '0';
    document.getElementById('accuracyDisplay').textContent = '100%';
    document.getElementById('timeDisplay').textContent = '0:00';
    
    displayPracticeText();
}

function handleInput(e) {
    if (!isPracticeRunning) return;
    
    const inputText = e.target.value;
    const targetText = practiceTexts[currentTextIndex];
    
    highlightKeyForCharacter(inputText[inputText.length - 1]);
    
    updateDisplay(inputText, targetText);
    calculateStats(inputText, targetText);
    
    if (inputText.length >= targetText.length) {
        finishPractice(inputText, targetText);
    }
}

function updateDisplay(inputText, targetText) {
    const practiceTextDiv = document.getElementById('practiceText');
    const chars = practiceTextDiv.querySelectorAll('.char');
    
    chars.forEach((charSpan, index) => {
        charSpan.classList.remove('correct', 'incorrect', 'current');
        
        if (index < inputText.length) {
            if (inputText[index] === targetText[index]) {
                charSpan.classList.add('correct');
            } else {
                charSpan.classList.add('incorrect');
            }
        } else if (index === inputText.length) {
            charSpan.classList.add('current');
        }
    });
}

function calculateStats(inputText, targetText) {
    let correct = 0;
    for (let i = 0; i < inputText.length; i++) {
        if (inputText[i] === targetText[i]) {
            correct++;
        }
    }
    
    totalKeystrokes = inputText.length;
    correctKeystrokes = correct;
    
    const accuracy = totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 100;
    document.getElementById('accuracyDisplay').textContent = accuracy + '%';
    
    const timeElapsed = (new Date() - startTime) / 1000 / 60;
    const words = inputText.length / 5;
    const wpm = timeElapsed > 0 ? Math.round(words / timeElapsed) : 0;
    document.getElementById('wpmDisplay').textContent = wpm;
}

function updateTimer() {
    if (!startTime) return;
    
    const elapsed = Math.floor((new Date() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    document.getElementById('timeDisplay').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

async function finishPractice(inputText, targetText) {
    isPracticeRunning = false;
    clearInterval(timerInterval);
    
    document.getElementById('inputArea').disabled = true;
    
    const accuracy = Math.round((correctKeystrokes / totalKeystrokes) * 100);
    const timeElapsed = (new Date() - startTime) / 1000 / 60;
    const words = targetText.length / 5;
    const wpm = Math.round(words / timeElapsed);
    
    const score = Math.round(wpm * accuracy / 100 * currentLevel);
    
    try {
        const response = await fetch('/api/submit-score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                level: currentLevel,
                wpm: wpm,
                accuracy: accuracy
            })
        });
        
        const data = await response.json();
        if (data.success) {
            showResult(wpm, accuracy, data.score);
            
            currentTextIndex++;
            if (currentTextIndex < practiceTexts.length) {
                setTimeout(() => {
                    resetPractice();
                    displayPracticeText();
                }, 2000);
            } else {
                currentLevel++;
                userData.current_level = currentLevel;
                userData.completed_levels = userData.completed_levels || [];
                userData.completed_levels.push(currentLevel - 1);
                
                await loadTutorials();
                document.getElementById('nextLevelBtn').style.display = 'inline-block';
                await loadLeaderboard();
            }
        }
    } catch (err) {
        console.error('Failed to submit score:', err);
    }
}

function showResult(wpm, accuracy, score) {
    const practiceTextDiv = document.getElementById('practiceText');
    practiceTextDiv.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <h3 style="color: #27ae60; margin-bottom: 15px;">Practice Complete!</h3>
            <p>WPM: ${wpm}</p>
            <p>Accuracy: ${accuracy}%</p>
            <p style="font-size: 1.5rem; font-weight: bold; color: #3498db;">Score: ${score}</p>
        </div>
    `;
    
    const totalScore = parseInt(document.getElementById('totalScore').textContent) + score;
    document.getElementById('totalScore').textContent = totalScore;
}

function goToNextLevel() {
    selectLevel(currentLevel);
}

async function loadLeaderboard() {
    try {
        const response = await fetch('/api/leaderboard');
        const data = await response.json();
        
        const list = document.getElementById('leaderboardList');
        if (data.success && data.leaderboard.length > 0) {
            list.innerHTML = data.leaderboard.map((user, index) => `
                <div class="leaderboard-item ${index < 3 ? 'top-three' : ''} ${user.name === userData?.name ? 'current-user' : ''}">
                    <span class="rank">${index + 1}</span>
                    <span class="name">${user.name}</span>
                    <span class="score">${user.total_score || 0}</span>
                </div>
            `).join('');
        } else {
            list.innerHTML = '<p class="no-data">No scores yet</p>';
        }
    } catch (err) {
        console.error('Failed to load leaderboard:', err);
    }
}

function logout() {
    fetch('/api/logout', { method: 'POST' })
        .then(() => {
            window.location.href = '/';
        })
        .catch(err => {
            window.location.href = '/';
        });
}

document.addEventListener('DOMContentLoaded', init);
