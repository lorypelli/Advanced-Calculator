import { temp } from './constants';
import parse from './parse';

export function getResult(arr: string[], result: Element) {
    let finalRes = '';
    for (let i = 0; i < arr.length; i++) {
        while (
            arr[0] != '(' &&
            arr[i] == '(' &&
            arr[i - 1] != '×' &&
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(
                arr[i - 1],
            )
        ) {
            arr.splice(i, 0, '×');
        }
        while (
            !isNaN(parseFloat(arr[i - 1])) &&
            ['s', 'c', 't', 'l', 'P'].includes(arr[i])
        ) {
            arr.splice(i, 0, '×');
        }
    }
    try {
        finalRes = arr.length > 1 ? eval(parse(arr)) : '';
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
