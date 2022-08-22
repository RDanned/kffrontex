// const BundleTracker = require('webpack-bundle-tracker');

// module.exports = {
//     //publicPath: "http://localhost:8080",
//     publicPath: process.env.NODE_ENV === 'production' ? '/static/' : 'http://localhost:8081',
//     outputDir: '../applications/templates/front',
//     indexPath: 'base-vue.html',
//     //outputDir: "./dist/",
//
//     chainWebpack: config => {
//         config.optimization.splitChunks(false)
//
//         config.plugin('BundleTracker').use(BundleTracker, [
//             {
//                 filename: './webpack-stats.json'
//             }
//         ])
//
//         config.resolve.alias.set('__STATIC__', 'static')
//
//         config.devServer
//             .public('http://localhost:8081')
//             //.host('0.0.0.0')
//             .host('localhost')
//             .port(8081)
//             .writeToDisk(filePath => filePath.endsWith('index.html'))//!
//             .hotOnly(true)
//             .watchOptions({poll: 1000})
//             .https(false)
//             .headers({'Access-Control-Allow-Origin': ['\*']})
//     }
// };