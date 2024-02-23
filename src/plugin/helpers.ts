// format rupiah currency
export const formatRupiah = (number: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(number);
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