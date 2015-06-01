# [react-linkify](http://tasti.github.io/react-linkify/)
React component to parse links (urls, emails, etc.) in text into clickable links

## Installation

```
npm install react-linkify --save
```

## Usage

```js
var Linkify = require('react-linkify');

React.render(
  <Linkify>Examples are available at http://tasti.github.io/react-linkify/.</Linkify>,
  document.body
);
```

### Properties

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

NOTE: I recommend that you use the default regex. If you want to modify it for some use case, it's probably better to file an issue and change the default since someone else might have the same issue.

Some of the cases the default regex handles (bold is the link):
- **github&#8203;.com**
- **www&#8203;.google.com**
- **http://www&#8203;.zakarie.com**
- **https://www&#8203;.facebook.com**
- "**www&#8203;.google.com:8080**"
- **http://en&#8203;.wikipedia.org/wiki/React_(JavaScript_library)**
- Examples are available at **tasti&#8203;.github.io/react-linkify/**.

## Examples

Available at [tasti.github.io/react-linkify/](http://tasti.github.io/react-linkify/).
