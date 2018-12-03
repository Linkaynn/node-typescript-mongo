# NodeJS + Typescript + MongoDB + Swagger

Quickstart package with nodejs + typescript + [typegoose](https://github.com/szokodiakos/typegoose) + [typescript-rest](https://github.com/thiagobustamante/typescript-rest) + [typescript-rest-swagger](https://github.com/thiagobustamante/typescript-rest-swagger)

### Versions

- node@10.0.0 (I recomend use [nvm](https://github.com/creationix/nvm))
- npm@6.4.1
- tsc@3.0.3 

### TL;DR 

```bash
npm install -g typescript
npm install -g nodemon
npm install -g mocha

npm install

# typescript-rest-swagger has a bug, and in fix folder is fixed
cp ./fix/typescript-rest-swagger/dist ./node_modules/typescript-rest-swagger

npm start # To develop

npm start:debug # To debug

npm test # To run the tests
```

Open [http://localhost:8080/v1/health](http://localhost:8080/v1/health) to see if everything is ok ;)

### Features

If the calls is successful:

```
{
  "status": "ok",
  "data": {...} # Here contains the response
}
```

If something is wrong:

```
{
  "status": "error",
  "data": {
    "code": "code/message",
    "message": "message of error",
    "exception": {...} # The exception thrown if exist
  }
}
```

In [errors.ts](src/util/errors.ts) you can see all the codes and messages.

