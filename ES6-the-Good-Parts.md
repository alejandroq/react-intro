# ES6 the Good Parts

`const` and `let`:

* `const` is for immutable variables (transpiler forces this - JavaScript actually does not support immutability fully in the Functional Programming way)
* `let` in-lieu of `var`. A key distinction is in lexical scoping (improves shadowing errors, understanding application state and code readability):

```js
function foo(x) {
  if (x) {
    var y = x;
  }
  // will equal x
  console.log(y);
}

function bar(x) {
  if (x) {
    let y = x;
  }
  // will equal undefined
  console.log(y);
}

/** lets look at this in node - take note of the fat arrow function closure; detailed below */
(x => {
  if (x) {
    let y = x;
  }
  console.log(y);
})('will this appear')(
  /** $ > ReferenceError: y is not defined at x (repl:1:43) */

  x => {
    if (x) {
      var y = x;
    }
    console.log(y);
  }
)('will this appear');
/** $ > will this appear */
```

Fat Arrow Function:

* [https://stackoverflow.com/questions/34361379/arrow-function-vs-function-declaration-expressions-are-they-equivalent-exch](https://stackoverflow.com/questions/34361379/arrow-function-vs-function-declaration-expressions-are-they-equivalent-exch)
* [https://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/](https://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/)
* tl:dr not for cases of `this` and `new`

```js
// ES5
API.prototype.get = function(resource) {
  var self = this;
  return new Promise(function(resolve, reject) {
    http.get(self.uri + resource, function(data) {
      resolve(data);
    });
  });
};

// ES6
API.prototype.get = function(resource) {
  return new Promise((resolve, reject) => {
    http.get(this.uri + resource, function(data) {
      resolve(data);
    });
  });
};
```

Fat Arrow Function Object Literal Syntax:

```js
const x = y => y;

/** equals if object - if multiline; common in a React Component or an immediate Object return */
const x = y => ({
  v: y,
});

/** equals */
const x = y => {
  return y;
};

/** equals */
function x(y) {
  return y;
}
```

Object Spread:

```js
const x = { name: 'Alejandro', age: 1 };
const y = { age: 200, hobby: 'Angular' };
console.log(...x, ...y);
/** { name: 'Alejandro , age: 200, hobby: 'Angular' } */
```

Array Spread:

```js
const x = [1, 2, 3];
const y = [4, 5, 6];
console.log([...x, ...y]);
/** [1, 2, 3, 4, 5, 6] */
```

Importing Modules:

```js
import React from 'react';

/** vs */

var React = require('react');
```

Classes:

```js
class X implements Y {
  constructor(x) {
    super(x);
  }
  foo() {
    return 'foo';
  }
}

/** syntatical sugar over prototypes */
X.prototype.foo = function() {
  return 'bar';
};
```

Promises for simple singular and linear Async transactions (Observables for event streams - see [RxJS](reactivex.io/rxjs)):

```js
const x = () =>
  new Promise((res, rej) => {
    /** fetch is actually already a Promise, but for the purposes of showing a native constructor  */
    fetch('https://www.google.com').then(
      response => (response.status === 200 ? res(response) : rej(response))
    );
  });
```

Destructuring:

```js
/** es5 */
var props = {
  name: 'Alejandro',
  age: 100,
};
var name = props.name;
var age = props.age;

/** es6 */
const props = {
  name: 'Alejandro',
  age: 100,
};
const { name, age } = props;

/** or in a function (closure or not) */
(({ name, age }) =>
  console.log(`My name is ${name} and I am ${age} years old`))(props);
```

Template Strings:

```js
/** es5 - multiline with variable */
var name = 'Alejandro';
console.log('My name is ' + name + '.\n' + 'I am a few years old');

/** es6 - multiline with variable */
const name = 'Alejandro';
console.log(
  `My name is ${name}.
  I am a few years old`
);
```
