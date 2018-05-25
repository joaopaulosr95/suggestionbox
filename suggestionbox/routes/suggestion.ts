import { Request, Response, Router } from "express";
import { Suggestion } from "../models/suggestion";
import * as config from "../config";
import * as Mongoose from "mongoose";

const suggestionRouter: Router = Router();
const serverInternalError = {
    error: {
        code: 500,
        message: "Please contact administrator."
    }
};

suggestionRouter.get("/", (req: Request, res: Response) => {
    Mongoose.connect(config.getDBURL(), config.DB.opts)
    .then(() => {
        Suggestion.find({}, (err, docs) => {
            if (err) {
                console.log(err);
                return res.json(serverInternalError);
            }
            else {
                return res.json({data: docs});
            }
        });
    }).catch(err => {
        console.error(err);
    });
});

suggestionRouter.post("/", (req: Request, res: Response) => {
    Mongoose.connect(config.getDBURL(), config.DB.opts)
    .then(() => {
        Suggestion.create(req.body, (err, docs) => {
            if (err) {
                if (err.name == "ValidationError") {
                    let messages = [];
                    for (let field in err.errors) {
                        messages.push(err.errors[field].message)
                    }
                    return res.json({
                        error: {
                            code: 400,
                            message: messages
                        }
                    })
                }
                else {
                    return res.json(serverInternalError);
                }
            }
            return res.json({
                data: docs
            });
        });
    }).catch((err) => {
        console.log(err);
    });
});

suggestionRouter.get("/:suggestionId", (req: Request, res: Response) => {
    Mongoose.connect(config.getDBURL(), config.DB.opts)
    .then(() => {
        Suggestion.findById(req.params.suggestionId, (err, docs) => {
            if (err) {
                console.log(err);
                return res.json(serverInternalError);
            }
            return res.json({
                data: docs
            });
        });
    }).catch((err) => {
        console.log(err)
    });
});

suggestionRouter.patch("/:suggestionId", (req: Request, res: Response) => {
    Mongoose.connect(config.getDBURL(), config.DB.opts)
    .then(() => {
        Suggestion.findByIdAndUpdate(req.params.suggestionId, req.body,
            {new: true, runValidators: true}, (err, docs) => {
                if (err) {
                    if (err.name == "ValidationError") {
                        let messages = [];
                        for (let field in err.errors) {
                            messages.push(err.errors[field].message)
                        }
                        return res.json({
                            error: {
                                code: 400,
                                message: messages
                            }
                        })
                    }
                    else {
                        return res.json(serverInternalError);
                    }
                }
                return res.json({
                    data: docs
                });
            });
    }).catch((err) => {
        console.log(err);
    });
});
    
suggestionRouter.delete("/:suggestionId", (req: Request, res: Response) => {
    Mongoose.connect(config.getDBURL(), config.DB.opts)
    .then(() => {
        Suggestion.findByIdAndRemove(req.params.suggestionId, (err, docs) => {
            if (err) {
                console.log(err);
                return res.json(serverInternalError);
            }
            return res.json({
                data: docs
            });
        });
    }).catch((err) => {
        console.log(err);
    });
});
        
export { suggestionRouter };
        