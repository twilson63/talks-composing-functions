# Composing Functions

## What is composition and why is worth learning?

If you have been in the JavaScript community for the last 3 or 4 years you may have heard a little about Functional JavaScript. And may have heard a discussion or two about the difference between Functional and Object Oriented methodologies. There are a couple of terms/jargon you start to hear in the conversation.

* Immutability
* Composition
* Pure Functions
* Higher Order Functions
* Currying
* Reducing
* Transducers
* Functors
* Moniods
* Monads
* And there is more.

Today, I want to talk about composition, as I think it is a very practical pattern and you may be usinging it today without knowing exactly what it is.

### What is composition? (Toms definition)

It is the process in which you combine one or more things to contain a single point of entry and a single point of exit. 

> Functional Composition from wikipedia - an operation that takes two functions f and g and produces a function h such that `h(x) = g(f(x))`.

In this talk we are going to learn how your can start applying functional composition to your applications today, no need for any libraries or dependencies, you can take advantage of composition your imperative code today, with just a little of practice.

In order to understand how we might compose functions, we need to understand a couple of concepts. 

> Quick get out your calculator, these are some mathy concepts and they may hurt your head. :P

### Pure Functions

A pure function is a function that given the same input will always return the same output. Lets check out some examples:

```
function isTrue(a) {
  if (typeof a !== 'boolean') { 
    throw new Error('argument should be of type boolean') 
  }
  return a === true
}
```

Is this a pure function?

```
function add10(a) {
  if (typeof a !== 'number') {
    throw new Error('argument should be type number')
  }
  return a + 10
}
```

Is this a pure function?

```
function (days) {
  if (typeof days !== 'number') {
    throw new Error('argument should be type number')
  }
  const oneDay = (24 * 60 * 60 * 1000)
  return new Date(new Date() + (days * oneDay)).toISOString()
}
```

Is this a pure function?

### Unary function

A function that takes exactly one argument and returns a value.

```
function add2(n) {
  return n + 2
}
```

Is this an unary function?

```
function prop(key, obj) 
  return obj[key]
}
```

Is this an unary function?


```
function nth(n) {
  return function (arr) {
    return arr[n]
  }
}
```

Is this an unary function?

### So how do you compose functions?

The key to composing functions, is that they must be `pure` and they must have the same number of arguments. Most of the time you want to compose unary functions, because they are easier to work with. 

> Think legos

If I combine two or more functions to create a super function then my code becomes more declarative, I start to tell the computer or program what I want it to do instead of how to do it.

This is very important and once you understand this, it will be a game changer.

Here is a trival example:

```
function uppercase(s) {
  return s.toUpperCase()
}

function reverseString(s) {
  return Array.from(s).reverse().join('')
}

function combine(s) {
  return uppercase(reverseString(s))
}

combine('Hello')
```

So this combine function works great, but it is not very reusable. Lets see if we can do better.

```

function compose2(f, g) {
  return function (x) {
    return g(f(x))
  }
}

const reverseAndUppercase = compose2(uppercase, reverseString)

```

By creating a compose2 function, which is reusable, we create a declarative function. Like putting together two legos. We compose uppercase and reverseString, now we have a reusable compose2 function that will take any two unary functions and combine them into one function in a declarative way.

### Higher Order Functions

Higher Order functions gives you a factory to convert any function into a composable function. A higher order function can take a function as an argument or return a function as output, or both. This gives you the power to wrap around functions and turn them into composable functions that can be combined to create super functions.

``` js
function map(fn) {
  return function (list) {
     return list.map(fn)
  }
}
```

``` js
function equals(a) {
  return function (b) {
    return a === b
  }
}
```

### Compose

Now that we have gone over pure functions, unary functions and higher order functions, we need to create a compose function that we can use to combine our building block functions together.

``` js
function compose(...args) {
  return function (x) {
    return args.reduceRight((v, fn) => fn(v), x)
  }
}
```

The compose function takes one or more functions as arguments then returns a function that takes a value, it reduces from right to left calling each function in the list passing the result of the function to the next function. This creates a function factory that can take several functions and create a composed function.

``` js
const pluck = compose(map, prop)

const stooges = [{name: 'Moe'},{name: 'Larry'}, {name: 'Curley'}]
const names = pluck('name')(stooges)

function prop(key) {
  return (obj) {
    return obj[key]
  }
}

function map(fn) {
  return function (arr) {
    return arr.map(fn)
  }
}

```

---

Demo exercise challenge

Get the rxnorm medication name and rxcui for all active medications from this patient bundle

https://r3.smarthealthit.org/Patient/smart-1685497/$everything?_count=500


* map(prop) all medicationRequest, and MedicationStatement resources from bundle
* filter(active)
* grab medication coding concept
* find the rxnorm code 
* combine description and rxcui

 
