import { AuthUserInfo } from '../../../models/index';
import { AuthConstraint } from './base';
export declare class UserNameConstrain implements AuthConstraint {
    private nameRule;
    constructor(nameRule: string);
    evaluate(user: AuthUserInfo): boolean;
}
