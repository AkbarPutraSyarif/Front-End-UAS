const bodyParser = require('body-parser');
const cors = require('cors');

const middleware = (app) => {
    // Use middleware for JSON parsing
    app.use(bodyParser.json());
    
    // Use CORS middleware for cross-origin requests
    app.use(cors());
};

module.exports = middleware;
