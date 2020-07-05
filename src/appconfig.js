let config = {
    keys: [
        APIURL = ''
    ]
}

if (process.env.NODE_ENV == 'production') {
    config.keys['APIURL'] = 'https://protobot-backend.herokuapp.com/api';
}
else {
    config.keys['APIURL'] = 'http://localhost:5000/api';
}


module.exports = config;