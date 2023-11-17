export type GlobalResponse <T> = {
    status: boolean;
    message: string;
    data: T;
    error: Object;
    validations: Object;
}