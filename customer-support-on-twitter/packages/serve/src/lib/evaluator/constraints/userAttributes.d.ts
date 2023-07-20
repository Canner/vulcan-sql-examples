import { AuthUserInfo } from '../../../models/index';
import { AuthConstraint } from './base';
export declare class UserAttributesConstrain implements AuthConstraint {
    private attributes;
    constructor(attributes: Record<string, any>);
    evaluate(user: AuthUserInfo): boolean;
    private doesUserHasAttributeWithValue;
}
