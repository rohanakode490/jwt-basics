const jwt = require('jsonwebtoken')
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
    const { username, password } = req.body;

    // mongo
    // Joi
    // check in the controller


    // Controller 
    if (!username || !password) {
        throw new CustomAPIError("Please give username and password", 400);
    }

    // id for demo, will be fetch from the database 
    const id = new Date

    // new token - try to keep payload small, better experience for user
    const token = jwt.sign({id, username}, process.env.JWT_SECRET,{expiresIn:'30d'})

    res.status(200).json({msg:`user created`, token })
};

const dashboard = async (req, res) => { 
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new CustomAPIError("No Token provided", 401);
    }
    
    const token = authHeader.split(' ')[1]
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        const luckyNumber = Math.floor(Math.random() * 100);
        res.status(200).json({
            msg: `Hello, ${decoded.username}`,
            secret: `here is your authorized data, your lucky number is ${luckyNumber}`,
        });
    } catch (error) {
        throw new CustomAPIError("Not Authorized to access this route", 401);
    }

};

module.exports = { login, dashboard };
