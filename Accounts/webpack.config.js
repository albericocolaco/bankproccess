const path = require('path')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')


module.exports = function(env) {
    console.log(env.APP_TARGET)
    var appTarget  = env.APP_TARGET || 'dev'
    return {
        plugins: [
            new webpack.NormalModuleReplacementPlugin(/(.*)environment\.ts/, `./environment.${appTarget}.ts`)
        ],
        entry: {
            server: './src/index.ts'
        },
        output: {
            path: path.join(__dirname, 'dist'),
            publicPath: '/',
            filename: '[name].js'
        },
        target: 'node',
        node: {
            __dirname: false,
            __filename: false
        },
        externals: [nodeExternals()],
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'ts-loader'
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js', '.json']
        }
    }
}