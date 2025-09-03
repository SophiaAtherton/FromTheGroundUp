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
				{ min: 0, max: 45, model: 'low-loft.jpg' },
				{ min: 46, max: 65, model: 'mid-loft.jpg' },
				{ min: 66, max: 85, model: 'high-loft.jpg' }
			],
			baseScore: 0
		}
	};

	// Get housing type and scores
	const housingType = localStorage.getItem('selectedHousingType');
	const scores = JSON.parse(localStorage.getItem('sustainabilityScores')) || [];
	const answersTotal = scores.reduce((sum, val) => sum + (parseInt(val) || 0), 0);

	// Add base score and clamp
	let baseScore = 0;
	if (housingType && housingData[housingType]) {
		baseScore = housingData[housingType].baseScore;
	}
	const totalScore = Math.min(100, Math.max(0, answersTotal + baseScore));

	// Select correct model
	let modelRange = null;
	if (housingType && housingData[housingType]) {
		modelRange = housingData[housingType].ranges.find(range =>
			totalScore >= range.min && totalScore <= range.max
		);
	}

	// Set image and score
	const houseImg = document.getElementById('houseImage');
	if (houseImg && modelRange) {
		houseImg.src = `assets/${modelRange.model}`;
	} else if (houseImg) {
		houseImg.src = 'assets/low-apartment.png'; // fallback
	}
	const scoreDisplay = document.getElementById('sustainabilityScore');
	if (scoreDisplay) {
		scoreDisplay.textContent = totalScore;
	}

	// Animation: scale down the house image
	setTimeout(() => {
		houseImg.classList.add('scale-down');
	}, 400);
});
