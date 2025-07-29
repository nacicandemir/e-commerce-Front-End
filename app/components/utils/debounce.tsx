export function debounce<Func extends (...args: any[]) => void>(
  func: Func,
  delay: number
): (...args: Parameters<Func>) => void {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<Func>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
