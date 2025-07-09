export class UnprocessableError extends Error {
    public status: number = 422;
}