const buttons = document.querySelectorAll('button');
buttons.forEach(b => b.addEventListener('click', () => {
    const result = document.querySelector('#result');
    if (result) {
        const arr = result.innerHTML.split('');
        if (b.classList.contains('primary') || b.classList.contains('secondary')) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == '|') {
                    const temp = '|';
                    arr[i] = b.innerHTML;
                    arr[i + 1] = temp;
                    break;
                }
            }
            if (arr[arr.length - 2] == '+' || arr[arr.length - 2] == '-' || arr[arr.length - 2] == '×' || arr[arr.length - 2] == '÷') {
                if (arr[arr.length - 3] == '+' || arr[arr.length - 3] == '-' || arr[arr.length - 3] == '×' || arr[arr.length - 3] == '÷') {
                    arr[arr.length - 3] = arr[arr.length - 2];
                    arr.splice(2, 1);
                }
            }
            if (arr[arr.length - 2] == '.') {
                if (arr[arr.length - 3] == '.') {
                    arr.splice(3, 1);
                }
            }
            result.innerHTML = arr.join('');
        }
    }
}));
export {};