"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VulcanServer = void 0;
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const fs = require("fs");
const http = require("http");
const https = require("https");
const core_1 = require("@vulcan-sql/core");
const containers_1 = require("../containers");
const middleware_1 = require("./middleware");
const logger = (0, core_1.getLogger)({ scopeName: 'SERVE' });
class VulcanServer {
    constructor(config) {
        this.uncaughtErrorHandler = (err) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Display non vulcan error
            if (!(err instanceof core_1.VulcanError))
                logger.warn('Unexpected error happened', err);
            logger.debug('Make server keep listening');
        });
        this.config = config;
        this.container = new containers_1.Container();
    }
    /**
     * Start the vulcan server. default http port is 3000, you could also change it by setting "port" under config.
     *
     * When you enabled "enforce-https" options and add "ssl" options in the config, it will run the https server too locally (default "type" = LOCAL under "enforce-https" options).
     *
     * If you don't set the "port" under "enforce-https" options, it will use the default 3001 as https port.
     */
    start() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            logger.info('testing');
            if (!(0, lodash_1.isEmpty)(this.servers))
                throw new core_1.InternalError('Server has created, please close it first.');
            // Load container
            yield this.container.load(this.config);
            const artifactBuilder = this.container.get(core_1.TYPES.ArtifactBuilder);
            // Obtain schema and template
            yield artifactBuilder.load();
            const templates = artifactBuilder.getArtifact(core_1.BuiltInArtifactKeys.Templates);
            const schemas = artifactBuilder.getArtifact(core_1.BuiltInArtifactKeys.Schemas);
            // check if exist duplicate url paths in "schemas" field of artifact
            const urlPaths = schemas.map((schema) => schema.urlPath);
            if ((0, lodash_1.uniq)(urlPaths).length !== urlPaths.length)
                throw new core_1.ConfigurationError('Duplicate "urlPath" found in "schemas" field of artifact, please check your artifact or original schemas before running build.');
            // Initialized template engine
            const codeLoader = this.container.get(core_1.TYPES.CompilerLoader);
            for (const templateName in templates) {
                codeLoader.setSource(templateName, templates[templateName]);
            }
            // Activate data sources
            const dataSources = this.container.getAll(core_1.TYPES.Extension_DataSource) || [];
            for (const dataSource of dataSources) {
                logger.debug(`Initializing data source: ${dataSource.getExtensionId()}`);
                yield dataSource.activate();
                logger.debug(`Data source ${dataSource.getExtensionId()} initialized`);
            }
            // load and schedule query results and keep to cache data source
            if (this.config.cache) {
                this.cacheRefresher = this.container.get(core_1.TYPES.CacheLayerRefresher);
                logger.info('Start to load and schedule prefetched data results from data sources to cache layer...');
                yield this.cacheRefresher.start(schemas);
            }
            // Create application
            const app = this.container.get(containers_1.TYPES.VulcanApplication);
            yield app.useMiddleware();
            yield app.buildRoutes(schemas, this.config['types']);
            // Run server
            this.servers = this.runServer(app);
            return this.servers;
        });
    }
    close() {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.servers) {
                if (this.servers['http'])
                    this.servers['http'].close();
                if (this.servers['https'])
                    this.servers['https'].close();
                this.servers = undefined;
                // remove 'uncaughtException' listener
                process.off('uncaughtException', this.uncaughtErrorHandler);
                process.off('SIGINT', () => tslib_1.__awaiter(this, void 0, void 0, function* () { return yield this.close(); }));
                process.off('SIGTERM', () => tslib_1.__awaiter(this, void 0, void 0, function* () { return yield this.close(); }));
            }
            (_a = this.cacheRefresher) === null || _a === void 0 ? void 0 : _a.stop();
            this.container.unload();
        });
    }
    /**
     * Run server
     * for https when config has setup ssl and middleware 'enforce-https' enabled with "LOCAL" type, or keep http
     */
    runServer(app) {
        const { enabled, options } = (0, middleware_1.getEnforceHttpsOptions)(this.config['enforce-https']);
        const httpPort = this.config['port'] || 3000;
        const httpServer = http.createServer({
            maxHeaderSize: 1000000,
        }, app.getHandler()).listen(httpPort);
        // Listen the all uncaught errors (including event emitter errors) to prevent server stop.
        process.on('uncaughtException', this.uncaughtErrorHandler);
        // Listen the Ctrl-C and terminated signals to close the server smoothly.
        process.on('SIGINT', () => tslib_1.__awaiter(this, void 0, void 0, function* () { return yield this.close(); }));
        process.on('SIGTERM', () => tslib_1.__awaiter(this, void 0, void 0, function* () { return yield this.close(); }));
        if (enabled && options['type'] === middleware_1.ResolverType.LOCAL) {
            const httpsServer = this.createHttpsServer(app, options, this.config['ssl']);
            return { http: httpServer, https: httpsServer };
        }
        return { http: httpServer };
    }
    createHttpsServer(app, options, ssl) {
        // check ssl file
        if (!fs.existsSync(ssl.key) || !fs.existsSync(ssl.cert))
            throw new core_1.ConfigurationError('Must need key and cert file at least when open https server.');
        // create https server
        const httpsPort = options['port'] || 3001;
        return https
            .createServer({
            key: fs.readFileSync(ssl.key),
            cert: fs.readFileSync(ssl.cert),
            // if ca not exist, set undefined
            ca: fs.existsSync(ssl.ca) ? fs.readFileSync(ssl.ca) : undefined,
            maxHeaderSize: 1000000,
        }, app.getHandler())
            .listen(httpsPort);
    }
}
exports.VulcanServer = VulcanServer;
//# sourceMappingURL=server.js.map