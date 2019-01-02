import { NextFunction, Request, Response } from 'express';
import * as mongoose from 'mongoose';
import Suggestion from './suggestion.model';
import HttpException from '../exceptions/httpException';
import ModelNotFoundException from '../exceptions/modelNotFoundException';
import InvalidRequestExpception from '../exceptions/invalidRequestException';

export default class SuggestionController {
    public find = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const id = req.params.id;
            if (id) {
                const suggestion = await Suggestion.findById(id);
                if (!suggestion) {
                    return next(new ModelNotFoundException(id));
                }
                return res.send({
                    error: [],
                    data: [suggestion]
                });
            }
            else {
                const suggestions = await Suggestion.find();
                if (!suggestions) {
                    return next (new ModelNotFoundException());
                }
                return res.send({
                    error: [],
                    data: suggestions
                });
            }
        } catch (err) {
            return next(err);
        }
    };

    public create = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const suggestion: mongoose.Document = new Suggestion(req.body);
            suggestion.save().then((doc) => {
                return res.json({
                    error: [],
                    data: [doc]
                });
            });
        } catch (err) {
            return next(err);
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const id = req.params.id;
            if (!id) {
                return next(new InvalidRequestExpception("Missing id"));
            }
            const suggestion = await Suggestion.findById(id);
            if (!suggestion) {
                return next(new ModelNotFoundException(id));
            }
            const newData = {
                firstName: req.body.firstName || suggestion.firstName,
                lastName: req.body.lastName || suggestion.lastName,
                email: req.body.email || suggestion.email,
                message: req.body.message || suggestion.message
            };
            const updatedSuggestion = await Suggestion.findByIdAndUpdate(
                id,
                newData,
                {
                    new: true
                }
            );
            if (!updatedSuggestion) {
                throw new HttpException(null, `Couldn't update suggestion ${id}.`);
            } else {
                return res.send({
                    error: {},
                    data: [updatedSuggestion]
                });
            }
        } catch (err) {
            return next(err);
        }
    };

    public delete = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const id = req.params.id;
            if (!id) {
                return next(new InvalidRequestExpception("Missing id"));
            }
            const suggestion = await Suggestion.findByIdAndRemove(id);
            if (!suggestion) {
                return next(new ModelNotFoundException(id));
            }
            return res.send({
                error: [],
                data: [suggestion]
            })
        } catch (err) {
            return next(err);
        }
    };
};