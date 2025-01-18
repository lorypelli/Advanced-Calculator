import { getFunctionChars, getPIChars, numbers, temp } from './constants';
import safeEval from './eval';

export async function getResult(arr: string[], result: Element) {
    let finalRes = '';
    for (let i = 0; i < arr.length; i++) {
        if (
            (arr[i] == '(' &&
                arr[i - 1] != '×' &&
                [...numbers, ')'].includes(arr[i - 1])) ||
            ((arr[i - 1] == ')' ||
                arr[i - 1] == getPIChars(1) ||
                !isNaN(parseFloat(arr[i - 1]))) &&
                [...getFunctionChars(0), getPIChars(0)].includes(arr[i]))
        ) {
            arr.splice(i, 0, '×');
        }
    }
    finalRes = arr[0] != temp || arr.length > 1 ? await safeEval(arr) : '';
    if (finalRes) {
        if (finalRes == 'Infinity') {
            finalRes = '∞';
        } else if (finalRes == '-Infinity') {
            finalRes = '-∞';
        } else if (isNaN(parseFloat(finalRes))) {
            finalRes = 'NaN';
        }
        result.textContent = finalRes + temp;
    }
}

export function setResult(arr: string[], result: Element) {
    result.textContent = arr.join('');
}
