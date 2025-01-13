import { getFunctionChars, numbers, temp } from './constants';
import parse from './parse';

export function getResult(arr: string[], result: Element) {
    let finalRes = '';
    for (let i = 0; i < arr.length; i++) {
        if (
            (arr[i] == '(' &&
                arr[i - 1] != '×' &&
                [...numbers, ')'].includes(arr[i - 1])) ||
            ((arr[i - 1] == ')' ||
                arr[i - 1] == 'I' ||
                !isNaN(parseFloat(arr[i - 1]))) &&
                [...getFunctionChars(0), 'P'].includes(arr[i]))
        ) {
            arr.splice(i, 0, '×');
        }
    }
    try {
        finalRes = arr[0] != temp || arr.length > 1 ? eval(parse(arr)) : '';
        if (finalRes != '') {
            if (finalRes == 'Infinity') {
                finalRes = '∞';
            } else if (finalRes == '-Infinity') {
                finalRes = '-∞';
            } else if (isNaN(parseFloat(finalRes))) {
                finalRes = 'NaN';
            }
        }
    } catch {
        finalRes = result.textContent?.replace(temp, '') || '';
    }
    result.textContent = finalRes + temp;
}

export function setResult(arr: string[], result: Element) {
    result.textContent = arr.join('');
}
