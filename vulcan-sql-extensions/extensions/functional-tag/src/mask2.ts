import { createTagExtension, FunctionalTag } from '@vulcan-sql/core';

const Mask2FunctionalTag: FunctionalTag = async ({ args, sql }) => {
  let { len = 3, padding = 5 } = args;

  let paddingString = '';
  while (padding--) paddingString += 'x';
  return `CONCAT(SUBSTR(${sql}, 0, ${len + 1}), '${paddingString}')`;
};

export const Mask2Tag = createTagExtension('mask2', Mask2FunctionalTag);
