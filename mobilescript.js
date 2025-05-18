// script.js
const words = ['MIT App Inventor', 'Blocks', 'Maze Games', 'You Can Do It', 'Make Your Parents Proud', '#4Flat', 'Study! Study! Study!'];

const getRandomPosition = () => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    return { x, y };
};

setInterval(() => {
    const container = document.getElementById('random-text-container');
    const span = document.createElement('span');
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const { x, y } = getRandomPosition();
    span.innerText = randomWord;
    span.style.position = 'absolute';
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    span.style.opacity = '0';
    span.style.fontSize = '50px';
    span.style.color = '#ffffff';
    span.style.animation = 'fade 1.5s forwards';
    container.appendChild(span);

    setTimeout(() => {
        container.removeChild(span);
    }, 2500);
}, 1000);
