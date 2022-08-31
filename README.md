# string-extrapolate

Extrapolate from a string using a given template

## Installation

Using **npm**:

```
$ npm i --save string-extrapolate
```

Using **yarn**:

```
$ yarn add string-extrapolate
```

## Usage

### Import

```
import extrapolate from 'string-extrapolate'
```

### Default behavior

If any parameter isn't correct (i.e no placeholders, input that doesn't match), the function will return an empty object so the responsibility of handling is transferred to the user, and no need for error handling when using the function

```
extrapolate(undefined, undefined)
// => {}

extrapolate('asd', 'asd')
// => {}

extrapolate('a{asd}', 'dsa')
// => {}
```


### Basic usage

```
extrapolate('This is a {something}', 'This is a draft')
// => { something: 'draft' }

extrapolate('{one} with {two} and {three}', 'first with second and third')
// => { one: 'first', two: 'second', three: 'third' }

extrapolate('a{{asd}}', 'azxc')
// => { '{asd}': 'zxc' }

extrapolate('http://something.com/{id}', 'http://something.com/123123')
// => { id: 123123 }
```

### Config usage

```
extrapolate('Test [test]', 'Test one', { opener: '[', closer: ']' })
// => { 'test': 'one' }

extrapolate('Test %(test)s', 'Test second', { opener: '%(', closer: ')s' })
// => { 'test': 'second' }
```
