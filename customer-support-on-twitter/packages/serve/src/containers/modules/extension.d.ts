import { AsyncContainerModule } from 'inversify';
import { ServeConfig } from '../../models/serveOptions';
export declare const extensionModule: (options: ServeConfig) => AsyncContainerModule;
