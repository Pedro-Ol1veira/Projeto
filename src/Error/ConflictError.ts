
export class ConflictError extends Error {
    public status: number = 409;
}