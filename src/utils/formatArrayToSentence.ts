export function formatArrayToSentence(array: string[]): string {
  let formattedLabel = "";

  array.forEach((item, index) => {
    formattedLabel = formattedLabel + item + (index + 1 === array.length ? "" : index + 2 === array.length ? " e " : ", ");
  });

  return formattedLabel;
}
