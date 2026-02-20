const KEYBOARD_LAYOUT_NORMAL = [
    [
        { myanmar: '၁', english: '၁', keyCode: '1', shiftMyanmar: '!', shiftEnglish: '!' },
        { myanmar: '၂', english: '၂', keyCode: '2', shiftMyanmar: '@', shiftEnglish: '@' },
        { myanmar: '၃', english: '၃', keyCode: '3', shiftMyanmar: '#', shiftEnglish: '#' },
        { myanmar: '၄', english: '၄', keyCode: '4', shiftMyanmar: '$', shiftEnglish: '$' },
        { myanmar: '၅', english: '၅', keyCode: '5', shiftMyanmar: '%', shiftEnglish: '%' },
        { myanmar: '၆', english: '၆', keyCode: '6', shiftMyanmar: '၆', shiftEnglish: '^' },
        { myanmar: '၇', english: '၇', keyCode: '7', shiftMyanmar: '၇', shiftEnglish: '&' },
        { myanmar: '၈', english: '၈', keyCode: '8', shiftMyanmar: '၈', shiftEnglish: '*' },
        { myanmar: '၉', english: '၉', keyCode: '9', shiftMyanmar: '(', shiftEnglish: '(' },
        { myanmar: '၀', english: '၀', keyCode: '0', shiftMyanmar: ')', shiftEnglish: ')' },
        { myanmar: '-', english: '-', keyCode: '-', shiftMyanmar: '_', shiftEnglish: '_' },
        { myanmar: '=', english: '=', keyCode: '=', shiftMyanmar: '+', shiftEnglish: '+' },
        { myanmar: '⌫', english: 'Backspace', keyCode: 'Backspace', special: 'backspace' }
    ],
    [
        { myanmar: '   ', english: 'Tab', keyCode: 'Tab', special: 'tab' },
        { myanmar: 'ဈ', english: 'ဈ', keyCode: 'q', shiftMyanmar: 'ဈ', shiftEnglish: 'Q' },
        { myanmar: 'ဝ', english: 'ဝ', keyCode: 'w', shiftMyanmar: 'ဝ', shiftEnglish: 'W' },
        { myanmar: 'ဗ', english: 'ဗ', keyCode: 'e', shiftMyanmar: 'ဗ', shiftEnglish: 'E' },
        { myanmar: 'သ', english: 'သ', keyCode: 'r', shiftMyanmar: 'သ', shiftEnglish: 'R' },
        { myanmar: 'ဆ', english: 'ဆ', keyCode: 't', shiftMyanmar: 'ဆ', shiftEnglish: 'T' },
        { myanmar: 'န', english: 'န', keyCode: 'y', shiftMyanmar: 'န', shiftEnglish: 'Y' },
        { myanmar: 'မ', english: 'မ', keyCode: 'u', shiftMyanmar: 'မ', shiftEnglish: 'U' },
        { myanmar: 'အ', english: 'အ', keyCode: 'i', shiftMyanmar: 'အ', shiftEnglish: 'I' },
        { myanmar: 'ပ', english: 'ပ', keyCode: 'o', shiftMyanmar: 'ပ', shiftEnglish: 'O' },
        { myanmar: 'က', english: 'က', keyCode: 'p', shiftMyanmar: 'က', shiftEnglish: 'P' },
        { myanmar: 'င', english: 'င', keyCode: '[', shiftMyanmar: 'င', shiftEnglish: '{' },
        { myanmar: 'ဟ', english: 'ဟ', keyCode: ']', shiftMyanmar: 'ဟ', shiftEnglish: '}' },
        { myanmar: '\\', english: '\\', keyCode: '\\', shiftMyanmar: '|', shiftEnglish: '|' }
    ],
    [
        { myanmar: '   ', english: 'Caps', keyCode: 'CapsLock', special: 'caps' },
        { myanmar: 'ေ', english: 'ေ', keyCode: 'a', shiftMyanmar: 'ေ', shiftEnglish: 'A' },
        { myanmar: 'ျ', english: 'ျ', keyCode: 's', shiftMyanmar: 'ျ', shiftEnglish: 'S' },
        { myanmar: 'ိ', english: 'ိ', keyCode: 'd', shiftMyanmar: 'ိ', shiftEnglish: 'D' },
        { myanmar: '်', english: '်', keyCode: 'f', shiftMyanmar: '်', shiftEnglish: 'F' },
        { myanmar: '္', english: '္', keyCode: 'g', shiftMyanmar: '္', shiftEnglish: 'G' },
        { myanmar: '့', english: '့', keyCode: 'h', shiftMyanmar: '့', shiftEnglish: 'H' },
        { myanmar: 'က', english: 'က', keyCode: 'j', shiftMyanmar: 'က', shiftEnglish: 'J' },
        { myanmar: 'ု', english: 'ု', keyCode: 'k', shiftMyanmar: 'ု', shiftEnglish: 'K' },
        { myanmar: 'ူ', english: 'ူ', keyCode: 'l', shiftMyanmar: 'ူ', shiftEnglish: 'L' },
        { myanmar: 'ဲ', english: 'ဲ', keyCode: ';', shiftMyanmar: 'ဲ', shiftEnglish: ':' },
        { myanmar: 'သ', english: 'သ', keyCode: "'", shiftMyanmar: 'သ', shiftEnglish: '"' },
        { myanmar: '↵', english: 'Enter', keyCode: 'Enter', special: 'enter' }
    ],
    [
        { myanmar: '⇧', english: 'Shift', keyCode: 'Shift', special: 'shift' },
        { myanmar: 'ှ', english: 'ှ', keyCode: 'z', shiftMyanmar: 'ှ', shiftEnglish: 'Z' },
        { myanmar: 'ရ', english: 'ရ', keyCode: 'x', shiftMyanmar: 'ရ', shiftEnglish: 'X' },
        { myanmar: 'ွ', english: 'ွ', keyCode: 'c', shiftMyanmar: 'ွ', shiftEnglish: 'C' },
        { myanmar: 'ထ', english: 'ထ', keyCode: 'v', shiftMyanmar: 'ထ', shiftEnglish: 'V' },
        { myanmar: 'chr', english: 'chr', keyCode: 'b', shiftMyanmar: 'chr', shiftEnglish: 'B' },
        { myanmar: 'ဠ', english: 'ဠ', keyCode: 'n', shiftMyanmar: 'ဠ', shiftEnglish: 'N' },
        { myanmar: 'ဣ', english: 'ဣ', keyCode: 'm', shiftMyanmar: 'ဣ', shiftEnglish: 'M' },
        { myanmar: ',', english: ',', keyCode: ',', shiftMyanmar: '၊', shiftEnglish: '<' },
        { myanmar: '။', english: '။', keyCode: '.', shiftMyanmar: '။', shiftEnglish: '>' },
        { myanmar: '/', english: '/', keyCode: '/', shiftMyanmar: '/', shiftEnglish: '?' },
        { myanmar: '⇧', english: 'Shift', keyCode: 'Shift', special: 'shift' }
    ],
    [
        { myanmar: 'Ctrl', english: 'Ctrl', keyCode: 'Control', special: 'ctrl' },
        { myanmar: 'Alt', english: 'Alt', keyCode: 'Alt', special: 'alt' },
        { myanmar: '', english: 'Space', keyCode: ' ', special: 'space' },
        { myanmar: 'Alt', english: 'Alt', keyCode: 'Alt', special: 'alt' },
        { myanmar: 'Ctrl', english: 'Ctrl', keyCode: 'Control', special: 'ctrl' }
    ]
];

let isShiftPressed = false;
let isCapsLockOn = false;

function createKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
    
    const showShiftKeys = isShiftPressed || isCapsLockOn;
    
    KEYBOARD_LAYOUT_NORMAL.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'keyboard-row';
        
        row.forEach(key => {
            const keyDiv = document.createElement('div');
            keyDiv.className = 'key';
            
            if (key.special) {
                keyDiv.classList.add(key.special);
            }
            
            if (key.special === 'shift' && isShiftPressed) {
                keyDiv.classList.add('active');
            }
            
            if (key.special === 'caps' && isCapsLockOn) {
                keyDiv.classList.add('active');
            }
            
            keyDiv.dataset.keycode = key.keyCode ? key.keyCode.toLowerCase() : '';
            keyDiv.dataset.myanmar = key.myanmar;
            
            if (key.shiftMyanmar) {
                keyDiv.dataset.shiftMyanmar = key.shiftMyanmar;
            }
            if (key.shiftEnglish) {
                keyDiv.dataset.shiftEnglish = key.shiftEnglish;
            }
            
            const myanmarSpan = document.createElement('span');
            myanmarSpan.className = 'myanmar';
            
            const englishSpan = document.createElement('span');
            englishSpan.className = 'english';
            
            if (showShiftKeys && key.shiftMyanmar && !key.special) {
                myanmarSpan.textContent = key.shiftMyanmar;
                englishSpan.textContent = key.shiftEnglish;
            } else {
                myanmarSpan.textContent = key.myanmar;
                englishSpan.textContent = key.english;
            }
            
            keyDiv.appendChild(myanmarSpan);
            keyDiv.appendChild(englishSpan);
            rowDiv.appendChild(keyDiv);
        });
        
        keyboard.appendChild(rowDiv);
    });
}

function updateKeyboardDisplay() {
    const showShiftKeys = isShiftPressed || isCapsLockOn;
    const keys = document.querySelectorAll('.key');
    
    keys.forEach(keyDiv => {
        const myanmarSpan = keyDiv.querySelector('.myanmar');
        const englishSpan = keyDiv.querySelector('.english');
        
        if (showShiftKeys && keyDiv.dataset.shiftMyanmar && !keyDiv.classList.contains('shift') && !keyDiv.classList.contains('caps')) {
            myanmarSpan.textContent = keyDiv.dataset.shiftMyanmar;
            if (keyDiv.dataset.shiftEnglish) {
                englishSpan.textContent = keyDiv.dataset.shiftEnglish;
            }
        } else if (!keyDiv.classList.contains('shift') && !keyDiv.classList.contains('caps')) {
            myanmarSpan.textContent = keyDiv.dataset.myanmar;
        }
        
        if (keyDiv.classList.contains('shift')) {
            if (isShiftPressed) {
                keyDiv.classList.add('active');
            } else {
                keyDiv.classList.remove('active');
            }
        }
        
        if (keyDiv.classList.contains('caps')) {
            if (isCapsLockOn) {
                keyDiv.classList.add('active');
            } else {
                keyDiv.classList.remove('active');
            }
        }
    });
}

function highlightKey(key) {
    const keys = document.querySelectorAll('.key');
    keys.forEach(keyDiv => {
        const keyCode = keyDiv.dataset.keycode;
        const keyLower = key.toLowerCase();
        
        if (keyCode === keyLower) {
            keyDiv.classList.add('active');
            setTimeout(() => {
                if (!keyDiv.classList.contains('shift') && !keyDiv.classList.contains('caps')) {
                    keyDiv.classList.remove('active');
                }
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
        'ဠ': 'n', 'ဣ': 'm', '။': '.', ' ': ' ', '၊': ','
    };
    
    const englishKey = keyMap[char];
    if (englishKey) {
        highlightKey(englishKey);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') {
        if (e.key === 'Shift') {
            isShiftPressed = true;
            updateKeyboardDisplay();
        } else if (e.key === 'CapsLock') {
            isCapsLockOn = !isCapsLockOn;
            updateKeyboardDisplay();
        } else {
            highlightKey(e.key);
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Shift') {
        isShiftPressed = false;
        updateKeyboardDisplay();
    }
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createKeyboard, highlightKey, highlightKeyForCharacter };
}
