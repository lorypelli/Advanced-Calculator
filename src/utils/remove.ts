import { temp } from './constants';

export function removeInfNaN(arr: string[]) {
    if (arr[0] == '∞' || arr[0] == '-∞') {
        arr.splice(0, 1);
    } else if (arr[0] == 'N' && arr[1] == 'a' && arr[2] == 'N') {
        arr.splice(0, 3);
    }
}

export function del(arr: string[]) {
    if (arr[0] != temp) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == temp) {
                if (
                    (['s', 'c', 't', 'l'].includes(arr[i - 4]) &&
                        ['i', 'o', 'a'].includes(arr[i - 3]) &&
                        ['n', 's', 'g'].includes(arr[i - 2])) ||
                    (arr[i - 2] == 'P' && arr[i - 1] == 'I')
                ) {
                    if (arr[i - 1] == '(' && arr[i + 1] == ')') {
                        arr.splice(i - 4, 4);
                        arr.splice(i - 3, 1);
                    } else if (arr[i - 2] == 'P' && arr[i - 1] == 'I') {
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
    }
}

export function reset(arr: string[]) {
    arr.length = 1;
    arr[0] = temp;
}
