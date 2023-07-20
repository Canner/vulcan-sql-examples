import * as http from 'http';
import * as https from 'https';
import { ServeConfig } from '../models';
export declare class VulcanServer {
    private config;
    private container;
    private servers?;
    private cacheRefresher?;
    constructor(config: ServeConfig);
    private uncaughtErrorHandler;
    /**
     * Start the vulcan server. default http port is 3000, you could also change it by setting "port" under config.
     *
     * When you enabled "enforce-https" options and add "ssl" options in the config, it will run the https server too locally (default "type" = LOCAL under "enforce-https" options).
     *
     * If you don't set the "port" under "enforce-https" options, it will use the default 3001 as https port.
     */
    start(): Promise<{
        http: http.Server;
        https?: https.Server | undefined;
    }>;
    close(): Promise<void>;
    /**
     * Run server
     * for https when config has setup ssl and middleware 'enforce-https' enabled with "LOCAL" type, or keep http
     */
    private runServer;
    private createHttpsServer;
}
