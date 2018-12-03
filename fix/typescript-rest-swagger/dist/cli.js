#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var argparse_1 = require("argparse");
var metadataGenerator_1 = require("./metadata/metadataGenerator");
var generator_1 = require("./swagger/generator");
var packageJson = require("../package.json");
var workingDir = process.cwd();
var versionDefault = getPackageJsonValue('version');
var nameDefault = getPackageJsonValue('name');
var descriptionDefault = getPackageJsonValue('description');
var licenseDefault = getPackageJsonValue('license');
var parser = new argparse_1.ArgumentParser({
    addHelp: true,
    description: 'Tree-Gateway Swagger tool',
    version: packageJson.version
});
parser.addArgument(['-c', '--config'], {
    help: 'The swagger config file (swagger.json).'
});
var parameters = parser.parseArgs();
var config = getConfig(parameters.config);
var swaggerConfig = validateSwaggerConfig(config.swagger);
var metadata = new metadataGenerator_1.MetadataGenerator(swaggerConfig.entryFile).generate();
new generator_1.SpecGenerator(metadata, swaggerConfig).generate(swaggerConfig.outputDirectory, swaggerConfig.yaml)
    .then(function () {
    console.info('Generation completed.');
})
    .catch(function (err) {
    console.error("Error generating swagger. " + err);
});
function getPackageJsonValue(key) {
    try {
        var projectPackageJson = require(workingDir + "/package.json");
        return projectPackageJson[key] || '';
    }
    catch (err) {
        return '';
    }
}
function getConfig(configPath) {
    if (configPath === void 0) { configPath = 'swagger.json'; }
    try {
        return require(workingDir + "/" + configPath);
    }
    catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
            throw Error("No config file found at '" + configPath + "'");
        }
        else if (err.name === 'SyntaxError') {
            throw Error("Invalid JSON syntax in config at '" + configPath + "': " + err.message);
        }
        else {
            throw Error("Unhandled error encountered loading '" + configPath + "': " + err.message);
        }
    }
}
function validateSwaggerConfig(conf) {
    if (!conf.outputDirectory) {
        throw new Error('Missing outputDirectory: onfiguration most contain output directory');
    }
    if (!conf.entryFile) {
        throw new Error('Missing entryFile: Configuration must contain an entry point file.');
    }
    conf.version = conf.version || versionDefault;
    conf.name = conf.name || nameDefault;
    conf.description = conf.description || descriptionDefault;
    conf.license = conf.license || licenseDefault;
    conf.basePath = conf.basePath || '/';
    conf.yaml = conf.yaml === false ? false : true;
    return conf;
}
//# sourceMappingURL=cli.js.map