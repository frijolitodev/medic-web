export default {
    email: {
        required: {
            value: true,
            message: 'Email cannot be empty',
        },
        minLength: {
            value: 8,
            message: 'Email is at least 8 characters long',
        },
    },
    password: {
        required: {
            value: true,
            message: 'Password cannot be empty',
        },
        minLength: {
            value: 8,
            message: 'Password is at least 8 characters long',
        },
    },
};
