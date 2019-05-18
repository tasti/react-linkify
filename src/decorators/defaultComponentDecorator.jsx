// @flow

import * as React from 'react';

export default (decoratedHref: string, decoratedText: string, key: number, openInNewWindow: boolean): React.Node => {
  return (
    <a href={decoratedHref} key={key} target={ openInNewWindow ? "_blank" : undefined}>
      {decoratedText}
    </a>
  );
};
