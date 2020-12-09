const webpack = require('webpack');
module.exports = {
    // 在htmlWebpackPlugin中增加环境变量，在index.html中使用
    chainWebpack: config => {
        config.plugin('provide').use(webpack.ProvidePlugin, [
            {
                $: 'jquery',
                jquery: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            }
        ]);
        config.plugin('html').tap(args => {
            args[0].environment = process.env.NODE_ENV;
            return args;
        });
    }
};
