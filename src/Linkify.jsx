import React from 'react';
import LinkifyIt from 'linkify-it';
import tlds from 'tlds';


const Linkify = ({ className, component, properties, children }) => {
	const linkify = new LinkifyIt();
	linkify.tlds(tlds);
	const MATCH = 'LINKIFY_MATCH';

	const getMatches = function getMatches(string) {
		return linkify.match(string);
	}

	let parseCounter = 0;

	const parseString = function parseString(string) {
		const elements = [];
		if (string === '') {
			return elements;
		}

		const matches = getMatches(string);
		if (!matches) {
			return string;
		}

		let lastIndex = 0;
		let idx = 0;
		for (const match of matches) {
			// Push the preceding text if there is any
			if (match.index > lastIndex) {
				elements.push(string.substring(lastIndex, match.index));
			}
			// Shallow update values that specified the match
			const props = { href: match.url, key: `match${++idx}` };
			for (const key in properties) {
				let val = properties[key];
				if (val === MATCH) {
					val = match.url;
				}

				props[key] = val;
			}
			elements.push(React.createElement(
        component,
        props,
        match.text
      ));
			lastIndex = match.lastIndex;
		}

		if (lastIndex < string.length) {
			elements.push(string.substring(lastIndex));
		}

		return (elements.length === 1) ? elements[0] : elements;
	};

	const parse = function parse(children) {
		let parsed = children;

		if (typeof children === 'string') {
			parsed = parseString(children);
		} else if (React.isValidElement(children) && (children.type !== 'a') && (children.type !== 'button')) {
			parsed = React.cloneElement(
				children,
				{ key: `parse${++parseCounter}` },
				parse(children.props.children)
			);
		} else if (children instanceof Array) {
			parsed = children.map(child => (parse(child)));
		}

		return parsed;
	}

	parseCounter = 0;
	const parsedChildren = parse(children);

	return (
		<span className={className}>{parsedChildren}</span>
	);
};

Linkify.defaultProps = {
	className: 'Linkify',
	component: 'a',
	properties: {},
};

Linkify.propTypes = {
	children: React.PropTypes.any,
	className: React.PropTypes.string,
	component: React.PropTypes.any,
	properties: React.PropTypes.object,
};

export default Linkify;
