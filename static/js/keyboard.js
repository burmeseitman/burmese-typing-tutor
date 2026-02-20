const KEYBOARD_LAYOUT = [
    [
        { myanmar: '၁', english: '1' },
        { myanmar: '၂', english: '2' },
        { myanmar: '၃', english: '3' },
        { myanmar: '၄', english: '4' },
        { myanmar: '၅', english: '5' },
        { myanmar: '၆', english: '6' },
        { myanmar: '၇', english: '7' },
        { myanmar: '၈', english: '8' },
        { myanmar: '၉', english: '9' },
        { myanmar: '၀', english: '0' },
        { myanmar: '-', english: '-' },
        { myanmar: '=', english: '=' },
        { myanmar: '⌫', english: 'Backspace', special: 'backspace' }
    ],
    [
        { myanmar: '   ', english: 'Tab', special: 'tab' },
        { myanmar: 'ဈ', english: 'q' },
        { myanmar: 'ဝ', english: 'w' },
        { myanmar: 'ဗ', english: 'e' },
        { myanmar: 'သ', english: 'r' },
        { myanmar: 'ဆ', english: 't' },
        { myanmar: 'န', english: 'y' },
        { myanmar: 'မ', english: 'u' },
        { myanmar: 'အ', english: 'i' },
        { myanmar: 'ပ', english: 'o' },
        { myanmar: 'က', english: 'p' },
        { myanmar: 'င', english: '[' },
        { myanmar: 'ဟ', english: ']' },
        { myanmar: '\\', english: '\\' }
    ],
    [
        { myanmar: '   ', english: 'Caps', special: 'caps' },
        { myanmar: 'ေ', english: 'a' },
        { myanmar: 'ျ', english: 's' },
        { myanmar: 'ိ', english: 'd' },
        { myanmar: '်', english: 'f' },
        { myanmar: '္', english: 'g' },
        { myanmar: '့', english: 'h' },
        { myanmar: 'က', english: 'j' },
        { myanmar: 'ု', english: 'k' },
        { myanmar: 'ူ', english: 'l' },
        { myanmar: 'ဲ', english: ';' },
        { myanmar: 'သ', english: "'" },
        { myanmar: '↵', english: 'Enter', special: 'enter' }
    ],
    [
        { myanmar: '⇧', english: 'Shift', special: 'shift' },
        { myanmar: 'ှ', english: 'z' },
        { myanmar: 'ရ', english: 'x' },
        { myanmar: 'ွ', english: 'c' },
        { myanmar: 'ထ', english: 'v' },
        { myanmar: 'chr', english: 'b' },
        { myanmar: 'ဠ', english: 'n' },
        { myanmar: 'ဣ', english: 'm' },
        { myanmar: ',', english: ',' },
        { myanmar: '။', english: '.' },
        { myanmar: '/', english: '/' },
        { myanmar: '⇧', english: 'Shift', special: 'shift' }
    ],
    [
        { myanmar: 'Ctrl', english: 'Ctrl', special: 'ctrl' },
        { myanmar: 'Alt', english: 'Alt', special: 'alt' },
        { myanmar: '', english: 'Space', special: 'space' },
        { myanmar: 'Alt', english: 'Alt', special: 'alt' },
        { myanmar: 'Ctrl', english: 'Ctrl', special: 'ctrl' }
    ]
];

let activeKeys = new Set();

function createKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
    
    KEYBOARD_LAYOUT.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'keyboard-row';
        
        row.forEach(key => {
            const keyDiv = document.createElement('div');
            keyDiv.className = 'key';
            if (key.special) {
                keyDiv.classList.add(key.special);
            }
            keyDiv.dataset.english = key.english.toLowerCase();
            keyDiv.dataset.myanmar = key.myanmar;
            
            const myanmarSpan = document.createElement('span');
            myanmarSpan.className = 'myanmar';
            myanmarSpan.textContent = key.myanmar;
            
            const englishSpan = document.createElement('span');
            englishSpan.className = 'english';
            englishSpan.textContent = key.english;
            
            keyDiv.appendChild(myanmarSpan);
            keyDiv.appendChild(englishSpan);
            rowDiv.appendChild(keyDiv);
        });
        
        keyboard.appendChild(rowDiv);
    });
}

function highlightKey(key) {
    const keys = document.querySelectorAll('.key');
    keys.forEach(keyDiv => {
        if (keyDiv.dataset.english === key.toLowerCase()) {
            keyDiv.classList.add('active');
            setTimeout(() => {
                keyDiv.classList.remove('active');
            }, 150);
        }
    });
}

function highlightKeyForCharacter(char) {
    const keyMap = {
        '၁': '1', '၂': '2', '၃': '3', '၄': '4', '၅': '5',
        '၆': '6', '၇': '7', '၈': '8', '၉': '9', '၀': '0',
        'ဈ': 'q', 'ဝ': 'w', 'ဗ': 'e', 'သ': 'r', 'ဆ': 't',
        'န': 'y', 'မ': 'u', 'အ': 'i', 'ပ': 'o', 'က': 'p',
        'င': '[', 'ဟ': ']', 'ေ': 'a', 'ျ': 's', 'ိ': 'd',
        '်': 'f', '္': 'g', '့': 'h', 'ု': 'k', 'ူ': 'l',
        'ဲ': ';', 'ှ': 'z', 'ရ': 'x', 'ွ': 'c', 'ထ': 'v',
        'ဠ': 'n', 'ဣ': 'm', '။': '.', ' ': 'space'
    };
    
    const englishKey = keyMap[char];
    if (englishKey) {
        highlightKey(englishKey);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') {
        highlightKey(e.key);
    }
});

document.addEventListener('keyup', (e) => {
    const keys = document.querySelectorAll('.key');
    keys.forEach(keyDiv => {
        if (keyDiv.dataset.english === e.key.toLowerCase()) {
            keyDiv.classList.remove('active');
        }
    });
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createKeyboard, highlightKey, highlightKeyForCharacter };
}
