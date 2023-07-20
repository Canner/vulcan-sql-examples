import { ArtifactBuilder, ExtensionBase } from '@vulcan-sql/core';
import { KoaContext, Next } from '../index';
export declare abstract class DocumentRouter<C = any> extends ExtensionBase<C> {
    private artifactBuilder;
    constructor(config: any, moduleName: string, artifactBuilder: ArtifactBuilder);
    abstract handle(context: KoaContext, next: Next): Promise<void>;
    protected getSpec(type?: string): Promise<any>;
}
