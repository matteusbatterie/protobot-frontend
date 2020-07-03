const dev = {
    api:{
        URL: 'http://localhost:5000'
    }
}

const prod = {
    api:{
        URL: 'https://protobot-backend.herokuapp.com'
    }
}

let config;

switch(process.env.NODE_ENV){
    case 'production':
        config = prod;
        break;
    default:
        config = dev;
}

export default config;