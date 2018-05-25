import { json, urlencoded } from "body-parser";
import * as express from "express";
import { suggestionRouter } from "./routes/suggestion";
import * as cors from "cors"

const app: express.Application = express();

app.disable("x-powered-by");

app.use(cors())
app.use(json());
app.use(urlencoded({extended: false}));

app.use("/suggestions", suggestionRouter);

// Default "not found" route
app.get("*", (req: express.Request, res: express.Response) => {
    return res.json({
        error: {
            code: 404,
            message: "Not found"
        }
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found')
    next(err)
});

// no stacktrace leaked to user
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
  
    // render the error page
    res.status(err.status || 500)
    res.render('error')
})
  
export { app };