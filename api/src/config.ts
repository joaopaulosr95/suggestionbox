export default {
    APP: "dev",
    PORT: "3000", 
    DB_HOST: "mongo1:27017,mongo2:27017,mongo3:27017",
    DB_NAME: "suggestionbox",
    DB_OPTS: {
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500,
        poolSize: 10,
        bufferMaxEntries: 0,
        replicaSet: "rs0",
        useNewUrlParser: true
    },
};