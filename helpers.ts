const removeWhitespace = (str: string): string => str.replace(/ /g,'');

const removeLineBreaks = (str: string): string => str.replace(/\r?\n|\r/g, "");

const numIfNum = (str: string): number | string => Number(str).toString() === str ? Number(str) : str;

const regexSpecial = ["[", "\\", "^", "$", ".", "|", "?", "*", "+", "(", ")"];

export {removeWhitespace, removeLineBreaks, numIfNum, regexSpecial};
