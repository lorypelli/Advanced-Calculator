import { getFunctionChars, temp } from './constants';

export function moveLeft(arr: string[]) {
    if (arr[0] != temp) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == temp) {
                if (getFunctionChars(2).includes(arr[i - 2])) {
                    arr[i] = arr[i - 1];
                    arr[i - 1] = arr[i - 2];
                    arr[i - 2] = arr[i - 3];
                    arr[i - 3] = arr[i - 4];
                    arr[i - 4] = temp;
                } else if (arr[i - 1] == 'I') {
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
    }
}

export function moveRight(arr: string[]) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == temp) {
            if (getFunctionChars(0).includes(arr[i + 1])) {
                arr[i] = arr[i + 1];
                arr[i + 1] = arr[i + 2];
                arr[i + 2] = arr[i + 3];
                arr[i + 3] = arr[i + 4];
                arr[i + 4] = temp;
            } else if (arr[i + 1] == 'P') {
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
}
