import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import CONFIG from './config';
import suggestion from "./suggestion/suggestion.route";
import errorMiddleware from './middlewares/errorMiddleware';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.setRoutes();
    this.catchErrors();
    this.getDB();
  }

  private setMiddlewares(): void {
    this.express.use(cors());
    this.express.use(morgan(':date[iso] :method :url :status :res[content-length] - :response-time ms'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(helmet());
  }

  private setRoutes(): void {
    this.express.use('/api/suggestions', suggestion);
  }

  private catchErrors(): void {
    this.express.use(errorMiddleware);
  }

  private getDB = async() => {
    mongoose.set('useCreateIndex', true);
    await mongoose.connect(
      `mongodb://${CONFIG.DB_HOST}/${CONFIG.DB_NAME}`,
      CONFIG.DB_OPTS
    ).then(conn => {
      console.info('Successfully connected to mongo')
    }).catch(err => {
      console.error('Could not connect to mongo due to "'+err.message+'"');
      process.exit(1);
    });
  }

  public listen() {
    this.express.listen(CONFIG.PORT, err => {
      if (err) {
        console.error('Could not listen due to "'+err.message+'"');
        process.exit(1)
      }
      console.info('Here we go! I\'m listening on port ' + CONFIG.PORT);
    })
  }
}

export default App;
