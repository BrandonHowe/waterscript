interface Token {
    value: string,
    type: string,
    args?: Token[]
}

const letToken: Token = {
    value: "let",
    type: "varInit"
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

const commaToken: Token = {
    value: ",",
    type: "comma"
};

const equalsToken: Token = {
    value: "be",
    type: "assign"
};

const semicolonToken: Token = {
    value: ";",
    type: "semi"
};

const tokenObj: Record<string, Token> = {
    plusToken: plusToken,
    minusToken: minusToken,
    openParenthesesToken: openParenthesesToken,
    closeParenthesesToken: closeParenthesesToken,
    commaToken: commaToken,
    equalsToken: equalsToken,
    semicolonToken: semicolonToken,
    letToken: letToken
};

export {Token, tokenObj};
