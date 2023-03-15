const PLUGIN_NAME = 'TimeLoggerPlugin';

class TimeLoggerPlugin {
    apply(compiler) {

        compiler.hooks.watchRun.tap(PLUGIN_NAME, (compiler) => {
            const logger = compiler.getInfrastructureLogger(PLUGIN_NAME);
            logger.info(`Current date and time: ${new Date().toLocaleString()}`);
        })
    }
}

module.exports = TimeLoggerPlugin;