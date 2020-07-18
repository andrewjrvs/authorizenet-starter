//var getRawBody = require('raw-body')

const ROOT_URI = "http://localhost:4202";


const PROXY_CONFIG = [
    {
        context: ["/paymentapi"],
        target: ROOT_URI,
        secure: false,
        changeOrigin: true,
        // bypass: function (req, res, proxyOptions) {
        //     console.log(req._readableState);
        //     getRawBody(req)
        //         .then(function (buf) {
        //             console.log('msg', buf, buf.toString())
        //         })
        //         .catch(function (err) {
        //             console.error(err);
        //         })
        //     res.json({ custom: 'response' });
        //     return false;
        // },
        // close: function () {
        //     console.log('close');
        // }
    }, 
    // function (req, res) {
    //     console.log('proxied config', req, res, '()()()()()()('); 
    //     return false;
    // }
]

module.exports = PROXY_CONFIG;