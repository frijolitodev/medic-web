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
    name: {
        required: {
            value: true,
            message: 'Name cannot be empty',
        },
    },
    lastName: {
        required: {
            value: true,
            message: 'Lastname cannot be empty',
        },
    },
    phone: {
        required: {
            value: true,
            message: 'Phone cannot be empty',
        },
        minLength: {
            value: 8,
            message: 'Phone is at least 8 characters long',
        },
    },
    dateOfBirth: {
        required: {
            value: true,
            message: 'Age cannot be empty',
        },
    },
};
