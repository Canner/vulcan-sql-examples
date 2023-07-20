import { APISchema, ExtensionBase, ICoreOptions, VulcanArtifactBuilder } from '@vulcan-sql/core';
import { KoaContext, Next } from '../index';
export declare abstract class CatalogRouter<C = any> extends ExtensionBase<C> {
    private projectOptions;
    private artifactBuilder;
    constructor(config: any, moduleName: string, projectOptions: Partial<ICoreOptions>, artifactBuilder: VulcanArtifactBuilder);
    abstract handle(context: KoaContext, next: Next): Promise<void>;
    protected getProjectOptionsByKey(key: string): any;
    protected getArtifactSchemas(): Promise<APISchema[]>;
}
