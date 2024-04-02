import { Mask } from "maska";

// format rupiah currency
export const formatIDR = (amount: number, withSymbol: boolean = true) => {
  return `${withSymbol ? 'Rp ' : ''}${amount.toLocaleString('id-ID').replace(/,/g, '.')}`
};

export function debounce<T extends (...args: any[]) => any>(func: T, delay: number) {
  let timerId: ReturnType<typeof setTimeout>;
  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export const formatNumber = (number: number): string => {
  return number.toLocaleString('en-US', { useGrouping: true, minimumFractionDigits: 0, maximumFractionDigits: 2 }).replace(/,/g, '.');
}

export const percentIdrView = (percent: number, value: number, valueOf: number, isMinus: boolean = false): string => {
	if (percent == 0 && value == 0) {
		return formatIDR(0)
	}
	if (percent > 0) {
		const v: number = valueOf * (percent/100)
		return `${percent}% (${isMinus && '-'}${formatIDR(v)})`
	}
	return formatIDR(value);
}