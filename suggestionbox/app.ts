import { json, urlencoded } from "body-parser";
import * as express from "express";
import { suggestionRouter } from "./routes/suggestion";
import * as cors from "cors"

const app: express.Application = express();

app.disable("x-powered-by");

app.use(cors());
app.use(json());
app.use(urlencoded({extended: false}));

// Routers
app.use("/suggestions", suggestionRouter);

// Default "not found" route
app.get("*", (req: express.Request, res: express.Response) => {
    throw new Error('woops')
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    next(err)
});

// default error handler
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).json({})
})
  
export { app };