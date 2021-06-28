import { BaseError } from "./BaseError";

export class FieldsNotFound extends BaseError{
    constructor(){
        super(" Missing fields to complet",404);
    }
}