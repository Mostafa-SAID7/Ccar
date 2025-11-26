import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
    /**
     * Validate password strength
     */
    static strongPassword(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;

            if (!value) {
                return null;
            }

            const hasUpperCase = /[A-Z]/.test(value);
            const hasLowerCase = /[a-z]/.test(value);
            const hasNumeric = /[0-9]/.test(value);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
            const isLengthValid = value.length >= 8;

            const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && isLengthValid;

            return !passwordValid ? {
                strongPassword: {
                    hasUpperCase,
                    hasLowerCase,
                    hasNumeric,
                    hasSpecialChar,
                    isLengthValid
                }
            } : null;
        };
    }

    /**
     * Validate passwords match
     */
    static passwordMatch(passwordField: string, confirmPasswordField: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const password = control.get(passwordField);
            const confirmPassword = control.get(confirmPasswordField);

            if (!password || !confirmPassword) {
                return null;
            }

            return password.value !== confirmPassword.value ? { passwordMatch: true } : null;
        };
    }

    /**
     * Validate username format
     */
    static username(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;

            if (!value) {
                return null;
            }

            const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/;
            return !usernameRegex.test(value) ? { username: true } : null;
        };
    }

    /**
     * Validate URL format
     */
    static url(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;

            if (!value) {
                return null;
            }

            try {
                new URL(value);
                return null;
            } catch {
                return { url: true };
            }
        };
    }

    /**
     * Validate phone number
     */
    static phoneNumber(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;

            if (!value) {
                return null;
            }

            const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            return !phoneRegex.test(value) ? { phoneNumber: true } : null;
        };
    }

    /**
     * Validate minimum age
     */
    static minAge(minAge: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;

            if (!value) {
                return null;
            }

            const birthDate = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                return age - 1 < minAge ? { minAge: { requiredAge: minAge, actualAge: age - 1 } } : null;
            }

            return age < minAge ? { minAge: { requiredAge: minAge, actualAge: age } } : null;
        };
    }

    /**
     * Validate file size
     */
    static fileSize(maxSizeMB: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const file = control.value as File;

            if (!file) {
                return null;
            }

            const maxSizeBytes = maxSizeMB * 1024 * 1024;
            return file.size > maxSizeBytes ? { fileSize: { maxSize: maxSizeMB, actualSize: file.size / 1024 / 1024 } } : null;
        };
    }

    /**
     * Validate file type
     */
    static fileType(allowedTypes: string[]): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const file = control.value as File;

            if (!file) {
                return null;
            }

            const isAllowed = allowedTypes.some(type => file.type.startsWith(type));
            return !isAllowed ? { fileType: { allowedTypes, actualType: file.type } } : null;
        };
    }

    /**
     * Validate no whitespace
     */
    static noWhitespace(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;

            if (!value) {
                return null;
            }

            const isWhitespace = (value || '').trim().length === 0;
            return isWhitespace ? { whitespace: true } : null;
        };
    }

    /**
     * Validate array min length
     */
    static arrayMinLength(minLength: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;

            if (!Array.isArray(value)) {
                return null;
            }

            return value.length < minLength ? { arrayMinLength: { requiredLength: minLength, actualLength: value.length } } : null;
        };
    }

    /**
     * Validate array max length
     */
    static arrayMaxLength(maxLength: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;

            if (!Array.isArray(value)) {
                return null;
            }

            return value.length > maxLength ? { arrayMaxLength: { requiredLength: maxLength, actualLength: value.length } } : null;
        };
    }
}
