const buttons = document.querySelectorAll('button');
buttons.forEach(b => b.addEventListener('click', () => {
    const result = document.querySelector('#result');
    if (result) {
        if (b.classList.contains('primary') || b.classList.contains('secondary')) {
            result.innerHTML += b.innerHTML;
        }
    }
}));
export {};