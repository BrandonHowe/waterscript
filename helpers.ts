const removeWhitespace = (str: string): string => str.replace(/ /g,'');

const removeLineBreaks = (str: string): string => str.replace(/\r?\n|\r/g, "");

const regexSpecial = ["[", "\\", "^", "$", ".", "|", "?", "*", "+", "(", ")"];

export {removeWhitespace, removeLineBreaks, regexSpecial};
