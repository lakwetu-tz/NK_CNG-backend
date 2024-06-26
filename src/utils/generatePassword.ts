export const generatePassword = (length: number = 12): string => {
    const charset = 'QWERTYUIOASDFGHJKLZXCVBNM123456789';
    let password = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
};
