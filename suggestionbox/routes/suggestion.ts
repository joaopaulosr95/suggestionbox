import { Request, Response, Router, NextFunction } from "express";
import { Suggestion } from "../models/suggestion";
import * as config from "../config";
import * as Mongoose from "mongoose";
import { INSPECT_MAX_BYTES } from "buffer";

const suggestionRouter: Router = Router();

suggestionRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
    Mongoose.connect(config.getDBURL(), config.DB.opts)
    .then(() => {
        Suggestion.find({}, (err, docs) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            else {
                return res.json(docs);
            }
        });
    }).catch(err => {
        console.error(err);
    });
});

suggestionRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
    Mongoose.connect(config.getDBURL(), config.DB.opts)
    .then(() => {
        Suggestion.create(req.body, (err, docs) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            return res.json(docs);
        });
    }).catch((err) => {
        console.error(err);
    });
});

suggestionRouter.get("/:suggestionId", (req: Request, res: Response, next: NextFunction) => {
    Mongoose.connect(config.getDBURL(), config.DB.opts)
    .then(() => {
        Suggestion.findById(req.params.suggestionId, (err, docs) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            return res.json({
                data: docs
            });
        });
    }).catch((err) => {
        console.error(err)
    });
});

suggestionRouter.patch("/:suggestionId", (req: Request, res: Response, next: NextFunction) => {
    Mongoose.connect(config.getDBURL(), config.DB.opts)
    .then(() => {
        Suggestion.findByIdAndUpdate(req.params.suggestionId, req.body,
            {new: true, runValidators: true}, (err, docs) => {
                if (err) {
                    console.error(err);
                    return next(err);
                }
                return res.json(docs);
            });
    }).catch((err) => {
        console.error(err);
    });
});
    
suggestionRouter.delete("/:suggestionId", (req: Request, res: Response, next: NextFunction) => {
    Mongoose.connect(config.getDBURL(), config.DB.opts)
    .then(() => {
        Suggestion.findByIdAndRemove(req.params.suggestionId, (err, docs) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            return res.json(docs);
        });
    }).catch((err) => {
        console.error(err);
    });
});
        
export { suggestionRouter };
        