import HttpException from "./httpException";

export default class ModelNotFoundException extends HttpException {
    constructor(id: string = null) {
        if (id) {
            super(404, `There is no item matching id ${id}`);
        }
        else {
            super(404, 'There is no data for this request')
        }
    }
}