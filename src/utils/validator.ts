import * as yup from 'yup';

// Refer to the docs for how to make advanced validation behaviors with dynamic configs
const vuetifyConfig = (state: { errors: any; }) => ({
    props: {
        'error-messages': state.errors
    }
});


const username = yup.string().min(3).required().label('Username');
const email = yup.string().email().required().label('Email');
const password = yup.string().min(6).required().label('Password');
const passwordCurrent = yup.string().min(6).required().label('Current password');
const passwordNew = yup.string().min(6).required()
    .notOneOf([yup.ref('passwordCurrent')], 'New password must be different current password')
    .label('Password');
const passwordConfirm = yup.string()
    .oneOf([yup.ref('passwordNew')], 'Passwords must match')
    .required().label('Confirm Password');


const schemaChangePassword = yup.object({
    passwordNew: passwordNew,
    passwordConfirm: passwordConfirm,
    passwordCurrent: passwordCurrent
});

const schemaLogin = yup.object({
    username: username,
    password: password
});

export { schemaLogin, schemaChangePassword, vuetifyConfig };