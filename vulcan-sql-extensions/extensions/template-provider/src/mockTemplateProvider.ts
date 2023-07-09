import {
  Template,
  TemplateProvider,
  VulcanExtensionId,
} from '@vulcan-sql/core';

// To test this extension, change your vulcan.yaml template.provider to "mock"

@VulcanExtensionId('mock')
export class MockTemplateProvider extends TemplateProvider {
  public async *getTemplates(): AsyncGenerator<Template> {
    yield {
      name: 'filter-runner-and-builder',
      statement: 'select 1 as a',
    };
    yield {
      name: 'tag-runner-and-builder',
      statement: 'select 2 as a',
    };
  }
}
