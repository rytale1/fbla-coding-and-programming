// Regular expression borrowed from https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
export const validateEmail = (email: string) => {
    return (
        email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) !== null
    );
};

export const validateUrl = (url: string): boolean => {
    // Regular expression pattern for validating URLs
    const urlPattern = /^(|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
};

export const validateLength = (formField: string): boolean => {
    return formField.length > 5;
};
