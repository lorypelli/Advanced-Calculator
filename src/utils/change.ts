export function open() {
    const table = document.querySelectorAll('table');
    table[1].style.display = 'none';
    table[0].style.display = 'block';
}

export function close() {
    const table = document.querySelectorAll('table');
    table[0].style.display = 'none';
    table[1].style.display = 'block';
}
