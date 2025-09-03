document.addEventListener('DOMContentLoaded', function() {
    const cards = [
        document.getElementById('card1'),
        document.getElementById('card2'),
        document.getElementById('card3')
    ];
    const dots = document.querySelectorAll('.carousel-dot');
    let current = 0;
        function updateCardPositions(idx) {
            cards.forEach((card, i) => {
                card.classList.remove('active-card', 'left-card', 'right-card', 'faded', 'next-card');
                card.style.zIndex = 1;
                if (i === idx) {
                    card.classList.add('active-card');
                    card.style.zIndex = 2;
                    card.style.opacity = 1;
                    card.style.left = '50%';
                    card.style.transform = 'translate(-50%, 0) scale(1)';
                } else if (i < idx) {
                    card.classList.add('left-card');
                    card.style.opacity = 0.4;
                    card.style.left = 'calc(50% - 260px)';
                    card.style.transform = 'translate(-50%, 0) scale(0.85)';
                } else if (i === idx + 1) {
                    card.classList.add('next-card');
                    card.style.opacity = 0.6;
                    card.style.left = 'calc(50% + 260px)';
                    card.style.transform = 'translate(-50%, 0) scale(0.85)';
                } else {
                    card.classList.add('right-card');
                    card.style.opacity = 0.4;
                    card.style.left = 'calc(50% + 520px)';
                    card.style.transform = 'translate(-50%, 0) scale(0.85)';
                }
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === idx);
            });
            current = idx;
        }
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
                updateCardPositions(i);
        });
    });
    cards.forEach((card, i) => {
        card.addEventListener('click', () => {
            if (i < cards.length - 1) {
                    updateCardPositions(i + 1);
            }
        });
    });
        updateCardPositions(0);
});
