# [react-linkify](http://tasti.github.io/react-linkify/)
React component to parse links (urls, emails, etc.) in text into clickable links

## Examples

In depth examples are available at [http://tasti.github.io/react-linkify/](http://tasti.github.io/react-linkify/).

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
npm install react-linkify --save
```

## Usage

```js
var Linkify = require('react-linkify');

React.render(
  <Linkify>Examples are available at tasti.github.io/react-linkify/.</Linkify>,
  document.body
);
```

## Props

**component**  
The type of component to wrap links in.  
_type:_ `any`  
_default:_ `'a'`  

**properties**  
The props that will be added to every matched component.  
_type:_ `object`  
_default:_ `{href: Linkify.MATCH}`

NOTE: Use `Linkify.MATCH` as a value to specify the matched link.

**urlRegex**  
The regular expression used to identify url links.  
_type:_ `object`  
_default:_ `/\b(?:(?:https):\/\/|[-A-Z0-9+&@#/%=~_|$?!:,.]+\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/i`

**emailRegex**  
The regular expression used to identify email links.  
_type:_ `object`  
_default:_ `/\b[-A-Z0-9+&%=~_|$!.]+@[-A-Z0-9+&%=~_|$!.]+\.[-A-Z0-9+&%=~_|$!]+/i`

Some of the cases the default regex handles (link inside code block):
- `github.com`
- `www.google.com`
- `http://www.zakarie.com`
- `https://www.facebook.com`
- "`www.google.com:8080`"
- `http://en.wikipedia.org/wiki/React_(JavaScript_library)`
- Examples are available at `http://tasti.github.io/react-linkify/`.
- `tasti@zakarie.com`