const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const router = express.Router()
const config = require('./config')
const tokenList = {}
const app = express()

//console.log(config);

router.get('/', (req,res) => {
    res.send('Ok');
})

router.post('/login', (req,res) => {
    const postData = req.body;
    const user = {
        email: postData.email,
        name: postData.name
    }
    console.log("user", user);
    // do the database authentication here, with user name and password combination.
    const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
    const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})

    jwt.verify(token, config.secret, function(err, decoded) {
        console.log("decoded", decoded);
    })
    const response = {
        "status": "Logged in",
        "token": token,
        "refreshToken": refreshToken,
    }
    tokenList[refreshToken] = response
    res.status(200).json(response);
})

router.post('/token', (req,res) => {
    // refresh the damn token
    const postData = req.body
    // if refresh token exists
    // In the token route, I am expecting the refresh token in the payload, if the payload exists, I am checking if it is valid token.
    if((postData.refreshToken) && (postData.refreshToken in tokenList)) {
        const user = {
            "email": postData.email,
            "name": postData.name
        }
        // If it is a valid token, I am creating a new token and sending it back to the user. This way user doesn’t need to log in again.
        const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})


        const response = {
            "token": token,
        }
        // update the token in the list
        // You must use the store instead of an array in production, such as Redis.
        tokenList[postData.refreshToken].token = token
        res.status(200).json(response);
    } else {
        res.status(404).send('Invalid request')
    }
})

router.use(require('./tokenChecker'))

router.get('/secure', (req,res) => {
    // all secured routes goes here
    res.send('I am secured...')
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
//app.use(bodyParser)
app.use('/api', router)
app.listen(config.port || process.env.port || 3000);