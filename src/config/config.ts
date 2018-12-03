import {Log} from "../util/log";

const config = {
    development: {
        credentials_path: {
            key: "./credentials/key.pem",
            cert: "./credentials/cert.pem"
        },
        host: {
            name: "localhost",
            port: 8080
        },
        database: {
            host: '127.0.0.1:27017',
            name: "yourDBNameBName",
        }
    },
    test: {
        credentials_path: {
            key: "./credentials/key.pem",
            cert: "./credentials/cert.pem"
        },
        host: {
            name: "localhost",
            port: 8080
        },
        database: {
            host: '127.0.0.1:27017',
            name: "yourDBName_test",
        }
    },
    production: {
        credentials_path: {
            key: "./credentials/key.pem",
            cert: "./credentials/cert.pem"
        },
        host: {
            name: "35.246.74.212",
            port: 8080
        },
        database: {
            host: '127.0.0.1:27017',
            name: "yourDBName_prod",
        }
    }
};

let warningLogged = false;

export function currentEnv() {
    let environment = process.env.NODE_ENV;

    if (!environment) {
        if (!warningLogged) {
            Log.warn("Careful! NODE_ENV is not set to development | test | production. Using development as default");
            warningLogged = true;
        }

        environment = 'development';
    }

    return config[environment];
}


export function getConfig() {
    return config;
}
