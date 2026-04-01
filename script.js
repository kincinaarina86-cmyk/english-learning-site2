const STORAGE_KEY = 'english_learning_progress';

// ========== ВСЕ ВОЗМОЖНЫЕ ТЕМЫ ==========
function getAllTopics() {
    const topics = [];
    
    // Алфавит
    for (let i = 65; i <= 90; i++) {
        topics.push(`alphabet_${String.fromCharCode(i)}`);
    }
    
    // Matching (игра "Найди пару")
    const matchingWords = ['cat', 'dog', 'sun', 'apple', 'fish', 'bird'];
    matchingWords.forEach(w => topics.push(`matching_${w}`));
    
    // 1-4 классы
    const gradeTopics = ['family', 'numbers', 'animals', 'house'];
    gradeTopics.forEach(topic => {
        topics.push(`grade_topic_${topic}`);
        const words = gradeData[topic];
        if (words) {
            words.forEach(item => topics.push(`grade_${topic}_${item.word}`));
        }
    });
    
    // Времена
    const tenses = ['present_simple', 'present_continuous', 'past_simple', 'past_continuous', 'future_simple', 'present_perfect'];
    tenses.forEach(t => topics.push(`tense_${t}`));
    
    // Неправильные глаголы (45 штук)
    const verbs = [
        'be', 'become', 'begin', 'break', 'build', 'buy', 'can', 'come', 'cut', 'do',
        'drink', 'drive', 'eat', 'fall', 'find', 'fly', 'get', 'give', 'go', 'hear',
        'know', 'leave', 'lose', 'make', 'meet', 'pay', 'put', 'read', 'ride', 'run',
        'say', 'see', 'sit', 'sleep', 'speak', 'spend', 'stand', 'swim', 'take', 'tell',
        'think', 'understand', 'wear', 'win', 'write'
    ];
    verbs.forEach(v => topics.push(`verb_${v}`));
    
    return topics;
}

// ========== ПРОГРЕСС ==========
function loadProgress() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
}

function saveProgress(progress) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function markTopic(topicId) {
    let progress = loadProgress();
    progress[topicId] = true;
    saveProgress(progress);
    
    const btn = document.querySelector(`.mark-btn[data-topic="${topicId}"]`);
    if (btn) {
        btn.textContent = '✅ Выучено';
        btn.disabled = true;
        btn.style.opacity = '0.6';
    }
    
    if (document.getElementById('progress-stats')) {
        displayProgress();
    }
}

function isTopicLearned(topicId) {
    const progress = loadProgress();
    return !!progress[topicId];
}

function initMarkButtons() {
    const buttons = document.querySelectorAll('.mark-btn');
    buttons.forEach(btn => {
        const topicId = btn.getAttribute('data-topic');
        if (isTopicLearned(topicId)) {
            btn.textContent = '✅ Выучено';
            btn.disabled = true;
            btn.style.opacity = '0.6';
        } else {
            btn.addEventListener('click', () => markTopic(topicId));
        }
    });
}

function resetProgress() {
    if (confirm('Вы уверены, что хотите сбросить весь прогресс?')) {
        localStorage.removeItem(STORAGE_KEY);
        alert('Прогресс сброшен');
        location.reload();
    }
}

function displayProgress() {
    const progress = loadProgress();
    const allTopics = getAllTopics();
    const learnedCount = Object.keys(progress).length;
    const percent = allTopics.length ? Math.round((learnedCount / allTopics.length) * 100) : 0;
    const statsDiv = document.getElementById('progress-stats');
    if (statsDiv) {
        statsDiv.innerHTML = `
            <div class="card">
                <p>✅ Выучено тем: ${learnedCount} из ${allTopics.length}</p>
                <div style="background:#e2d4c8; border-radius:20px; height:20px; width:100%; margin:15px 0;">
                    <div style="background:#7c9c68; width:${percent}%; height:20px; border-radius:20px;"></div>
                </div>
                <p>🎯 Общий прогресс: ${percent}%</p>
                <p>⭐ Продолжай в том же духе!</p>
            </div>
        `;
    }
}

// ========== ОЗВУЧКА ==========
function speakText(text, lang = 'en-US') {
    if (!window.speechSynthesis) {
        alert('Ваш браузер не поддерживает озвучку');
        return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
}

// ========== ДОШКОЛЬНИКИ ==========
const alphabetData = [
    { letter: 'A', word: 'Apple', emoji: '🍎' },
    { letter: 'B', word: 'Ball', emoji: '⚽' },
    { letter: 'C', word: 'Cat', emoji: '🐱' },
    { letter: 'D', word: 'Dog', emoji: '🐶' },
    { letter: 'E', word: 'Elephant', emoji: '🐘' },
    { letter: 'F', word: 'Fish', emoji: '🐟' },
    { letter: 'G', word: 'Goat', emoji: '🐐' },
    { letter: 'H', word: 'Hat', emoji: '🎩' },
    { letter: 'I', word: 'Igloo', emoji: '🏠❄️' },
    { letter: 'J', word: 'Juice', emoji: '🧃' },
    { letter: 'K', word: 'Kite', emoji: '🪁' },
    { letter: 'L', word: 'Lion', emoji: '🦁' },
    { letter: 'M', word: 'Monkey', emoji: '🐒' },
    { letter: 'N', word: 'Nest', emoji: '🪹' },
    { letter: 'O', word: 'Octopus', emoji: '🐙' },
    { letter: 'P', word: 'Pig', emoji: '🐷' },
    { letter: 'Q', word: 'Queen', emoji: '👑' },
    { letter: 'R', word: 'Rain', emoji: '☔' },
    { letter: 'S', word: 'Sun', emoji: '☀️' },
    { letter: 'T', word: 'Tiger', emoji: '🐯' },
    { letter: 'U', word: 'Umbrella', emoji: '☂️' },
    { letter: 'V', word: 'Violin', emoji: '🎻' },
    { letter: 'W', word: 'Whale', emoji: '🐋' },
    { letter: 'X', word: 'X-ray', emoji: '🩻' },
    { letter: 'Y', word: 'Yoyo', emoji: '🪀' },
    { letter: 'Z', word: 'Zebra', emoji: '🦓' }
];

const matchingItemsRaw = [
    { word: 'Cat', emoji: '🐱' },
    { word: 'Dog', emoji: '🐶' },
    { word: 'Sun', emoji: '☀️' },
    { word: 'Apple', emoji: '🍎' },
    { word: 'Fish', emoji: '🐟' },
    { word: 'Bird', emoji: '🐦' }
];

function createMatchingPairs() {
    let pairs = [];
    matchingItemsRaw.forEach(item => {
        pairs.push({ ...item, pairId: item.word });
        pairs.push({ ...item, pairId: item.word });
    });
    for (let i = pairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
    return pairs;
}

let matchingPairs = [];
let openedCards = [];
let lockBoard = false;

function renderAlphabet() {
    const area = document.getElementById('content-area');
    if (!area) return;
    let html = '<div class="alphabet-grid">';
    alphabetData.forEach(item => {
        html += `
            <div class="letter-card">
                <div class="letter">${item.letter}</div>
                <div class="word-emoji" style="font-size:3rem;">${item.emoji}</div>
                <div class="word">${item.word}</div>
                <button class="speak-btn" data-word="${item.word}">🔊 Произнести</button>
                <button class="mark-btn" data-topic="alphabet_${item.letter}">✔️ Выучил(а)</button>
            </div>
        `;
    });
    html += '</div>';
    area.innerHTML = html;
    
    document.querySelectorAll('.speak-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const word = btn.getAttribute('data-word');
            speakText(word);
        });
    });
    initMarkButtons();
}

function renderMatching() {
    const area = document.getElementById('content-area');
    if (!area) return;
    
    matchingPairs = createMatchingPairs();
    openedCards = [];
    lockBoard = false;
    
    // Определяем количество колонок в зависимости от ширины экрана
    const isMobile = window.innerWidth <= 600;
    const columns = isMobile ? 2 : 4;
    
    let html = `
        <div style="text-align:center; margin-bottom:20px;">
            <p>🎮 Найди пару! Нажимай на карточки, чтобы открыть их. Найди две одинаковые картинки!</p>
        </div>
        <div class="matching-game" style="display: grid; grid-template-columns: repeat(${columns}, 1fr); gap: 20px; max-width: 800px; margin: 20px auto;">
    `;
    
    matchingPairs.forEach((item, idx) => {
        html += `
            <div class="matching-card" data-idx="${idx}" data-word="${item.word}" data-pairid="${item.pairId}" style="
                width: 100%;
                aspect-ratio: 1 / 1;
                background: #f5ede2;
                border-radius: 20px;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                transition: all 0.2s;
                border: 3px solid #e2d4c4;
                padding: 10px;
                position: relative;
            ">
                <div class="card-front" style="display: flex; flex-direction: column; align-items: center;">
                    <span class="card-question" style="font-size: 3rem;">❓</span>
                    <span style="font-size: 0.8rem; margin-top: 10px;">Нажми, чтобы открыть</span>
                </div>
                <div class="card-back" style="display: none; flex-direction: column; align-items: center; width:100%;">
                    <span class="card-emoji" style="font-size: 3rem;">${item.emoji}</span>
                    <span class="card-word" style="font-size: 1rem; margin: 5px 0; font-weight: bold;">${item.word}</span>
                    <button class="speak-card-btn" data-word="${item.word}" style="
                        background: #e8dccc;
                        border: none;
                        border-radius: 30px;
                        padding: 5px 12px;
                        margin-top: 8px;
                        cursor: pointer;
                        font-size: 0.8rem;
                        font-family: inherit;
                    ">🔊 Произнести</button>
                </div>
            </div>
        `;
    });
    html += '</div><div class="result-message" id="matching-result" style="margin-top: 25px; font-size: 1.3rem; text-align: center; font-weight: bold;"></div>';
    area.innerHTML = html;
    
    // Добавляем обработчик изменения размера окна, чтобы перестраивать сетку
    const handleResize = () => {
        const gameContainer = document.querySelector('.matching-game');
        if (gameContainer) {
            const newColumns = window.innerWidth <= 600 ? 2 : 4;
            gameContainer.style.gridTemplateColumns = `repeat(${newColumns}, 1fr)`;
        }
    };
    window.addEventListener('resize', handleResize);
    // Убираем обработчик при следующем переключении режима? Но проще оставить – он будет висеть, но при повторном рендеринге старый обработчик может остаться.
    // Чтобы избежать накопления, удалим предыдущий обработчик через сохранение ссылки, но для простоты оставим – это не критично.
    
    function attachSpeakToCard(cardElement) {
        const speakBtn = cardElement.querySelector('.speak-card-btn');
        if (speakBtn) {
            speakBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const word = speakBtn.getAttribute('data-word');
                speakText(word);
            });
        }
    }
    
    document.querySelectorAll('.matching-card').forEach((card, idx) => {
        const front = card.querySelector('.card-front');
        const back = card.querySelector('.card-back');
        const word = card.getAttribute('data-word');
        
        front.style.display = 'flex';
        back.style.display = 'none';
        
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('speak-card-btn')) return;
            
            if (lockBoard) return;
            if (openedCards.includes(idx)) {
                speakText(word);
                return;
            }
            
            front.style.display = 'none';
            back.style.display = 'flex';
            attachSpeakToCard(card);
            openedCards.push(idx);
            
            if (openedCards.length === 2) {
                lockBoard = true;
                const card1 = document.querySelector(`.matching-card[data-idx="${openedCards[0]}"]`);
                const card2 = document.querySelector(`.matching-card[data-idx="${openedCards[1]}"]`);
                const word1 = matchingPairs[openedCards[0]].word;
                const word2 = matchingPairs[openedCards[1]].word;
                const resultDiv = document.getElementById('matching-result');
                
                if (word1 === word2) {
                    resultDiv.innerHTML = '✅ Правильно! Молодец! 🎉 Нашёл(ла) пару!';
                    resultDiv.style.color = '#2c5e2a';
                    const topicId = `matching_${word1.toLowerCase()}`;
                    markTopic(topicId);
                    
                    card1.style.opacity = '0.5';
                    card2.style.opacity = '0.5';
                    card1.style.cursor = 'default';
                    card2.style.cursor = 'default';
                    card1.style.pointerEvents = 'none';
                    card2.style.pointerEvents = 'none';
                    
                    openedCards = [];
                    lockBoard = false;
                    
                    setTimeout(() => {
                        if (resultDiv.innerHTML.includes('Правильно')) {
                            resultDiv.innerHTML = '';
                        }
                    }, 1500);
                } else {
                    resultDiv.innerHTML = '❌ Неправильно! Это не пара. Запомни картинки и попробуй ещё!';
                    resultDiv.style.color = '#c44';
                    
                    setTimeout(() => {
                        const c1 = document.querySelector(`.matching-card[data-idx="${openedCards[0]}"]`);
                        const c2 = document.querySelector(`.matching-card[data-idx="${openedCards[1]}"]`);
                        if (c1 && c2) {
                            c1.querySelector('.card-front').style.display = 'flex';
                            c1.querySelector('.card-back').style.display = 'none';
                            c2.querySelector('.card-front').style.display = 'flex';
                            c2.querySelector('.card-back').style.display = 'none';
                        }
                        openedCards = [];
                        lockBoard = false;
                        
                        if (resultDiv.innerHTML.includes('Неправильно')) {
                            resultDiv.innerHTML = '';
                        }
                    }, 1000);
                }
            }
        });
    });
}

function switchPreschoolMode(mode) {
    if (mode === 'alphabet') renderAlphabet();
    else if (mode === 'matching') renderMatching();
}

function initPreschoolPage() {
    const modeBtns = document.querySelectorAll('.mode-btn');
    if (!modeBtns.length) return;
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const mode = btn.getAttribute('data-mode');
            switchPreschoolMode(mode);
        });
    });
    switchPreschoolMode('alphabet');
}

// ========== 1-4 КЛАССЫ (с режимами изучения/игры) ==========
const gradeData = {
    family: [
        { word: "mother", translation: "мама", emoji: "👩" },
        { word: "father", translation: "папа", emoji: "👨" },
        { word: "brother", translation: "брат", emoji: "👦" },
        { word: "sister", translation: "сестра", emoji: "👧" },
        { word: "grandmother", translation: "бабушка", emoji: "👵" },
        { word: "grandfather", translation: "дедушка", emoji: "👴" }
    ],
    numbers: [
        { word: "one", translation: "один", emoji: "1️⃣" },
        { word: "two", translation: "два", emoji: "2️⃣" },
        { word: "three", translation: "три", emoji: "3️⃣" },
        { word: "four", translation: "четыре", emoji: "4️⃣" },
        { word: "five", translation: "пять", emoji: "5️⃣" },
        { word: "six", translation: "шесть", emoji: "6️⃣" },
        { word: "seven", translation: "семь", emoji: "7️⃣" },
        { word: "eight", translation: "восемь", emoji: "8️⃣" },
        { word: "nine", translation: "девять", emoji: "9️⃣" },
        { word: "ten", translation: "десять", emoji: "🔟" }
    ],
    animals: [
        { word: "cat", translation: "кошка", emoji: "🐱" },
        { word: "dog", translation: "собака", emoji: "🐶" },
        { word: "bird", translation: "птица", emoji: "🐦" },
        { word: "fish", translation: "рыба", emoji: "🐟" },
        { word: "rabbit", translation: "кролик", emoji: "🐰" },
        { word: "horse", translation: "лошадь", emoji: "🐴" }
    ],
    house: [
        { word: "table", translation: "стол", emoji: "🪑" },
        { word: "chair", translation: "стул", emoji: "🪑" },
        { word: "bed", translation: "кровать", emoji: "🛏️" },
        { word: "lamp", translation: "лампа", emoji: "💡" },
        { word: "window", translation: "окно", emoji: "🪟" },
        { word: "door", translation: "дверь", emoji: "🚪" }
    ]
};

let currentGradeTopic = "family";
let currentGradeMode = "study";

function renderStudyMode(topic) {
    const items = gradeData[topic];
    if (!items) return;
    
    let html = `
        <div style="text-align:center; margin-bottom:20px;">
            <p>📖 Изучай слова: смотри на картинку, слушай произношение и запоминай перевод.</p>
        </div>
        <div class="study-cards" style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;">
    `;
    
    items.forEach(item => {
        const isLearned = isTopicLearned(`grade_${topic}_${item.word}`);
        html += `
            <div class="study-card" style="
                background: #fffef7;
                border-radius: 24px;
                width: 180px;
                padding: 15px;
                text-align: center;
                box-shadow: 0 6px 12px rgba(0,0,0,0.08);
                border: 1px solid #e2d4c4;
                transition: transform 0.2s;
                ${isLearned ? 'opacity: 0.7;' : ''}
            ">
                <div style="font-size: 3rem;">${item.emoji}</div>
                <div style="font-size: 1.8rem; font-weight: bold; margin: 10px 0;">${item.word}</div>
                <div style="font-size: 1.2rem; color: #6b5a48;">${item.translation}</div>
                <button class="speak-study-btn" data-word="${item.word}" style="
                    background: #e8dccc;
                    border: none;
                    border-radius: 30px;
                    padding: 8px 16px;
                    margin-top: 12px;
                    cursor: pointer;
                    font-family: inherit;
                    font-size: 0.9rem;
                ">🔊 Произнести</button>
                <button class="mark-btn" data-topic="grade_${topic}_${item.word}" style="
                    background: #d9e0c5;
                    border: none;
                    border-radius: 30px;
                    padding: 8px 16px;
                    margin-top: 8px;
                    cursor: pointer;
                    font-family: inherit;
                    font-size: 0.9rem;
                    width: 100%;
                ">${isLearned ? '✅ Выучено' : '✔️ Выучил(а)'}</button>
            </div>
        `;
    });
    
    html += `</div><div style="text-align:center; margin-top: 30px;">
        <button id="mark-topic-learned-study" class="btn" data-topic="${topic}">📚 Отметить тему "${getTopicName(topic)}" выученной</button>
    </div>`;
    
    const area = document.getElementById('content-area');
    if (area) area.innerHTML = html;
    
    document.querySelectorAll('.speak-study-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const word = btn.getAttribute('data-word');
            speakText(word);
        });
    });
    
    initMarkButtons();
    
    const markTopicBtn = document.getElementById('mark-topic-learned-study');
    if (markTopicBtn) {
        markTopicBtn.addEventListener('click', () => {
            const allWords = gradeData[topic].map(item => `grade_${topic}_${item.word}`);
            const progress = loadProgress();
            let allLearned = true;
            allWords.forEach(key => {
                if (!progress[key]) allLearned = false;
            });
            if (allLearned) {
                markTopic(`grade_topic_${topic}`);
                alert(`🎉 Тема "${getTopicName(topic)}" отмечена как выученная!`);
                markTopicBtn.disabled = true;
                markTopicBtn.textContent = '✅ Тема выучена';
                markTopicBtn.style.opacity = '0.6';
            } else {
                alert('🔍 Сначала отметь все слова как выученные (нажми кнопку "Выучил(а)" на каждой карточке).');
            }
        });
        if (isTopicLearned(`grade_topic_${topic}`)) {
            markTopicBtn.disabled = true;
            markTopicBtn.textContent = '✅ Тема выучена';
            markTopicBtn.style.opacity = '0.6';
        }
    }
}

function renderGameMode(topic) {
    const items = gradeData[topic];
    if (!items) return;
    
    const shuffledItems = [...items];
    for (let i = shuffledItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledItems[i], shuffledItems[j]] = [shuffledItems[j], shuffledItems[i]];
    }
    
    let html = `
        <div class="grade-instruction" style="text-align:center; margin:15px 0;">
            <p>🎮 Нажми на слово, а потом на картинку, чтобы соединить их!</p>
        </div>
        <div class="grade-game">
            <div class="words-column">
                <h3>📖 Английские слова</h3>
                <div class="grade-words-list">
    `;
    
    items.forEach((item, idx) => {
        html += `
            <div class="grade-word-card" data-word="${item.word}" data-word-idx="${idx}">
                <span class="word-text">${item.word}</span>
                <button class="speak-word-btn" data-word="${item.word}">🔊</button>
            </div>
        `;
    });
    
    html += `</div></div><div class="pictures-column"><h3>🖼️ Картинки (смайлики)</h3><div class="grade-pictures-list">`;
    
    shuffledItems.forEach((item, idx) => {
        html += `
            <div class="grade-picture-card" data-word="${item.word}" data-pic-idx="${idx}">
                <span class="picture-emoji" style="font-size: 3rem;">${item.emoji}</span>
                <div class="picture-label">${item.translation}</div>
            </div>
        `;
    });
    
    html += `</div></div></div><div class="result-message" id="grade-result" style="margin-top:20px; text-align:center; font-weight:bold;"></div>`;
    html += `<div class="topic-complete-btn"><button id="mark-topic-learned-game" class="btn" data-topic="${topic}">📚 Я выучил(а) эту тему</button></div>`;
    
    const area = document.getElementById('content-area');
    if (area) area.innerHTML = html;
    
    let gradeSelectedCard = null;
    
    document.querySelectorAll('.grade-word-card').forEach(wordCard => {
        wordCard.addEventListener('click', (e) => {
            if (e.target.classList.contains('speak-word-btn')) return;
            document.querySelectorAll('.grade-word-card').forEach(c => c.classList.remove('selected'));
            wordCard.classList.add('selected');
            gradeSelectedCard = { type: 'word', word: wordCard.getAttribute('data-word'), element: wordCard };
        });
    });
    
    document.querySelectorAll('.grade-picture-card').forEach(picCard => {
        picCard.addEventListener('click', () => {
            if (!gradeSelectedCard || gradeSelectedCard.type !== 'word') {
                const resultDiv = document.getElementById('grade-result');
                resultDiv.innerHTML = '⚠️ Сначала выбери слово!';
                resultDiv.style.color = '#c44';
                setTimeout(() => {
                    if (resultDiv.innerHTML === '⚠️ Сначала выбери слово!') resultDiv.innerHTML = '';
                }, 1200);
                return;
            }
            
            const expectedWord = gradeSelectedCard.word;
            const pictureWord = picCard.getAttribute('data-word');
            const resultDiv = document.getElementById('grade-result');
            
            if (expectedWord === pictureWord) {
                resultDiv.innerHTML = '✅ Правильно! Молодец! 🎉';
                resultDiv.style.color = '#2c5e2a';
                const progressKey = `grade_${topic}_${expectedWord}`;
                markTopic(progressKey);
                gradeSelectedCard.element.style.opacity = '0.6';
                picCard.style.opacity = '0.6';
                gradeSelectedCard.element.classList.remove('selected');
                gradeSelectedCard = null;
            } else {
                resultDiv.innerHTML = `❌ Неправильно! "${gradeSelectedCard.word}" не подходит к этой картинке. Попробуй ещё!`;
                resultDiv.style.color = '#c44';
                gradeSelectedCard.element.classList.remove('selected');
                gradeSelectedCard = null;
                setTimeout(() => {
                    if (resultDiv.innerHTML.includes('Неправильно')) resultDiv.innerHTML = '';
                }, 1800);
            }
        });
    });
    
    document.querySelectorAll('.speak-word-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const word = btn.getAttribute('data-word');
            speakText(word);
        });
    });
    
    const markBtn = document.getElementById('mark-topic-learned-game');
    if (markBtn) {
        markBtn.addEventListener('click', () => {
            const allWords = gradeData[topic].map(item => `grade_${topic}_${item.word}`);
            const progress = loadProgress();
            let allLearned = true;
            allWords.forEach(key => {
                if (!progress[key]) allLearned = false;
            });
            if (allLearned) {
                markTopic(`grade_topic_${topic}`);
                alert(`🎉 Тема "${getTopicName(topic)}" отмечена как выученная!`);
                markBtn.disabled = true;
                markBtn.textContent = '✅ Тема выучена';
                markBtn.style.opacity = '0.6';
            } else {
                alert('🔍 Сначала сопоставь все слова с картинками!');
            }
        });
        if (isTopicLearned(`grade_topic_${topic}`)) {
            markBtn.disabled = true;
            markBtn.textContent = '✅ Тема выучена';
            markBtn.style.opacity = '0.6';
        }
    }
}

function getTopicName(topicKey) {
    const names = { family: 'Семья', numbers: 'Числительные', animals: 'Животные', house: 'Предметы в доме' };
    return names[topicKey] || topicKey;
}

function switchGradeTopic(topic) {
    currentGradeTopic = topic;
    if (currentGradeMode === 'study') {
        renderStudyMode(topic);
    } else {
        renderGameMode(topic);
    }
}

function switchGradeMode(mode) {
    currentGradeMode = mode;
    const studyBtn = document.getElementById('study-mode-btn');
    const gameBtn = document.getElementById('game-mode-btn');
    if (studyBtn && gameBtn) {
        if (mode === 'study') {
            studyBtn.classList.add('active-mode');
            gameBtn.classList.remove('active-mode');
        } else {
            gameBtn.classList.add('active-mode');
            studyBtn.classList.remove('active-mode');
        }
    }
    switchGradeTopic(currentGradeTopic);
}

function initGradesPage() {
    const topicBtns = document.querySelectorAll('.mode-buttons .mode-btn');
    if (topicBtns.length) {
        topicBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                topicBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const topic = btn.getAttribute('data-topic');
                switchGradeTopic(topic);
            });
        });
    }
    
    const studyModeBtn = document.getElementById('study-mode-btn');
    const gameModeBtn = document.getElementById('game-mode-btn');
    if (studyModeBtn && gameModeBtn) {
        studyModeBtn.addEventListener('click', () => switchGradeMode('study'));
        gameModeBtn.addEventListener('click', () => switchGradeMode('game'));
    }
    
    currentGradeMode = 'study';
    renderStudyMode('family');
}

// ========== ВРЕМЕНА ==========
const tensesQuestions = [
    { sentence: "She usually _____ (walk) to school.", correct: "present_simple", explanation: "Действие происходит обычно, регулярно. Present Simple для фактов и привычек." },
    { sentence: "Look! They _____ (play) football now.", correct: "present_continuous", explanation: "Действие происходит в момент речи, слово 'now' и восклицание 'Look!'." },
    { sentence: "I _____ (see) a very interesting film yesterday.", correct: "past_simple", explanation: "Действие завершилось в прошлом, есть слово 'yesterday'." },
    { sentence: "At 6 pm yesterday, I _____ (have) dinner.", correct: "past_continuous", explanation: "Указан конкретный момент в прошлом — длительное действие." },
    { sentence: "He _____ (finish) his project by next week.", correct: "future_simple", explanation: "Действие произойдёт в будущем, указано 'next week'." },
    { sentence: "I _____ (already / see) this movie.", correct: "present_perfect", explanation: "Слово 'already' указывает на Present Perfect." }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let totalAnswered = 0;

function loadTensesQuestion(index) {
    const q = tensesQuestions[index];
    if (!q) return;
    document.getElementById('sentence-display').innerHTML = q.sentence;
    document.getElementById('tense-select').value = '';
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('feedback').className = 'feedback';
}

function checkTensesAnswer() {
    const selected = document.getElementById('tense-select').value;
    const question = tensesQuestions[currentQuestionIndex];
    if (!selected) {
        document.getElementById('feedback').innerHTML = 'Пожалуйста, выберите время.';
        document.getElementById('feedback').className = 'feedback wrong';
        return;
    }
    const isCorrect = (selected === question.correct);
    totalAnswered++;
    if (isCorrect) correctAnswers++;
    document.getElementById('correct-count').innerText = correctAnswers;
    document.getElementById('total-count').innerText = totalAnswered;
    
    let feedbackHtml = '';
    if (isCorrect) {
        feedbackHtml += '<p>✅ <strong>Правильно!</strong> Отлично!</p>';
    } else {
        const correctName = document.querySelector(`#tense-select option[value="${question.correct}"]`).innerText;
        feedbackHtml += `<p>❌ <strong>Неправильно.</strong> Правильный ответ: ${correctName}.</p>`;
    }
    feedbackHtml += `<p><strong>📖 Объяснение:</strong> ${question.explanation}</p>`;
    const feedbackDiv = document.getElementById('feedback');
    feedbackDiv.innerHTML = feedbackHtml;
    feedbackDiv.className = `feedback ${isCorrect ? 'correct' : 'wrong'}`;
}

function nextTensesQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % tensesQuestions.length;
    loadTensesQuestion(currentQuestionIndex);
}

function initTensesPage() {
    if (!document.getElementById('training-question')) return;
    loadTensesQuestion(0);
    document.getElementById('check-answer').addEventListener('click', checkTensesAnswer);
    document.getElementById('next-question').addEventListener('click', nextTensesQuestion);
}

// ========== НЕПРАВИЛЬНЫЕ ГЛАГОЛЫ (45) ==========
const irregularVerbs = [
    { infinitive: "be", past: "was/were", participle: "been", translation: "быть" },
    { infinitive: "become", past: "became", participle: "become", translation: "становиться" },
    { infinitive: "begin", past: "began", participle: