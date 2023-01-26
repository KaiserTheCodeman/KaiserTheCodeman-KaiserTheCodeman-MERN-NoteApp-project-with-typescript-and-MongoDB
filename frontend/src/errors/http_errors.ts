class httpError extends Error {
    constructor(message?: string) {
        super(message)
        this.name = this.constructor.name
    }
}


/**
 * Status Code: 401
 */
export class UnauthorizedError extends httpError { }

/**
 * StatusCode: 409
 */
export class conflictError extends httpError { }

