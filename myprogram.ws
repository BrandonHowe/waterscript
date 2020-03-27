let fib be (a, {
    a - 1;
    print(#);
    if (a > 0, {
        fib(#);
    });
});

fib(6);
