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