import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import Emailpassword from 'supertokens-web-js/recipe/emailpassword';
import { PermissionClaim } from 'supertokens-web-js/recipe/userroles';
import type { App } from 'vue';

async function checkRoles(permission: string) {
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

export default {
    install: (app: App) => {
        SuperTokens.init({
            appInfo: {
                apiDomain: import.meta.env.VITE_AUTH_API_URL,
                apiBasePath: import.meta.env.VITE_AUTH_BASE_PATH,
                appName: import.meta.env.VITE_APP_NAME
            },
            recipeList: [
                Emailpassword.init(),
                Session.init(),
            ]
        });

        app.provide('$can', checkRoles);
    }
};

