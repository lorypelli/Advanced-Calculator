const buttons = document.querySelectorAll('button');
buttons.forEach(b => b.addEventListener('click', () => {
    const result = document.querySelector('#result');
    if (result) {
        const arr = result.innerHTML.split('');
        if (b.classList.contains('primary') || b.classList.contains('secondary')) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == '|') {
                    arr.splice(i + 1, 0, b.innerHTML);
                    const temp = '|';
                    arr[i] = b.innerHTML;
                    arr[i + 1] = temp;
                    break;
                }
            }
            if (arr[arr.length - 2] == '+' || arr[arr.length - 2] == '-' || arr[arr.length - 2] == '×' || arr[arr.length - 2] == '÷') {
                if (arr[arr.length - 3] == '+' || arr[arr.length - 3] == '-' || arr[arr.length - 3] == '×' || arr[arr.length - 3] == '÷') {
                    arr[arr.length - 3] = arr[arr.length - 2];
                    arr[arr.length - 2] = '';
                }
            }
            if (arr[arr.length - 2] == '.') {
                if (arr[arr.length - 3] == '.') {
                    arr[arr.length - 3] = '';
                }
            }
        }
        switch (b.id) {
        case 'del': {
            for (let i = 0; i < arr.length; i++) {
                if (arr[0] != '|' && arr[i] == '|') {
                    arr.splice(i - 1, 1);
                    break;
                }
            }
            break;
        }
        case 'clear': {
            arr.length = 1;
            arr[0] = '|';
            break;
        }
        case 'left': {
            for (let i = 0; i < arr.length; i++) {
                if (arr[0] != '|' && arr[i] == '|') {
                    const temp = '|';
                    arr[i] = arr[i - 1];
                    arr[i - 1] = temp;
                    break;
                }
            }
            break;
        }
        case 'right': {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == '|') {
                    const temp = '|';
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                    break;
                }
            }
            break;
        }
        }
        result.innerHTML = arr.join('');
    }
}));
export {};