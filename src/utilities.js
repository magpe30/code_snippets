export const capitaliseStr = (string) => {
    const firstLetter = string.charAt(0).toUpperCase();
    const remainingStr = string.slice(1);

    return firstLetter + remainingStr;
}