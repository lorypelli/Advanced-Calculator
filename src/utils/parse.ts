import { temp } from './constants';

export default function parse(arr: string[]): string {
    return arr
        .join('')
        .replaceAll('×', '*')
        .replaceAll('÷', '/')
        .replaceAll('^', '**')
        .replaceAll('PI', 'Math.PI')
        .replaceAll('sin', 'Math.sin')
        .replaceAll('cos', 'Math.cos')
        .replaceAll('tan', 'Math.tan')
        .replaceAll('log', 'Math.log')
        .replace(/(\d+)!/g, (number) => {
            return `factorial(${number.replace('!', '')})`;
        })
        .replace(temp, '');
}
