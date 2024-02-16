import Session from 'supertokens-web-js/recipe/session';
import { PermissionClaim } from 'supertokens-web-js/recipe/userroles';
const checkroles = async (permission: any) => {
    if (await Session.doesSessionExist()) {

        let validationErrors = await Session.validateClaims({
            overrideGlobalClaimValidators: (globalValidators) =>
                [...globalValidators,
                    // UserRoleClaim.validators.includes("admin"),
                    PermissionClaim.validators.includes(permission)
                ]
        });

        if (validationErrors.length === 0) {
            // user is an admin
            return true;
        }

        for (const err of validationErrors) {
            if (err.validatorId === PermissionClaim.id) {
                // user roles claim check failed
            } else {
                // some other claim check failed (from the global validators list)
            }
        }
    }
    // either a session does not exist, or one of the validators failed.
    // so we do not allow access to this page.
    return false
}
export { checkroles };