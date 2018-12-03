import * as mongoose from "mongoose";

import {currentEnv} from "./config";
import {Log} from "../util/log";
import {ENVIRONMENT} from "../nodeServer";

export class Connection {
    private static connection;

    /**
     * Initialize the connection and makes it
     */
    static initAndConnect() {
        Connection.init();
        return Connection.connect();
    }

    /**
     * Initialize the connection object
     */
    static init() {
        mongoose.set("useCreateIndex", true);
        mongoose.set("useNewUrlParser", true);

        const uri = `mongodb://${process.env.DOCKERIZED ? 'mongo' : currentEnv().database.host}:27017/${currentEnv().database.name}`;

        Connection.connection = mongoose.connect(
            uri,
            {
                useNewUrlParser: true,
                reconnectTries: Number.MAX_VALUE,
                reconnectInterval: 500,
                poolSize: 50,
                bufferMaxEntries: 0,
                keepAlive: 120
            },
        );
    }

    /**
     * Makes the connection and returns it
     */
    static connect() {
        if (this.connection && this.connection.readyState == 1 || this.connection.readyState == 2) return;

        const uri = `mongodb://${process.env.DOCKERIZED ? 'mongo' : currentEnv().database.host}:27017/${currentEnv().database.name}`;

        return Connection.connection
            .then(db => {
                Log.info(`Successfully connected to ${uri} MongoDB cluster in ${ENVIRONMENT} mode.`);
                return db;
            })
            .catch(err => {
                if (err.message.code === 'ETIMEDOUT') {
                    Log.info('Attempting to re-establish database connection.');
                    mongoose.connect(uri);
                } else {
                    Log.error(err, `Error while attempting to connect to database (${uri}):`);
                }
            });
    }

    /**
     * Returns true if is connected to mongo server
     */
    static async connected() {
        return (await (this.connection)).connections[0]._readyState == 1;
    }
}
