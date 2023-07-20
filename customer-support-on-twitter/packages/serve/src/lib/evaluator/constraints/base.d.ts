import { AuthUserInfo } from '../../../models/index';
export interface AuthConstraint {
    evaluate(user: AuthUserInfo): boolean;
}
