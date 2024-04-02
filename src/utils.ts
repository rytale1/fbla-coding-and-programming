// Regular expression borrowed from https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
export const validateEmail = (email: string): boolean => {
    return (
        email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) !== null
    );
};

// Regular expression borrowed from https://stackoverflow.com/questions/5142103/regex-to-validate-password-strength
export const validatePasswordStrength = (pass: string): boolean => {
    return (
        pass.match(
            /^(?=.*[!@#$&*])(?=.*[0-9].*[0-9]).{8,}$/
        ) !== null
    );
}

export const validateUrl = (url: string): boolean => {
    // Regular expression pattern for validating URLs
    const urlPattern = /^(|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
};

export const validateLength = (formField: string): boolean => {
    return formField.length > 5;
};

export const validatePhone = (phoneNumber: string): boolean => {
    // Regular expression pattern for validating phone numbers
    // This pattern matches numbers in the format: (123) 456-7890 or 123-456-7890
    const phonePattern = /^\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;
    // Test if the phoneNumber matches the pattern
    return phonePattern.test(phoneNumber);
};
