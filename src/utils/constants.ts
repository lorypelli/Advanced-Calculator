export const temp = '|';

export const allKeys = [
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
];

export const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export const symbols = ['+', '-', '×', '÷', '.', '^', '!'];

export const functions = ['sin', 'cos', 'tan', 'log'];

export function getFunctionChars(index: number) {
    return Array.from(new Set(functions.map((f) => f[index])));
}

export function getPIChars(index: number) {
    return 'PI'[index];
}
