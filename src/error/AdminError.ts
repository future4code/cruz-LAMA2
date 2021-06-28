import { BaseError } from "./BaseError";

export class AdminError extends BaseError{
    constructor(){
        super(" Just 'ADMIN' can use this endpoint",401);
    }
}