import { VulcanArtifactBuilder, ICoreOptions } from '@vulcan-sql/core';
import { Next } from 'koa';
import * as Router from 'koa-router';
import { CatalogRouter } from '../../models/index';
export declare class CatalogRouters extends CatalogRouter {
    private router;
    constructor(config: any, moduleName: string, projectOptions: Partial<ICoreOptions>, artifactBuilder: VulcanArtifactBuilder);
    onActivate(): Promise<void>;
    private getShareKey;
    private getAPIDocUrl;
    handle(context: Router.RouterContext, next: Next): Promise<void>;
}
