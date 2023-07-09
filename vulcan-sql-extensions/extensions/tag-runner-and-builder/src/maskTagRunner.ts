import { TagRunner, TagRunnerOptions } from '@vulcan-sql/core';
import * as nunjucks from 'nunjucks';

export class MaskTagRunner extends TagRunner {
  public tags: string[] = ['mask', 'endmask'];

  public async run({ args, contentArgs }: TagRunnerOptions): Promise<string> {
    // Get the arguments
    let { len = 3, padding = 5 } = args[0] as any; // TODO: Fix the argument type
    // Render sqls
    const sql = (
      await Promise.all(contentArgs.map((content) => content()))
    ).join('\n');

    let paddingString = '';
    while (padding--) paddingString += 'x';

    // Use SafeString to avoid auto escaping
    return new nunjucks.runtime.SafeString(
      `CONCAT(SUBSTR(${sql}, 0, ${len + 1}), '${paddingString}')`
    );
  }
}
