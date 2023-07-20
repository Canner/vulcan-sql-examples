import { Container as InversifyContainer } from 'inversify';
import { ServeConfig } from '../models';
export declare class Container {
    private inversifyContainer?;
    private coreContainer?;
    get<T>(type: symbol): T;
    getAll<T>(type: symbol): T[] | undefined;
    load(config: ServeConfig): Promise<void>;
    unload(): Promise<void>;
    getInversifyContainer(): InversifyContainer | undefined;
}
