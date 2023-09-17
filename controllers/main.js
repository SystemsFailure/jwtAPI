const JwtService = require('../services/jwt.service');
const RedisService = require('../services/redis.service');
const UserService = require('../services/user.service');
const bcrypt = require('bcrypt');

class UserController {
    constructor() {};

    async regis(req, res) {
        const { user_data } = req?.body;

        const redisService = new RedisService();
        const userService =  new UserService();
        const jwtService = new JwtService();

        if(await userService.findEmail(user_data?.email)) throw new Error('User with email ' + user_data.email + ' already exists');

        const cPassword = await bcrypt.hash(user_data?.password, 3);
        user_data.password = cPassword;

        const user_instanceof = await userService.register(user_data);
        if(!user_instanceof) throw new Error('user not registered');

        const { AccessToken, RefreshToken } = jwtService.generatePairToken({email: user_data?.email, username: user_data?.username});

        await redisService.setToken(user_instanceof.id+'-access-token', AccessToken);
        await redisService.setToken(user_instanceof.id+'-refresh-token', RefreshToken);
        const access_token = await redisService.getToken(user_instanceof.id+'-access-token');
        const refresh_token = await redisService.getToken(user_instanceof.id+'-refresh-token');

        const token_instanceof = await jwtService.createToken(AccessToken, RefreshToken, user_instanceof.id);
        res.cookie('refresh-token', refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        res.send({user: user_instanceof, token: token_instanceof, redisAccessToken: access_token, redisRefreshToken: refresh_token});
    };

    async refreshToken(req, res) {
        const {userId, email, username} = req?.body;
        const userService =  new UserService();
        const jwtService = new JwtService();
        if(userId && req?.body) {

            const user = await userService.find(userId);
            if(!user) res.send('No such user');

            const tokens = jwtService.generatePairToken({email: email, username: username});
            try {
                const result = await jwtService.saveRefreshToken(userId, tokens.RefreshToken);
                if(result === null) {
                    res.send({'error': 'Invalid refresh token', 'message': 'So refresh token not exists'});
                } else {
                    res.send({result: result});
                }
            } catch (error) {
                throw new Error(error);                
            }
        }
    };

    async login(req, res) {

    };

    async logout(req, res) {
        
    };


}

module.exports = UserController;