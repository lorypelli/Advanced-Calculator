import {
    functions,
    getFunctionChars,
    getPIChars,
    numbers,
    symbols,
} from './constants';
import parse from './parse';

export default function safeEval(arr: string[]) {
    const allKeys = new Set([
        ...numbers,
        ...symbols,
        ...functions,
        ...Array(3)
            .fill('')
            .flatMap((_, i) => getFunctionChars(i)),
        '(',
        ')',
        ...Array(2)
            .fill('')
            .map((_, i) => getPIChars(i)),
        '|',
    ]);
    if (arr.every((e) => allKeys.has(e))) {
        return new Promise((resolve) => resolve(eval(parse(arr))))
            .then((res) => res?.toString() || '')
            .catch(() => '');
    }
    return '';
}
