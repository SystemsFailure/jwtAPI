const JwtService = require("../services/jwt.service");

module.exports = function(req, res, next) {
    const jwtService = new JwtService();
    try {
        const autorizationHeader = req?.headers?.authorization;
        if(!autorizationHeader) {
            return next(new Error('Unauthenticated request'));
        };
        const accessToken = autorizationHeader.split(' ')[1];
        if(!accessToken) {
            return next(new Error('Unauthenticated access token / You need to have an access token in your headers of request'));
        };
        const validResult = jwtService.validAccessToken(accessToken);
        if(!validResult) {
            return next(new Error('current access token is not equals to access token in database'));
        }
        next();
    } catch (error) {
        return next(new Error(error));
    }
}