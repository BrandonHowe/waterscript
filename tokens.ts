interface Token {
    value: string,
    type: string,
    args?: Token[]
}

const letToken: Token = {
    value: "let",
    type: "variable"
};

const plusToken: Token = {
    value: "+",
    type: "operator"
};

const minusToken: Token = {
    value: "-",
    type: "operator"
};

const openParenthesesToken: Token = {
    value: "(",
    type: "paren"
};

const closeParenthesesToken: Token = {
    value: ")",
    type: "paren"
};

const tokenArr: Token[] = [plusToken, minusToken, openParenthesesToken, closeParenthesesToken];

export { Token, tokenArr };
