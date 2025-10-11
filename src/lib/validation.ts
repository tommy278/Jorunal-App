export function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
export function isCommonEmail(email: string) {
    return /@(gmail\.com|yahoo\.com|outlook\.com)$/.test(email);
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export function isValidPassword(password: string) {
    return passwordRegex.test(password);
}
