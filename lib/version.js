function printVersion() {
    const packageJson = require('../package.json');
    console.log(packageJson.version);
    const emmyDomVersion = require('../node_modules/emmy-dom/package.json').version;
    console.log(`emmy-dom: ${emmyDomVersion}`);
    process.exit(0);
}

module.exports = printVersion;
