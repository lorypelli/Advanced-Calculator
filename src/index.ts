import './style.css';
import { close, open } from './utils/change';
import { allKeys, symbols, temp } from './utils/constants';
import { addBracket, addRoot, correctSymbols, fixBrackets } from './utils/fix';
import { moveLeft, moveRight } from './utils/move';
import { del, removeInfNaN, reset } from './utils/remove';
import { getResult, setResult } from './utils/result';

const buttons = document.querySelectorAll('button');

buttons.forEach((b) =>
    b.addEventListener('click', () => {
        const result = document.querySelector('#result');
        if (result && result.textContent) {
            const arr = result.textContent.split('');
            removeInfNaN(arr);
            if (
                b.textContent &&
                (b.classList.contains('primary') ||
                    b.classList.contains('secondary'))
            ) {
                const c = arr.indexOf(temp);
                if (
                    symbols.includes(b.textContent) &&
                    symbols.includes(arr[c - 1])
                ) {
                    arr.splice(c - 1, 1);
                } else if (
                    symbols.includes(b.textContent) &&
                    symbols.includes(arr[c + 1])
                ) {
                    arr.splice(c + 1, 1);
                }
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] == temp) {
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
        const arr = result.textContent.split('');
        removeInfNaN(arr);
        if (allKeys.includes(key)) {
            const c = arr.indexOf(temp);
            if (symbols.includes(key) && symbols.includes(arr[c - 1])) {
                arr.splice(c - 1, 1);
            } else if (symbols.includes(key) && symbols.includes(arr[c + 1])) {
                arr.splice(c + 1, 1);
            }
            correctSymbols(arr, key);
        }
        switch (key) {
            case '(': {
                e.preventDefault();
                addBracket(arr);
                break;
            }
            case 's':
            case 'c':
            case 't':
            case 'l': {
                e.preventDefault();
                fixBrackets(arr);
                break;
            }
            case 'r': {
                e.preventDefault();
                addRoot(arr);
                break;
            }
            case 'backspace': {
                e.preventDefault();
                del(arr);
                break;
            }
            case 'delete': {
                e.preventDefault();
                reset(arr);
                break;
            }
            case 'arrowleft': {
                e.preventDefault();
                moveLeft(arr);
                break;
            }
            case 'arrowright': {
                e.preventDefault();
                moveRight(arr);
                break;
            }
            case '=':
            case 'enter': {
                e.preventDefault();
                getResult(arr, result);
                break;
            }
            case 'escape': {
                e.preventDefault();
                close();
                disable = true;
                break;
            }
            case 'o': {
                e.preventDefault();
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
