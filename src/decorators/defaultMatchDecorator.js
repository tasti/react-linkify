// @flow

import LinkifyIt from 'linkify-it';
import tlds from 'tlds';

const linkify = /*#__PURE__*/ new LinkifyIt().tlds(tlds);

export default (text: string): Array<Object> => {
  return linkify.match(text);
};
