import './style.css';
const buttons = document.querySelectorAll('button');
const temp = '|';
buttons.forEach(b => b.addEventListener('click', () => {
    const result = document.querySelector('#result') as HTMLElement;
    if (result) {
        const arr = result.innerText.split('');
        if (arr[0] == '∞' || arr[0] == '-∞') {
            arr.splice(0, 1);
        }
        if (b.classList.contains('primary') || b.classList.contains('secondary')) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == '|') {
                    arr.splice(i + 1, 0, b.innerText);
                    arr[i] = b.innerText;
                    arr[i + 1] = temp;
                    break;
                }
            }
            switch (b.innerText) {
            case '(': {
                arr.push(')');
                break;
            }
            case 'sin':
            case 'cos':
            case 'tan':
            case 'log': {
                let open = 0;
                let close = 0;
                for (let i = 0; i < arr.length; i++) {
                    if (['sin', 'cos', 'tan', 'log'].includes(arr[i])) {
                        if (arr[i + 1] == '|') {
                            arr[i + 1] = '(';
                            arr[i + 2] = '|';
                            arr[i + 3] = ')';
                        }
                    }
                    switch (arr[i]) {
                    case '(': {
                        open++;
                        break;
                    }
                    case ')': {
                        close++;
                        break;
                    }
                    }
                }
                if (open > close) {
                    for (let i = 0; i < open - close; i++) {
                        arr.push(')');
                    }
                }
                break;
            }
            }
        }
        switch (b.id) {
        case 'del': {
            for (let i = 0; i < arr.length; i++) {
                if (arr[0] != '|' && arr[i] == '|') {
                    if (['s', 'c', 't', 'l'].includes(arr[i - 4]) && ['i', 'o', 'a'].includes(arr[i - 3]) && ['n', 's', 'g'].includes(arr[i - 2])) {
                        arr.splice(i - 4, 4);
                    }
                    else {
                        arr.splice(i - 1, 1);
                    }
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
                    if (['n', 's', 'g'].includes(arr[i - 2])) {
                        arr[i] = arr[i - 1];
                        arr[i - 1] = arr[i - 2];
                        arr[i - 2] = arr[i - 3];
                        arr[i - 3] = arr[i - 4];
                        arr[i - 4] = temp;
                    }
                    else {
                        arr[i] = arr[i - 1];
                        arr[i - 1] = temp;
                    }
                    break;
                }
            }
            break;
        }
        case 'right': {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == '|') {
                    if (['s', 'c', 't', 'l'].includes(arr[i + 1])) {
                        arr[i] = arr[i + 1];
                        arr[i + 1] = arr[i + 2];
                        arr[i + 2] = arr[i + 3];
                        arr[i + 3] = arr[i + 4];
                        arr[i + 4] = temp;
                    }
                    else {
                        arr[i] = arr[i + 1];
                        arr[i + 1] = temp;
                    }
                    break;
                }
            }
            break;
        }
        case 'res': {
            let finalRes = '';
            for (let i = 0; i < arr.length; i++) {
                if (arr[0] != '(' && (arr[i] == '(' && (arr[i - 1] != '×' && ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(arr[i - 1])))) {
                    arr.splice(i, 0, '×');
                    break;
                }
                if (!isNaN(parseFloat(arr[i - 1])) && ['s', 'c', 't', 'l'].includes(arr[i])) {
                    arr.splice(i, 0, '×');
                    break;
                }
                while (arr[i] == '0' && arr[i - 1] == '0' && !['+', '-', '×', '÷'].includes(arr[i - 1])) {
                    arr.splice(i, 1);
                }
            }
            try {
                finalRes = eval(arr.join('').replaceAll('×', '*').replaceAll('÷', '/').replaceAll('^', '**').replaceAll('sin', 'Math.sin').replaceAll('cos', 'Math.cos').replaceAll('tan', 'Math.tan').replaceAll('log', 'Math.log').replace(/(\d+)!/g, (number) => {
                    return `factorial(${number.replace('!', '')})`;
                }).replace('|', ''));
                if (finalRes == 'Infinity') {
                    finalRes = '∞';
                }
                else if (finalRes == '-Infinity') {
                    finalRes = '-∞';
                }
                else if (isNaN(parseFloat(finalRes))) {
                    finalRes = result.innerText.replace('|', '');
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
document.addEventListener('keydown', (e) => {
    e.preventDefault();
    const result = document.querySelector('#result') as HTMLElement;
    if (result) {
        const arr = result.innerText.split('');
        if (arr[0] == '∞' || arr[0] == '-∞') {
            arr.splice(0, 1);
        }
        if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', 'x', '*', '/', '(', ')', 's', 'c', 't', 'l', '.', '^', '!'].includes(e.key)) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == '|') {
                    arr.splice(i + 1, 0, e.key.replaceAll('x', '×').replaceAll('*', '×').replaceAll('/', '÷').replaceAll('s', 'sin').replaceAll('c', 'cos').replaceAll('t', 'tan').replaceAll('l', 'log'));
                    arr[i] = e.key.replaceAll('x', '×').replaceAll('*', '×').replaceAll('/', '÷').replaceAll('s', 'sin').replaceAll('c', 'cos').replaceAll('t', 'tan').replaceAll('l', 'log');
                    arr[i + 1] = temp;
                    break;
                }
            }
        }
        switch (e.key) {
        case '(': {
            arr.push(')');
            break;
        }
        case 's':
        case 'c':
        case 't':
        case 'l': {
            let open = 0;
            let close = 0;
            for (let i = 0; i < arr.length; i++) {
                if (['sin', 'cos', 'tan', 'log'].includes(arr[i])) {
                    if (arr[i + 1] == '|') {
                        arr[i + 1] = '(';
                        arr[i + 2] = '|';
                        arr[i + 3] = ')';
                    }
                }
                switch (arr[i]) {
                case '(': {
                    open++;
                    break;
                }
                case ')': {
                    close++;
                    break;
                }
                }
            }
            if (open > close) {
                for (let i = 0; i < open - close; i++) {
                    arr.push(')');
                }
            }
            break;
        }
        case 'Backspace': {
            for (let i = 0; i < arr.length; i++) {
                if (arr[0] != '|' && arr[i] == '|') {
                    if (['s', 'c', 't', 'l'].includes(arr[i - 4]) && ['i', 'o', 'a'].includes(arr[i - 3]) && ['n', 's', 'g'].includes(arr[i - 2])) {
                        arr.splice(i - 4, 4);
                    }
                    else {
                        arr.splice(i - 1, 1);
                    }
                    break;
                }
            }
            break;
        }
        case 'Delete': {
            arr.length = 1;
            arr[0] = '|';
            break;
        }
        case 'ArrowLeft': {
            for (let i = 0; i < arr.length; i++) {
                if (arr[0] != '|' && arr[i] == '|') {
                    if (['n', 's', 'g'].includes(arr[i - 2])) {
                        arr[i] = arr[i - 1];
                        arr[i - 1] = arr[i - 2];
                        arr[i - 2] = arr[i - 3];
                        arr[i - 3] = arr[i - 4];
                        arr[i - 4] = temp;
                    }
                    else {
                        arr[i] = arr[i - 1];
                        arr[i - 1] = temp;
                    }
                    break;
                }
            }
            break;
        }
        case 'ArrowRight': {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == '|') {
                    if (['s', 'c', 't', 'l'].includes(arr[i + 1])) {
                        arr[i] = arr[i + 1];
                        arr[i + 1] = arr[i + 2];
                        arr[i + 2] = arr[i + 3];
                        arr[i + 3] = arr[i + 4];
                        arr[i + 4] = temp;
                    }
                    else {
                        arr[i] = arr[i + 1];
                        arr[i + 1] = temp;
                    }
                    break;
                }
            }
            break;
        }
        case '=':
        case 'Enter': {
            let finalRes = '';
            for (let i = 0; i < arr.length; i++) {
                if (arr[0] != '(' && (arr[i] == '(' && (arr[i - 1] != '×' && ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(arr[i - 1])))) {
                    arr.splice(i, 0, '×');
                    break;
                }
                if (!isNaN(parseFloat(arr[i - 1])) && ['s', 'c', 't', 'l'].includes(arr[i])) {
                    arr.splice(i, 0, '×');
                    break;
                }
                while (arr[i] == '0' && arr[i - 1] == '0' && !['+', '-', '×', '÷'].includes(arr[i - 1])) {
                    arr.splice(i, 1);
                }
            }
            try {
                finalRes = eval(arr.join('').replaceAll('×', '*').replaceAll('÷', '/').replaceAll('^', '**').replaceAll('sin', 'Math.sin').replaceAll('cos', 'Math.cos').replaceAll('tan', 'Math.tan').replaceAll('log', 'Math.log').replace(/(\d+)!/g, (number) => {
                    return `factorial(${number.replace('!', '')})`;
                }).replace('|', ''));
                if (finalRes == 'Infinity') {
                    finalRes = '∞';
                }
                else if (finalRes == '-Infinity') {
                    finalRes = '-∞';
                }
                else if (isNaN(parseFloat(finalRes))) {
                    finalRes = result.innerText.replace('|', '');
                }
            }
            catch {
                finalRes = result.innerText.replace('|', '');
            }
            result.innerText = finalRes + '|';
            break;
        }
        case 'Escape': {
            const table = document.querySelectorAll('table');
            table[0].style.display = 'none';
            table[1].style.display = 'block';
            break;
        }
        case 'o': {
            const table = document.querySelectorAll('table');
            table[1].style.display = 'none';
            table[0].style.display = 'block';
            break;
        }
        }
        if (!['=', 'Enter'].includes(e.key)) {
            result.innerText = arr.join('');
        }
    }
});