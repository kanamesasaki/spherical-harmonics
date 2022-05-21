const path = require('path');
module.exports = {
    // webpack starts bundling here
    entry: {
        bundle: './src/main.ts'
    },  
    output: {
        // the target directory for all output files
        path: path.join(__dirname,'dist'),
        filename: '[name].js'  // [name] is defined at entry (bundle in this case)
    },
    resolve: {
        // extensions that are recognized as modules
        extensions:['.ts','.js']
    },
    devServer: {
        // file location for webpack-dev-server
        static: {
            directory: path.join(__dirname, "dist"),
        },
    },
    module: {
	    // rules for modules (configure loaders, parser options, etc.)
        rules: [
            {
                // use TypeScript compiler for .ts files
                test:/\.ts$/,loader:'ts-loader'
            }
        ]
    }
}