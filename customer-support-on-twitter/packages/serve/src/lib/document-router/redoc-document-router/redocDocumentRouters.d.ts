import { ArtifactBuilder, ProjectOptions } from '@vulcan-sql/core';
import { Next } from 'koa';
import * as Router from 'koa-router';
import { DocumentRouter } from '../../../models/index';
export declare class RedocDocumentRouters extends DocumentRouter {
    private router;
    private docContent;
    private projectOption;
    private urlPrefix;
    constructor(config: any, moduleName: string, artifactBuilder: ArtifactBuilder, projectOption: ProjectOptions);
    onActivate(): Promise<void>;
    handle(context: Router.RouterContext, next: Next): Promise<void>;
}
