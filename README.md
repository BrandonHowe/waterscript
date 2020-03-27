# waterscript

This is just a language I'm making to improve and reinforce my language development skills. I have no idea what the syntax will be, and it's probably going to be some convoluted JS-looking thing.

## Running WaterScript files

You can make WaterScript files with the `.ws` extension. To run them, simply run:

```
git clone https://github.com/xWafl/waterscript.git

npm install
npm link
```

To run a file, simply do

```
water myprogram.ws
```

Replace myprogram with the filename of your choosing.

## Docs

### Expressions

Everything in WaterScript is an expression. That means it returns a value.

```
1 + 1; # returns 2
```

They can be multiline, or "blocks". Blocks return the final command in their line.

```
{
    1 + 2; # returns 3, but it's ignored
    3 + 4; # returns 7. the whole block returns 7
};
```

Blocks can be one line, but there's no use.

### Operators

The four operators available for use are addition, subtraction, multiplication, and division.

```$xslt
1 + 1; # returns 2
4 - 3; # returns 1
6 * 9; # returns 54
6 / 4; # returns 1.5
```

Do note that there is no order of operations; all commands are executed left to right.

```$xslt
2 + 2 * 2; # returns 8
```

### The Hash (#) operator and variables

The hash operator is a way to access the last returned value. It is a replacement for all variables, which have been eliminated.

```$xslt
{
    1 + 2; # returns 3
    # * 3; # returns 9
};
print(#); # prints 9
```

### Functions

Functions are declared with `let be` syntax. A function can take in multiple arguments and then returns a block.

```$xslt
let plus be (a, b, {
    a + b;
});

plus(6, 2); # retuns 8;
```

### If statements

If statements are a key part of any language. Make sure to have a semicolon at the end.

```$xslt
if (5 > 3, {
    print("greater");
});
```

### The case for loops

Loops are a key part of any language, but they are absent in WaterScript. Instead, one must use a combination of functions and if statements to achieve a loop.

```
let loop be (a, {
    if (a > 0, {
        a - 1;
        print(#); # replace this with whatever you want to do
        loop(#);
    });
});

loop(6);
```

### Comments

You can comment out the rest of a string via %%.

```
print("This is not a comment."); %% This is a comment.
```

### Semicolons

You need a semicolon at the end of essentially every line, unless you are in the middle of a definition. That means semicolons at the end of blocks, functions, and expressions.
