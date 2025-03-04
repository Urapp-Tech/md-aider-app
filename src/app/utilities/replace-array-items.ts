export function replaceItems<T>(oldArray: Array<T>, newArray: Array<T>): void {
  oldArray.splice(0, oldArray.length, ...newArray);
}
