export const TRANSLATION_KEYS = {
    welcome: "welcome",
    auth: {
        register: {
            title: "auth.register.title",
            fields: {
                full_name: {
                    label: "auth.register.fields.full_name.label",
                    placeholder: "auth.register.fields.full_name.placeholder",
                },
                email: {
                    label: "auth.register.fields.email.label",
                    placeholder: "auth.register.fields.email.placeholder",
                },
                username: {
                    label: "auth.register.fields.username.label",
                    placeholder: "auth.register.fields.username.placeholder",
                },
                password: {
                    label: "auth.register.fields.password.label",
                    placeholder: "auth.register.fields.password.placeholder",
                },
            },
            actions: {
                sign_up_btn: "auth.register.actions.sign_up_btn",
                or: "auth.register.actions.or",
                continue_with_google: "auth.register.actions.continue_with_google",
            },
            footer: {
                already_have_account: "auth.register.footer.already_have_account",
                sign_in: "auth.register.footer.sign_in",
            },
            errors: {
                full_name_required: "auth.register.errors.full_name_required",
                email_required: "auth.register.errors.email_required",
                email_invalid: "auth.register.errors.email_invalid",
                username_required: "auth.register.errors.username_required",
                password_required: "auth.register.errors.password_required",
                password_min_length: "auth.register.errors.password_min_length",
                username_taken: "auth.register.errors.username_taken",
                email_taken: "auth.register.errors.email_taken",
                please_fill_all_field_correctly:"auth.register.errors.please_fill_all_field_correctly"
              },
              messages:{
                username_avilable:"auth.register.messages.username_avilable",
            }
        },
        login: {
            title: "auth.login.title",
            welcome_msg: "auth.login.welcome_msg",
            fields: {
                email: {
                    label: "auth.login.fields.email.label",
                    placeholder: "auth.login.fields.email.placeholder",
                },
                password: {
                    label: "auth.login.fields.password.label",
                    placeholder: "auth.login.fields.password.placeholder",
                },
            },
            actions: {
                forgot_password: "auth.login.actions.forgot_password",
                sign_in_btn: "auth.login.actions.sign_in_btn",
                or: "auth.login.actions.or",
                continue_with_google: "auth.login.actions.continue_with_google",
            },
            footer: {
                dont_have_account: "auth.login.footer.dont_have_account",
                sign_up: "auth.login.footer.sign_up",
            },
        },
        forgot_password: {
            title: "auth.forgot_password.title",
            fields: {
                email: {
                    label: "auth.forgot_password.fields.email.label",
                    placeholder: "auth.forgot_password.fields.email.placeholder",
                },
                code: {
                    label: "auth.forgot_password.fields.code.label",
                    placeholder: "auth.forgot_password.fields.code.placeholder",
                },
                password: {
                    label: "auth.forgot_password.fields.password.label",
                    placeholder: "auth.forgot_password.fields.password.placeholder",
                },
            },
            actions: {
                send_code: "auth.forgot_password.actions.send_code",
                check_email: "auth.forgot_password.actions.check_email",
            },
            error: {
                enter_email_error: "auth.forgot_password.error.enter_email_error",
                enter_code_error: "auth.forgot_password.error.enter_code_error",
            },
        },
        verify: {
            title: "auth.verify.title",
            fields: {
                code: {
                    label: "auth.verify.fields.code.label",
                    placeholder: "auth.verify.fields.code.placeholder",
                },
            },
            actions: {
                resend_code: "auth.verify.actions.resend_code",
                verify_btn: "auth.verify.actions.verify_btn",
                go_back: "auth.verify.actions.go_back",
            },
        },
    },
};
