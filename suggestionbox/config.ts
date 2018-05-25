export const serverPort: Number = 3000;

export const DB = {
    host: "mongo1:27017,mongo2:27017,mongo3:27017",
    db: "suggestionbox",
    opts: {
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500,
        poolSize: 10,
        bufferMaxEntries: 0,
        replicaSet: "rs0"
    }
};

export function getDBURL() {
    return `mongodb://${DB.host}/${DB.db}`
}
