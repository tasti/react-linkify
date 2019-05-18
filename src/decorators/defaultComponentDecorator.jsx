// @flow

import * as React from 'react';

export default (decoratedHref: string, decoratedText: string, key: number, aTagTarget: string): React.Node => {
  return (
    <a href={decoratedHref} key={key} target={aTagTarget}>
      {decoratedText}
    </a>
  );
};
