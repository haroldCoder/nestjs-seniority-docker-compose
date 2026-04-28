export class InvalidEmailException extends Error {
    constructor(email: string) {
        super(`Email ${email} is invalid`);
        this.name = 'InvalidEmailException';
    }
}