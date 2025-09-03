document.addEventListener('DOMContentLoaded', () => {
    // Housing data config
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

    // Retrieve housing type and scores from localStorage
    const housingType = localStorage.getItem('selectedHousingType');
    const scores = JSON.parse(localStorage.getItem('sustainabilityScores')) || [];
    // Calculate total score
    const minRaw = 25, maxRaw = 54, minScore = 35, maxScore = 85;
    const answersTotal = scores.reduce((sum, val) => sum + (parseInt(val) || 0), 0);
    const clampedScore = Math.max(minRaw, Math.min(answersTotal, maxRaw));
    const totalScore = Math.round(((clampedScore - minRaw) / (maxRaw - minRaw)) * (maxScore - minScore) + minScore);
    // Select correct model
    let modelRange = null;
    if (housingType && housingData[housingType]) {
        modelRange = housingData[housingType].ranges.find(range => totalScore >= range.min && totalScore <= range.max);
    }
    // Set image and score
    const houseImg = document.getElementById('houseImage');
    if (houseImg && modelRange) {
        houseImg.src = `assets/${modelRange.model}`;
    } else if (houseImg) {
        houseImg.src = 'assets/low-apartment.png';
    }
    const scoreDisplay = document.getElementById('sustainabilityScore');
    if (scoreDisplay) scoreDisplay.textContent = totalScore;
    // Animation sequence
    const arrowImg = document.getElementById('arrowImage');
    const resultsText = document.getElementById('resultsText');
    setTimeout(() => {
        houseImg.classList.add('grow');
    }, 200);
    setTimeout(() => {
        arrowImg.classList.add('slide-in');
        resultsText.classList.add('shift-left');
    }, 1400);
});