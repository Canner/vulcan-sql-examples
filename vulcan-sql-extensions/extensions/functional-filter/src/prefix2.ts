import { createFilterExtension, FunctionalFilter } from '@vulcan-sql/core';

const Prefix2FunctionFilter: FunctionalFilter = async ({ args, value }) => {
  return `${args.pre || 'vulcan'}-${value}`;
};

export const Mask2Tag = createFilterExtension('prefix2', Prefix2FunctionFilter);
