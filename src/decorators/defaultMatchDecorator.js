// @flow

import LinkifyIt from 'linkify-it';
import tlds from 'tlds';

const linkify = new LinkifyIt();
linkify.tlds(tlds);

export default (text: string): Array<Object> => {
  return linkify.match(text);
};
