// Housing data configuration
const housingData = {
    house: {
        ranges: [
            { min: 0, max: 45, model: 'house-low.png' },
            { min: 46, max: 65, model: 'house-medium.png' },
            { min: 66, max: 85, model: 'house-high.png' }
        ],
        baseScore: 15
    },
    apartment: {
        ranges: [
            { min: 0, max: 45, model: 'apartment-low.png' },
            { min: 46, max: 65, model: 'apartment-medium.png' },
            { min: 66, max: 85, model: 'apartment-high.png' }
        ],
        baseScore: 35
    },
    loft: {
        ranges: [
            { min: 0, max: 45, model: 'loft-low.png' },
            { min: 46, max: 65, model: 'loft-medium.png' },
            { min: 66, max: 85, model: 'loft-high.png' }
        ],
        baseScore: 50
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.option-card');
    
    // Debug: Check if cards are found
    console.log('Found option cards:', cards.length);
    
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const sustainability = parseInt(card.dataset.sustainability);
                const housingType = card.dataset.housingType;
                const currentUrl = window.location.pathname;
                const questionMatch = currentUrl.match(/question-(\d+)/);
                const currentQuestion = questionMatch ? parseInt(questionMatch[1]) : 1;

                // Save housing type ONLY for question 1
                    if (currentQuestion === 1 && housingType) {
                        localStorage.setItem('selectedHousingType', housingType);
                        console.log('Saved housing type:', housingType);
                    }
                    // Defensive: If housingType is not set, keep previous value
                    if (currentQuestion === 1 && !housingType) {
                        console.warn('No housingType found on question 1 card click!');
                    }

                // Debug: Log each score as it's saved
                console.log(`Question ${currentQuestion} score:`, sustainability);
                let scores = JSON.parse(localStorage.getItem('sustainabilityScores')) || [];
                scores[currentQuestion - 1] = sustainability;
                // Debug: Log updated scores array
                console.log('Updated scores array:', scores);
                localStorage.setItem('sustainabilityScores', JSON.stringify(scores));
                // Visual feedback and navigation
                cards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                setTimeout(() => {
                    if (currentQuestion === 5) {
                        window.location.href = 'results.html';
                    } else {
                        window.location.href = `question-${currentQuestion + 1}.html`;
                    }
                }, 800);
            });
        });

    // Set initial progress based on current page
    updateProgress();
    // Listen for page show (back/forward navigation)
    window.addEventListener('pageshow', updateProgress);
});



// Add this function to determine final house model
function getFinalHouseModel() {
    const housingType = localStorage.getItem('selectedHousingType');
    const sustainabilityScore = parseInt(localStorage.getItem('sustainabilityScore'));
    
    const houseTypeData = housingData[housingType];
    const modelRange = houseTypeData.ranges.find(range => 
        sustainabilityScore >= range.min && sustainabilityScore <= range.max
    );
    
    return {
        model: modelRange.model,
        label: modelRange.label,
        score: sustainabilityScore,
        type: housingType
    };
}