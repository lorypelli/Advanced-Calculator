import './style.css';
const buttons = document.querySelectorAll('button');
buttons.forEach(b => b.addEventListener('click', () => {
    const result = document.querySelector('#result') as HTMLElement;
    if (result) {
        const arr = result.innerText.split('');
        if (b.classList.contains('primary') || b.classList.contains('secondary')) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == '|') {
                    arr.splice(i + 1, 0, b.innerText);
                    const temp = '|';
                    arr[i] = b.innerText;
                    arr[i + 1] = temp;
                    break;
                }
            }
            if (['+', '-', '×', '÷'].includes(arr[arr.length - 2])) {
                if (['+', '-', '×', '÷'].includes(arr[arr.length - 3])) {
                    arr[arr.length - 3] = arr[arr.length - 2];
                    arr[arr.length - 2] = '';
                }
            }
            if (arr[arr.length - 2] == '.' || arr[arr.length - 2] == '^') {
                if (arr[arr.length - 3] == '.' || arr[arr.length - 3] == '^') {
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
        case 'res': {
            const res = result.innerText.replaceAll('×', '*').replaceAll('÷', '/').replaceAll('^', '**');
            let newRes = '';
            let finalRes = '';
            for (let i = 0; i < arr.length; i++) {
                if (arr[0] != '(' && (arr[i] == '(' && (arr[i - 1] != '×' && ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(arr[i - 1])))) {
                    newRes = arr.slice(0, i).join('') + '*' + arr.slice(i).join('');
                    break;
                }
                else {
                    newRes = res;
                }
            }
            try {
                finalRes = eval(newRes.replace('|', ''));
                if (Number.isNaN(finalRes) || finalRes == 'Infinity') {
                    finalRes = '∞';
                }
            }
            catch {
                finalRes = result.innerText.replace('|', '');
            }
            result.innerText = finalRes + '|';
            break;
        }
        case 'exit': {
            const table = document.querySelectorAll('table');
            table[0].style.display = 'none';
            table[1].style.display = 'block';
            break;
        }
        case 'open': {
            const table = document.querySelectorAll('table');
            table[1].style.display = 'none';
            table[0].style.display = 'block';
            break;
        }
        }
        if (b.id != 'res') {
            result.innerText = arr.join('');
        }
    }
}));