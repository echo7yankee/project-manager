export function bar(value: string): string {
  if (typeof value !== 'string') {
    throw new Error('The passed value is not a string!');
  }

  return value;
}
