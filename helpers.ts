const removeWhitespace = (str: string): string => str.replace(/ /g,'');

const regexSpecial = ["[", "\\", "^", "$", ".", "|", "?", "*", "+", "(", ")"];

export {removeWhitespace, regexSpecial};
