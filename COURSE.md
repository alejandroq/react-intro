# React Course

### By Alejandro Quesada, Software Engineer

The goal of this course is to provision you a quick understanding of React and the beginning of a framework for thinking about declartive code. By the end you should have the aforementioned basis and know where to find resources to probe deeper into developing more reliable front-end software that is less prone to entropic side effects.

- [React Course](#react-course)
    - [By Alejandro Quesada, Software Engineer](#by-alejandro-quesada--software-engineer)
  - [What this course does not include:](#what-this-course-does-not-include)
  - [What this does include:](#what-this-does-include)
  - [Keep in Mind](#keep-in-mind)
  - [Must Have](#must-have)
  - [Knowledge Requirements](#knowledge-requirements)
  - [Key Dogma](#key-dogma)
  - [Getting Started](#getting-started)
  - [Components](#components)
  - [React's Virtual DOM and its diffing algorithm](#reacts-virtual-dom-and-its-diffing-algorithm)
  - [Handling Events](#handling-events)
  - [Styling](#styling)
  - [Conditional Elements](#conditional-elements)
  - [Synthetic Events](#synthetic-events)
  - [Directory Structure](#directory-structure)
  - [Thinking in React](#thinking-in-react)
  - [Versus Web Components](#versus-web-components)
  - [Context API](#context-api)
  - [Resources](#resources)

## What this course does not include:

* Combining React with platforms such as Drupal. This is likely well documented elsewhere
* Non-CRA React app instantiation. Custom Webpack solutions can be rolled up for edge cases
* In-order to keep to basics I will not go into the following:
  * Redux (most popular Flux implementation for React)
  * Redux Middlewares (Netflix and RxJS)
  * RxJS
  * MobX
  * HTTP libraries because I am not even quite sure which I preference.
  * Jest
  * PrettyJS
  * StorybookJS
  * Form Handling is traditional HTML handling, but I love Angular's ReactiveForms so I am glad someone brought them into React: [https://hackernoon.com/introducing-reactive-forms-in-react-e6df0b84a1ea](https://hackernoon.com/introducing-reactive-forms-in-react-e6df0b84a1ea)
  * Functional Programming
  * ImmutableJS
  * React Helmet
  * Async Loading Components
  * SSR
  * Synthetic Events
  * Rehydration (see resource for react-primer in Resources section)
  * etc

## What this does include:

* Fundamentals
* And a few opinions

## Keep in Mind

React has a massive ecosystem so 10 developers if asked, will return 11 best React setups. This is indicative of the lack of opinion the **library** holds.

## Must Have

* NodeJS
* NPM || Yarn
* create-react-app CLI tool (npm i -g create-react-app)

## Knowledge Requirements

* Basic ES6 understanding
  * If you know JS, you can pick up React
  * JSX is only syntatical sugar over the XMLs in a Component
* Basic Browser understanding
* Understanding Webpack in concept
* Basic Terminal CLI use

## Key Dogma

* Declarative over Imperative
  * Emphasis on iteration and declaration of intent vs specific discourse in code. In-code:

```js
/** basic - increment all ints in an array */
/** imperative */
let arr = [1, 2, 3];
for (let i = 0; i < arr.length; i++) {
  arr[i] = arr[i] + 1;
}
console.log(arr);

/** declarative */
console.log([1, 2, 3].map(x => x + 1));
```

* JS operations on the Virtual DOM are faster than crawling the actual DOM
* Component-Based
  * Components encapsulate their functionality and maintain their own state. More on this below:
* Learn Once, Write Anywhere
  * React lives on many platforms such as React Native for Mobile and React VR for VR.

## Getting Started

```sh
> create-react-app <your-app-name>
```

## Components

What is a component? You already use them. HTML tags are each 'atomic' components if you will. How would you re-implement a paragraph tag in React?

```html
<p style="color:red">Some Test</p>
```

```js
/** imagine T below as a generic - in-browser a <p> tag is a primitive. we are using deconstruction to get the props content into variables by key/value */
const p = ({ style, children }) => <T {...style}>{children}</T>;
```

Style above is a 'prop' and anything within the tags are children. Lets create a BoldText component:

```js
const BoldText = ({ children }) => (
  <p>
    <strong>{children}</strong>
  </p>
);
```

In React you have two styles of Components: Functional and Class Based. There is a larger distinction: Functional lacks state and lifecycle hooks; the latter has them. A Functional Component is a Dumb Component or sometimes called a Presentation Component. The stateful component are often called Containers and are dedicated to encapsulating/handing down logical assertions to dumb Components via props.

```js
/** lifecycle hooks: https://reactjs.org/docs/react-component.html */
const Todo = ({ todo, index, handler }) => (
  <div>
    <p>
      <span>{index}</span>
      {todo}
    </p>
    <button onClick={handler} />
  </div>
);

// I copied and pasted from reactjs.org
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">What needs to be done?</label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>Add #{this.state.items.length + 1}</button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now(),
    };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: '',
    }));
  }
}
```

So rule of thumb: if stateful use a class else use a function. Functions get all of their guts via props and **ALWAYS** output the same thing (pure I/O).

React JSX templates are in pure JS so we can take advantage of data structure such as a Sets, Arrays, Objects and handle Functional Programming esque operations.

Note: a presentation component CAN contain a container component as a child. There is no hard and fast rule against this.

## React's Virtual DOM and its diffing algorithm

The `render()` function of any Component returns a tree of React elements; on state and prop updates a new tree is returned by `render()`.

> There are some generic solutions to this algorithmic problem of generating the minimum number of operations to transform one tree into another. However, the state of the art algorithms have a complexity in the order of O(n3) where n is the number of elements in the tree.

> If we used this in React, displaying 1000 elements would require in the order of one billion comparisons. This is far too expensive. Instead, React implements a heuristic O(n) algorithm based on two assumptions:

> Two elements of different types will produce different trees.
> The developer can hint at which child elements may be stable across different renders with a key prop.
> In practice, these assumptions are valid for almost all practical use cases.

```js
// Reacts reconciliation algorithm expects certain implementation details for deterministic behavior and the O(n) algorithm time. Such an implementation is seen with the `key` prop for dynamic elements below.
const todos = ['xyz', 'abc'];
const Todo = ({ content }) => <li>{content}</li>;
export const TodoList = () => (
  <ul>{todos.map((todo, index) => <Todo content={todo} key={index} />)}</ul>
);
```

[https://reactjs.org/docs/reconciliation.html](https://reactjs.org/docs/reconciliation.html)

## Handling Events

Rule of thumb: if there is a HTML event listener (ala: `onclick`), make it camelCase on a React Component: `onClick`.

* [https://reactjs.org/docs/handling-events.html](https://reactjs.org/docs/handling-events.html)

## Styling

CRA comes with a preference for CSS. The README.md bears information on including SCSS. Other options include CSS in JS such as (Styled-Components)[https://www.styled-components.com/].

Why CSS in JS? Have one less HTTP request that delays first interaction and paint performance metrics by ~700ms on a poor 3G network. Maintain a smaller bundle size as JS is tree shaken where as CSS is not. It also helps keep components tidier and more platform agnostic (if also creating a React Native application).

The React CRA CSS preference:

```css
.Button {
  background: blue;
}
```

```js
import styles from './styles.css';

/** Note: styles is an object or dictionary of your imported css classes. Thereinby the core React team is opinionated on that SCSS primarily benefited users in helping them prevent style leaking, but with this import solution, everything is encapsulated without the extra SCSS dependency. They may also opine that CSS Variables (good in all Browsers, but IE11) could replace typical SCSS theme variables. If you are into functinonal SCSS, there is no replacement for that in the CSS spec. Thereinby the README.md does include a solution for including SCSS into a CRA app without ejecting and mutating the Webpack configuration */
export const AppButton = () => <button style={styles.Button}>Submit</button>;
```

## Conditional Elements

If you want a element to appear given a specific condition:

```js
const todos = [];
const Todo = ({ content }) => <li>{content}</li>;
const TodoList = ({ appear }) => (
  <>
    {todos.length > 0 ? <h1>Todos</h1> : <h1>Empty List of Todos</h1>}
    <ul>{todos.map((todo, index) => <Todo content={todo} key={index} />)}</ul>
    {todos.length > 0 && <p>Count {todos.length}</p>}
  </>
);
```

* [https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822](https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822)

## Synthetic Events

Details: [https://reactjs.org/docs/events.html](https://reactjs.org/docs/events.html)

tl:dr Promote cross-browser serenity. The synthetic event is ~1 level higher than a typical JS HTML Event (onclick, etc) and is pooled for performance purposes. To utilize for async purposes, call `event.persist()`; this will remove event from pool and place in your place of selection.

```js
function onClick(event) {
  console.log(event); // => nullified object.
  console.log(event.type); // => "click"
  const eventType = event.type; // => "click"

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  // Won't work. this.state.clickEvent will only contain null values.
  this.setState({ clickEvent: event });

  // You can still export event properties.
  this.setState({ eventType: event.type });
}
```

## Directory Structure

My reccomendation today is for the format below:

```
src/
  components/
    Button/
      Button.css
      Button.js
    Todo/
      Todo.css
      Todo.js
  containers/
    TodoList/
      TodoList.css
      TodoList.js
```

Presentation/Dumb components live in the components directory whereas their logical cohorts live in the containers directory.

## Thinking in React

[https://reactjs.org/docs/thinking-in-react.html](https://reactjs.org/docs/thinking-in-react.html)

## Versus Web Components

> React and Web Components are built to solve different problems. Web Components provide strong encapsulation for reusable components, while React provides a declarative library that keeps the DOM in sync with your data. The two goals are complementary. As a developer, you are free to use React in your Web Components, or to use Web Components in React, or both.

## Context API

React 16 introduces the Context API. In-lieu of needing to use an external State Management pattern or library, typically Redux, a developer can place state into the global React tree and have it be accessible by any and all components that a part of it.

[https://reactjs.org/docs/context.html](https://reactjs.org/docs/context.html)

## Resources

* [https://reactjs.org/](https://reactjs.org/)

- CRA README.md
- Quick Lighthouse performance tutorial: [https://github.com/alejandroq/enlightenment-series-react-primer](https://github.com/alejandroq/enlightenment-series-react-primer)
