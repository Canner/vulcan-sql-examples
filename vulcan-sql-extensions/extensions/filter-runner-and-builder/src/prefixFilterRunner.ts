import { FilterRunner, FilterRunnerTransformOptions } from '@vulcan-sql/core';

export class PrefixFilterRunner extends FilterRunner {
  public filterName = 'prefix';

  public async transform(
    options: FilterRunnerTransformOptions<string>
  ): Promise<any> {
    return `${options.args?.pre || 'vulcan'}-${options.value}`;
  }
}
