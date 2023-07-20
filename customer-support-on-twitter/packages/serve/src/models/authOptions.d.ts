export interface AuthOptions {
    [authType: string]: any;
}
export interface AuthSourceOptions {
    key?: string;
    in?: string;
}
export declare enum AuthSourceTypes {
    QUERY = "QUERY",
    PAYLOAD = "PAYLOAD"
}
