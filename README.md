# Nodejs Authentication Using JWT and Refresh Token
https://codeforgeek.com/refresh-token-jwt-nodejs-authentication/

# config 
```
module.exports {
    secret: "some-secret-shit-goes-here",
    refreshTokenSecret: "some-secret-refresh-token-shit",
    port: 3000,
    tokenLife: 900,
    refreshTokenLife: 86400
}
```