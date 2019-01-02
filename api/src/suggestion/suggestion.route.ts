import { Router } from "express";
import SuggestionController from "./suggestion.controller";

const suggestion: Router = Router();
const suggestionController = new SuggestionController();

suggestion.get("/:id?", suggestionController.find);
suggestion.post("/", suggestionController.create);
suggestion.patch("/:id", suggestionController.update);
suggestion.delete("/:id", suggestionController.delete);

export default suggestion;
        