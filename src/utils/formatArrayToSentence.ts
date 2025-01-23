export function formatArrayToSentence(items: string[]): string {
  const allButLast = items.slice(0, -1).join(", ");
  const lastItem = items[items.length - 1];

  if (items.length === 0) {
    return "";
  }

  if (items.length === 1) {
    return items[0];
  }

  return `${allButLast} e ${lastItem}`;
}
