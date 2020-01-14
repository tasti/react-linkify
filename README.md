# [react-linkify](http://tasti.github.io/react-linkify/)
React component to parse links (urls, emails, etc.) in text into clickable links

### Basic

Any link that appears inside the `Linkify` component will become clickable.

```
<Linkify>See examples at tasti.github.io/react-linkify/.</Linkify>
```

Renders to:

See examples at `tasti.github.io/react-linkify/`.

### Advanced

If you're feeling lazy, you can wrap `Linkify` around anywhere that you want links to become clickable. Even with nested elements, it traverses the tree to find links.

```
<Linkify>
  <div>react-linkify <span>(tasti.github.io/react-linkify/)</span></div>
    <div>React component to parse links (urls, emails, etc.) in text into clickable links</div>
  See examples at tasti.github.io/react-linkify/.
    <footer>Contact: tasti@zakarie.com</footer>
</Linkify>
```

Renders to:

react-linkify (`tasti.github.io/react-linkify/`)
React component to parse links (urls, emails, etc.) in text into clickable links
See examples at `tasti.github.io/react-linkify/`.
Contact: `tasti@zakarie.com`


## Installation

```
yarn add react-linkify
```

or

```
npm install react-linkify --save
```

## Usage

```js
import Linkify from 'react-linkify';

React.render(
  <Linkify>Examples are available at tasti.github.io/react-linkify/.</Linkify>,
  document.body
);
```

## Props
### children
The children will be traversed and unless a node is an `a` or a `button` the content of a node will be matched using the matchDecorator.

_type:_ `React.node`

### componentDecorator
The componentDecorator is called for every matched link, the return-value is rendered in place of the link.

The `defaultComponentDecorator` returns an anchor-tag and does not modify the given href, the given key or the given text.

_type:_ `(href: string, text: string, key: number)  => React.node`

_default:_ `defaultComponentDecorator`

### hrefDecorator
The hrefDecorator is called to determine how to transform the original link the href to be used.

The `defaultHrefDecorator` returns the original link without modification.

_type:_ `(href: string)  => string`

_default:_ `defaultHrefDecorator`

### matchDecorator
The matchDecorator is used to find links in the `children`-prop. 

The `text`-argument is the text found inside the `children`-prop.

The `defaultMatchDecorator` uses LinkyIt to find links.

_type:_ `(text: string)  => Array<{ index: number, url: string, text: string }>`

_default:_ `defaultMatchDecorator`

### textDecorator
The textDecorator is called to determine how to display the link.

The `defaultTextDecorator` returns the string without modification.

_type:_ `(text: string)  => string`

_default:_ `defaultTextDecorator`

## Customization

You can access to the global `Linkify` instance used to linkify contents by importing it (`import { linkify } from 'react-linkify'`).
That way you can customize as needed (e.g. disabling existing schemas or adding new ones).

Note that any customization made to that instance will affect every `Linkify` component you use.

## Examples

All kind of links detectable by
[linkify-it](https://github.com/markdown-it/linkify-it) are supported. For
examples, visit [their website](http://markdown-it.github.io/linkify-it/).
