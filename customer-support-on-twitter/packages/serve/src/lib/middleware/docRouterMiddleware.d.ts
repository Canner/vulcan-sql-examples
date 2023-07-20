import { BuiltInMiddleware, DocumentRouter, KoaContext, Next } from '../../models/index';
import { DocumentOptions } from '@vulcan-sql/core';
import { interfaces } from 'inversify';
export declare class DocRouterMiddleware extends BuiltInMiddleware {
    private servers;
    constructor(config: any, name: string, documentRouterFactory: interfaces.AutoNamedFactory<DocumentRouter>, options: DocumentOptions);
    onActivate(): Promise<void>;
    handle(context: KoaContext, next: Next): Promise<void>;
}
