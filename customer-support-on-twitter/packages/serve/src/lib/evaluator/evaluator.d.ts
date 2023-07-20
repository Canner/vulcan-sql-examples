import { Profile } from '@vulcan-sql/core';
import { AuthUserInfo } from '../../models/extensions';
export declare class Evaluator {
    private profiles;
    constructor(profiles?: Profile[]);
    evaluateProfile(user: AuthUserInfo, candidates: string[]): string | null;
    private evaluateOrConstraints;
    private evaluateAndConstraints;
    private getConstraints;
}
