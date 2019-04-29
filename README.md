# Nodejs Authentication Using JWT and Refresh Token
https://codeforgeek.com/refresh-token-jwt-nodejs-authentication/

# config 
```javascript
module.exports {
    secret: "some-secret-shit-goes-here",
    refreshTokenSecret: "some-secret-refresh-token-shit",
    port: 3000,
    tokenLife: 900,
    refreshTokenLife: 86400
}
```

```javascript
module.exports = {
    secret: "some-secret-shit-goes-here",
    refreshTokenSecret: "some-secret-refresh-token-shit",
    port: 3000,
    tokenLife: 15 * 60, // 900 ,15 minites
    refreshTokenLife: 24 * 60 * 60 // 86400 ,1 day
}
```