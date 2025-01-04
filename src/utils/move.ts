import { temp } from './constants';

export function moveLeft(arr: string[]) {
    if (arr[0] != temp) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == temp) {
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
    }
}

export function moveRight(arr: string[]) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == temp) {
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
}
