const commonConfig = require('./webpack.config')

module.exports = {
    ...commonConfig,
    output: {
        ...commonConfig.output,
        // publicPath: 'http://localhost:8080/',
    },
    mode: 'development',
    module: {
        rules: [
            ...commonConfig.module.rules,
            {
                test: /\.(js|jsx|ts|tsx)?$/,
                use: 'react-hot-loader/webpack',
                include: /node_modules/,
            },
        ],
    },
    devServer: {
        compress: true,
        historyApiFallback: true,
        open: true,
        overlay: true,
    },
    plugins: [...commonConfig.plugins],
}
