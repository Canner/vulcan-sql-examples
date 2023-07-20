import { BaseRouteMiddleware } from '../../../src/models/index';
import { KoaContext, Next } from '../../../src/models/index';
export interface TestModeOptions {
    mode: boolean;
}
export declare class TestModeMiddleware extends BaseRouteMiddleware {
    private mode;
    handle(context: KoaContext, next: Next): Promise<void>;
}
