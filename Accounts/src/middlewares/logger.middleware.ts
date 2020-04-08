import * as bunyan from 'bunyan'
var projectName = require('./../../package').name;
var projectVersion = require('./../../package').version;

export const logger = bunyan.createLogger({
    name: projectName,
    version: projectVersion,
    src: true
})