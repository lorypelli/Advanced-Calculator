import './style.css';
import { close, open } from './utils/change';
import { allKeys, temp } from './utils/constants';
import { addBracket, addRoot, correctSymbols, fixBrackets } from './utils/fix';
import { moveLeft, moveRight } from './utils/move';
import { del, removeInfNaN, reset } from './utils/remove';
import { getResult, setResult } from './utils/result';

const buttons = document.querySelectorAll('button');

buttons.forEach((b) =>
    b.addEventListener('click', () => {
        const result = document.querySelector('#result');
        if (result && result.textContent) {
            const arr = result.textContent.toLowerCase().split('');
            removeInfNaN(arr);
            if (
                b.classList.contains('primary') ||
                b.classList.contains('secondary')
            ) {
                const c = arr.indexOf(temp);
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
                    if (b.textContent && arr[i] == temp) {
                        arr.splice(i, 0, b.textContent);
                        arr[i + 1] = temp;
                        break;
                    }
                }
                switch (b.textContent) {
                    case '(': {
                        addBracket(arr);
                        break;
                    }
                    case 'sin':
                    case 'cos':
                    case 'tan':
                    case 'log': {
                        fixBrackets(arr);
                        break;
                    }
                }
            }
            switch (b.id) {
                case 'del': {
                    del(arr);
                    break;
                }
                case 'clear': {
                    reset(arr);
                    break;
                }
                case 'left': {
                    moveLeft(arr);
                    break;
                }
                case 'right': {
                    moveRight(arr);
                    break;
                }
                case 'res': {
                    getResult(arr, result);
                    break;
                }
                case 'exit': {
                    close();
                    break;
                }
                case 'open': {
                    open();
                    break;
                }
            }
            if (b.id != 'res') {
                setResult(arr, result);
            }
        }
    }),
);

let disable = false;

document.addEventListener('keydown', (e) => {
    if (allKeys.includes(e.key.toLowerCase())) {
        e.preventDefault();
    }
    if (disable && e.key != 'o') {
        return;
    }
    const result = document.querySelector('#result');
    const key = e.key
        .toLowerCase()
        .replaceAll('*', '×')
        .replaceAll('x', '×')
        .replaceAll('/', '÷');
    if (result && result.textContent) {
        const arr = result.textContent.toLowerCase().split('');
        removeInfNaN(arr);
        if (allKeys.includes(key)) {
            const c = arr.indexOf(temp);
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
            correctSymbols(arr, key);
        }
        switch (key) {
            case '(': {
                addBracket(arr);
                break;
            }
            case 's':
            case 'c':
            case 't':
            case 'l': {
                fixBrackets(arr);
                break;
            }
            case 'r': {
                addRoot(arr);
                break;
            }
            case 'backspace': {
                del(arr);
                break;
            }
            case 'delete': {
                reset(arr);
                break;
            }
            case 'arrowleft': {
                moveLeft(arr);
                break;
            }
            case 'arrowright': {
                moveRight(arr);
                break;
            }
            case '=':
            case 'enter': {
                getResult(arr, result);
                break;
            }
            case 'escape': {
                close();
                disable = true;
                break;
            }
            case 'o': {
                open();
                disable = false;
                break;
            }
        }
        if (!['=', 'enter'].includes(key)) {
            setResult(arr, result);
        }
    }
});
