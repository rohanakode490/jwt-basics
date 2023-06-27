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
    const id = new Date().getDate()

    // new token - try to keep payload small, better experience for user
    const token = jwt.sign({id, username}, process.env.JWT_SECRET,{expiresIn:'30d'})

    res.status(200).json({msg:`user created`, token })
};

const dashboard = async (req, res) => {     
    const luckyNumber = Math.floor(Math.random() * 100);
    
    res.status(200).json({
        msg: `Hello, ${req.user.username}`,
        secret: `here is your authorized data, your lucky number is ${luckyNumber}`,
    });
};

module.exports = { login, dashboard };
