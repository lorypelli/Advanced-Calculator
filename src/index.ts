import './style.css';
const buttons = document.querySelectorAll('button');
const temp = '|';
function parse(arr: string[]): string {
    return arr
        .join('')
        .replaceAll('×', '*')
        .replaceAll('÷', '/')
        .replaceAll('^', '**')
        .replaceAll('pi', 'Math.PI')
        .replaceAll('sin', 'Math.sin')
        .replaceAll('cos', 'Math.cos')
        .replaceAll('tan', 'Math.tan')
        .replaceAll('log', 'Math.log')
        .replace(/(\d+)!/g, (number) => {
            return `factorial(${number.replace('!', '')})`;
        })
        .replace('|', '');
}
buttons.forEach((b) =>
    b.addEventListener('click', () => {
        const result = document.querySelector('#result');
        if (result && result.textContent) {
            const arr = result.textContent.split('');
            if (arr[0] == '∞' || arr[0] == '-∞') {
                arr.splice(0, 1);
            }
            if (
                b.classList.contains('primary') ||
                b.classList.contains('secondary')
            ) {
                const c = arr.indexOf('|');
                if (
                    b.textContent &&
                    ['+', '-', '×', '÷', '.', '^', '!'].includes(
                        b.textContent,
                    ) &&
                    ['+', '-', '×', '÷', '.', '^', '!'].includes(arr[c - 1])
                ) {
                    arr.splice(c - 1, 1);
                } else if (
                    b.textContent &&
                    ['+', '-', '×', '÷', '.', '^', '!'].includes(
                        b.textContent,
                    ) &&
                    ['+', '-', '×', '÷', '.', '^', '!'].includes(arr[c + 1])
                ) {
                    arr.splice(c + 1, 1);
                }
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] == '|' && b.textContent) {
                        arr.splice(i, 0, b.textContent);
                        arr[i + 1] = temp;
                        break;
                    }
                }
                switch (b.textContent) {
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
                            if (
                                (['s', 'c', 't', 'l'].includes(arr[i - 4]) &&
                                    ['i', 'o', 'a'].includes(arr[i - 3]) &&
                                    ['n', 's', 'g'].includes(arr[i - 2])) ||
                                (arr[i - 2] == 'p' && arr[i - 1] == 'i')
                            ) {
                                if (arr[i - 1] == '(' && arr[i + 1] == ')') {
                                    arr.splice(i - 4, 4);
                                    arr.splice(i - 3, 1);
                                } else if (
                                    arr[i - 2] == 'p' &&
                                    arr[i - 1] == 'i'
                                ) {
                                    arr.splice(i - 2, 2);
                                } else {
                                    arr.splice(i - 4, 4);
                                }
                            } else {
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
                            } else if (arr[i - 1] == 'i') {
                                arr[i] = arr[i - 1];
                                arr[i - 1] = arr[i - 2];
                                arr[i - 2] = temp;
                            } else {
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
                            } else if (arr[i + 1] == 'p') {
                                arr[i] = arr[i + 1];
                                arr[i + 1] = arr[i + 2];
                                arr[i + 2] = temp;
                            } else {
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
                        while (
                            arr[0] != '(' &&
                            arr[i] == '(' &&
                            arr[i - 1] != '×' &&
                            [
                                '1',
                                '2',
                                '3',
                                '4',
                                '5',
                                '6',
                                '7',
                                '8',
                                '9',
                                '0',
                            ].includes(arr[i - 1])
                        ) {
                            arr.splice(i, 0, '×');
                        }
                        while (
                            !isNaN(parseFloat(arr[i - 1])) &&
                            ['s', 'c', 't', 'l', 'p'].includes(arr[i])
                        ) {
                            arr.splice(i, 0, '×');
                        }
                    }
                    try {
                        finalRes = eval(parse(arr));
                        if (finalRes == 'Infinity') {
                            finalRes = '∞';
                        } else if (finalRes == '-Infinity') {
                            finalRes = '-∞';
                        } else if (isNaN(parseFloat(finalRes))) {
                            finalRes = result.textContent.replace('|', '');
                        }
                    } catch {
                        finalRes = result.textContent.replace('|', '');
                    }
                    result.textContent = finalRes + '|';
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
                result.textContent = arr.join('');
            }
        }
    }),
);
let disable = false;
document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        e.preventDefault();
    }
    if (disable && e.key != 'o') {
        return;
    }
    const result = document.querySelector('#result') as HTMLElement;
    const key = e.key
        .replaceAll('*', '×')
        .replaceAll('x', '×')
        .replaceAll('/', '÷');
    if (result && result.textContent) {
        const arr = result.textContent.split('');
        if (arr[0] == '∞' || arr[0] == '-∞') {
            arr.splice(0, 1);
        }
        if (
            [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '0',
                '+',
                '-',
                '×',
                '÷',
                '(',
                ')',
                's',
                'c',
                't',
                'l',
                'p',
                '.',
                '^',
                '!',
            ].includes(key)
        ) {
            const c = arr.indexOf('|');
            if (
                ['+', '-', '×', '÷', '.', '^', '!'].includes(key) &&
                ['+', '-', '×', '÷', '.', '^', '!'].includes(arr[c - 1])
            ) {
                arr.splice(c - 1, 1);
            } else if (
                ['+', '-', '×', '÷', '.', '^', '!'].includes(key) &&
                ['+', '-', '×', '÷', '.', '^', '!'].includes(arr[c + 1])
            ) {
                arr.splice(c + 1, 1);
            }
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == '|') {
                    arr.splice(
                        i,
                        0,
                        key
                            .replaceAll('s', 'sin')
                            .replaceAll('c', 'cos')
                            .replaceAll('t', 'tan')
                            .replaceAll('l', 'log')
                            .replaceAll('p', 'pi'),
                    );
                    arr[i + 1] = temp;
                    break;
                }
            }
        }
        switch (key) {
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
            case 'r': {
                const c = arr.indexOf('|');
                arr.splice(c, 1);
                arr.push('^', '(', '1', '/', '|', ')');
                break;
            }
            case 'Backspace': {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[0] != '|' && arr[i] == '|') {
                        if (
                            (['s', 'c', 't', 'l'].includes(arr[i - 4]) &&
                                ['i', 'o', 'a'].includes(arr[i - 3]) &&
                                ['n', 's', 'g'].includes(arr[i - 2])) ||
                            (arr[i - 2] == 'p' && arr[i - 1] == 'i')
                        ) {
                            if (arr[i - 1] == '(' && arr[i + 1] == ')') {
                                arr.splice(i - 4, 4);
                                arr.splice(i - 3, 1);
                            } else if (arr[i - 2] == 'p' && arr[i - 1] == 'i') {
                                arr.splice(i - 2, 2);
                            } else {
                                arr.splice(i - 4, 4);
                            }
                        } else {
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
                        } else if (arr[i - 1] == 'i') {
                            arr[i] = arr[i - 1];
                            arr[i - 1] = arr[i - 2];
                            arr[i - 2] = temp;
                        } else {
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
                        } else if (arr[i + 1] == 'p') {
                            arr[i] = arr[i + 1];
                            arr[i + 1] = arr[i + 2];
                            arr[i + 2] = temp;
                        } else {
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
                    while (
                        arr[0] != '(' &&
                        arr[i] == '(' &&
                        arr[i - 1] != '×' &&
                        [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '0',
                        ].includes(arr[i - 1])
                    ) {
                        arr.splice(i, 0, '×');
                    }
                    while (
                        !isNaN(parseFloat(arr[i - 1])) &&
                        ['s', 'c', 't', 'l', 'p'].includes(arr[i])
                    ) {
                        arr.splice(i, 0, '×');
                    }
                }
                try {
                    finalRes = eval(
                        arr
                            .join('')
                            .replaceAll('×', '*')
                            .replaceAll('÷', '/')
                            .replaceAll('^', '**')
                            .replaceAll('pi', 'Math.PI')
                            .replaceAll('sin', 'Math.sin')
                            .replaceAll('cos', 'Math.cos')
                            .replaceAll('tan', 'Math.tan')
                            .replaceAll('log', 'Math.log')
                            .replace(/(\d+)!/g, (number) => {
                                return `factorial(${number.replace('!', '')})`;
                            })
                            .replace('|', ''),
                    );
                    if (finalRes == 'Infinity') {
                        finalRes = '∞';
                    } else if (finalRes == '-Infinity') {
                        finalRes = '-∞';
                    } else if (isNaN(parseFloat(finalRes))) {
                        finalRes = result.textContent.replace('|', '');
                    }
                } catch {
                    finalRes = result.textContent.replace('|', '');
                }
                result.textContent = finalRes + '|';
                break;
            }
            case 'Escape': {
                const table = document.querySelectorAll('table');
                table[0].style.display = 'none';
                table[1].style.display = 'block';
                disable = true;
                break;
            }
            case 'o': {
                const table = document.querySelectorAll('table');
                table[1].style.display = 'none';
                table[0].style.display = 'block';
                disable = false;
                break;
            }
        }
        if (!['=', 'Enter'].includes(key)) {
            result.textContent = arr.join('');
        }
    }
});
