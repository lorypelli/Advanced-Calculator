import { temp } from './constants';

export function correctSymbols(arr: string[], key: string) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == temp) {
            arr.splice(
                i,
                0,
                key
                    .replaceAll('s', 'sin')
                    .replaceAll('c', 'cos')
                    .replaceAll('t', 'tan')
                    .replaceAll('l', 'log')
                    .replaceAll('p', 'PI'),
            );
            arr[i + 1] = temp;
            break;
        }
    }
}

export function addBracket(arr: string[]) {
    arr.push(')');
}

export function fixBrackets(arr: string[]) {
    let open = 0;
    let close = 0;
    for (let i = 0; i < arr.length; i++) {
        if (['sin', 'cos', 'tan', 'log'].includes(arr[i])) {
            if (arr[i + 1] == temp) {
                arr[i + 1] = '(';
                arr[i + 2] = temp;
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
}

export function addRoot(arr: string[]) {
    const c = arr.indexOf(temp);
    arr.splice(c, 1);
    arr.push('^', '(', '1', '/', temp, ')');
}
