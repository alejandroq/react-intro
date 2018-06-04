describe('lexical scoping of var and let', () => {
    it('var', () => {
        var x = 'test';
        if (x) {
            var y = x;
        }
        expect(y).toBe(x);
    });
    it('let (will fail)', () => {
        var x = 'test';
        if (x) {
            let y = x;
        }
        expect(y).toBe(x);
    });
});

describe('immutability of const', () => {
    it('var', () => {
        var x = 1;
        x = x + 1;
        expect(x).toBe(2);
    });
    it('const (will fail)', () => {
        const x = 1;
        x = x + 1;
        expect(x).toBe(2);
    });
});

describe('destructuring operators', () => {
    it('array destructuring', () => {
        const x = [1,2,3];
        expect(
            (
                ([one, two, three]) => one + two + three
            )(x)
        ).toBe(6);
    });
    it('object destructuring', () => {
        const x = {one: 1, two: 2, three: 3};
        const {
            one,
            two,
            three
        } = x;
        expect(one + two + three).toBe(6);
    });
});

describe('spread operators', () => {
    it('array spread', () => {
        const x = [1,2,3];
        const y = [4,5,6];
        expect([...x, ...y]).toEqual([1,2,3,4,5,6]);
    });
    it('object spread - merge two objects', () => {
        const user = { id: 1, name: 'Alejandro', age: 25 };
        const post = { id: 2, content: 'Hello World', userId: 1 };
        expect({ ...user, ...post }.name).toBe('Alejandro');
    });
    it('object spread 2 - which instance of `id` is adopted?', () => {
        const user = { id: 1, name: 'Alejandro', age: 25 };
        const post = { id: 2, content: 'Hello World', userId: 1 };
        expect({ ...user, ...post }.id).toBe(2);
    });
})

describe('template strings', () => {
    it('create a unique multiline post string from two objects without +\'s', () => {
        const user = { id: 1, name: 'Alejandro', age: 25 };
        const post = { id: 2, content: 'Hello World', userId: 1 };
        const template = `${user.name}: ${user.age};
        
        There will be appended \\n characters as tested below.
        ${post.content}
        `;
        expect(template.indexOf('\n') > -1).toBe(true);
    })
})