// SPA Questionnaire Logic
const housingData = {
    house: {
        ranges: [
            { min: 0, max: 45, model: 'low-house.png' },
            { min: 46, max: 65, model: 'mid-house.png' },
            { min: 66, max: 85, model: 'high-house.png' }
        ],
        baseScore: 0
    },
    apartment: {
        ranges: [
            { min: 0, max: 45, model: 'low-apartment.png' },
            { min: 46, max: 65, model: 'mid-apartment.png' },
            { min: 66, max: 85, model: 'high-apartment.png' }
        ],
        baseScore: 0
    },
    loft: {
        ranges: [
            { min: 0, max: 45, model: 'low-loft.png' },
            { min: 46, max: 65, model: 'mid-loft.png' },
            { min: 66, max: 85, model: 'high-loft.png' }
        ], 
        baseScore: 0
    }
};

const NUM_QUESTIONS = 5;
let currentQuestion = 1;

function showQuestion(index) {
    // Fade out current
    const views = document.querySelectorAll('.question-view, .results-view');
    views.forEach(v => v.style.display = 'none');
    const nextView = document.getElementById(`question-${index}-view`);
    if (nextView) {
        nextView.style.opacity = 0;
        nextView.style.display = '';
        setTimeout(() => {
            nextView.style.transition = 'opacity 0.7s cubic-bezier(0.77,0,0.175,1)';
            nextView.style.opacity = 1;
        }, 10);
    }
}

function showResults() {
    const views = document.querySelectorAll('.question-view, .results-view');
    views.forEach(v => v.style.display = 'none');
    const resultsView = document.getElementById('results-view');
    if (resultsView) {
        resultsView.style.opacity = 0;
        resultsView.style.display = '';
        setTimeout(() => {
            resultsView.style.transition = 'opacity 0.7s cubic-bezier(0.77,0,0.175,1)';
            resultsView.style.opacity = 1;
        }, 10);
    }
    updateProgress(NUM_QUESTIONS + 1);
    // Populate results
    populateResults();
}

function getFinalHouseModel() {
    const housingType = localStorage.getItem('selectedHousingType');
    const scores = JSON.parse(localStorage.getItem('sustainabilityScores')) || [];
    const rawScore = scores.reduce((a, b) => a + b, 0);
    // Map raw score to percentage: lowest possible = 35%, highest = 85%
    const minScore = 35; // minimum sustainable percentage
    const maxScore = 85; // maximum sustainable percentage
    const minRaw = 25;   // lowest possible sum (5+5+4+6+5)
    const maxRaw = 54;   // highest possible sum (5+15+12+12+10)
    // Clamp rawScore between minRaw and maxRaw
    const clampedScore = Math.max(minRaw, Math.min(rawScore, maxRaw));
    // Calculate percentage
    const sustainabilityScore = Math.round(((clampedScore - minRaw) / (maxRaw - minRaw)) * (maxScore - minScore) + minScore);
    let houseTypeData = housingData[housingType];
    if (!houseTypeData) {
        // fallback to apartment if not set
        houseTypeData = housingData['apartment'];
    }
    const modelRange = houseTypeData.ranges.find(range =>
        sustainabilityScore >= range.min && sustainabilityScore <= range.max
    );
    return {
        model: modelRange ? modelRange.model : 'apartment-low.png',
        score: sustainabilityScore,
        type: housingType || 'apartment'
    };
}

function populateResults() {
    const result = getFinalHouseModel();
    const scoreEl = document.getElementById('sustainabilityScore');
    if (scoreEl) scoreEl.textContent = result.score;
    const houseImg = document.getElementById('houseImage');
    if (houseImg) houseImg.src = `assets/${result.model}`;
}

function updateProgress(qIndex) {
    const progressBar = document.querySelector('.progress');
    if (!progressBar) return;
    let progressPercentage = 0;
    if (qIndex >= 1 && qIndex <= NUM_QUESTIONS) {
        progressPercentage = (qIndex / (NUM_QUESTIONS + 1)) * 100;
    } else if (qIndex === NUM_QUESTIONS + 1) {
        progressPercentage = 100;
    }
    progressBar.style.transition = 'width 0.7s cubic-bezier(0.77,0,0.175,1)';
    progressBar.style.width = `${progressPercentage}%`;
}

function handleOptionClick(card, qIndex) {
    const sustainability = parseInt(card.dataset.sustainability);
    const housingType = card.dataset.housingType;
    let scores = JSON.parse(localStorage.getItem('sustainabilityScores')) || [];
    scores[qIndex - 1] = sustainability;
    localStorage.setItem('sustainabilityScores', JSON.stringify(scores));
    if (qIndex === 1 && housingType) {
        localStorage.setItem('selectedHousingType', housingType);
    }
    // Animate fade out
    const view = document.getElementById(`question-${qIndex}-view`);
    if (view) {
        view.style.transition = 'opacity 0.7s cubic-bezier(0.77,0,0.175,1)';
        view.style.opacity = 0;
        setTimeout(() => {
            if (qIndex === NUM_QUESTIONS) {
                window.location.href = 'results.html';
            } else {
                showQuestion(qIndex + 1);
            }
        }, 700);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showQuestion(1);
    for (let i = 1; i <= NUM_QUESTIONS; i++) {
        const view = document.getElementById(`question-${i}-view`);
        if (view) {
            const cards = view.querySelectorAll('.option-card');
            cards.forEach(card => {
                card.addEventListener('click', () => handleOptionClick(card, i));
            });
        }
    }
});
