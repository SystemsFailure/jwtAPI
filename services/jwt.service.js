const jsonwebtoken = require("jsonwebtoken");
const dotenv = require('dotenv');
const Token = require("../models/token.model");

// DATA BASE = Redis(Запуск происходит с помощью docker)

class JwtService {
    constructor() {};

    generatePairToken(pauload) {
        const AccessToken = jsonwebtoken.sign(pauload, dotenv?.config()?.parsed?.JWT_ACCESS_KEY || 'secret key', {expiresIn: '30m'});
        const RefreshToken = jsonwebtoken.sign(pauload, dotenv?.config()?.parsed?.JWT_REFRESH_KEY || 'secret key', {expiresIn: '30d'});

        return {
            AccessToken, RefreshToken
        }
    };

    async getToken(userId) {
        return await Token.findOne({userId: userId});
    };

    async saveRefreshToken(userId, refreshToken) {
        const token = await this.getToken(userId);
        if(!token) {
            return null;
        }
        token.set({
            RefreshToken: refreshToken
        })
        try {
            await token?.save();
            return 'success refresh token'
        } catch (error) {
            throw new Error(error);
        }
    };

    async saveSomeToken(userId, tokenkey, tokenvalue) {
        const token = await this.getToken(userId);
        if(!token) throw new Error(`Token ${userId} does not exist`);
        token.set({
            [tokenkey] : tokenvalue
        })
        try {
            await token?.save();
        } catch (error) {
            throw new Error(error);
        }
    };

    async updateTokens(userId, accessToken, refreshToken) {
        const token = await this.getToken(userId);
        if(!token) {
            throw new Error('Couldn\'t find token with id: ' + userId);
        };
        token.RefreshToken = refreshToken;
        token.AccessToken = accessToken;
        try {
            await token.save();
        } catch (error) {
            throw new Error(error);
        }
    };

    async createToken(accessToken, refreshToken, userId) {
        try {
            const savedToken = await Token.create({
                userId: userId,
                AccessToken: accessToken,
                RefreshToken: refreshToken
            });
            return savedToken;
        } catch (err) {
            throw new Error(err);
        }
    };

    async validAccessToken(token) {
        try {
            const result = jsonwebtoken.verify(token, dotenv?.config('JWT_ACCESS_KEY')?.parsed?.JWT_ACCESS_KEY);
            return result;
        } catch (error) {
            return null;
        }
    }
}

module.exports = JwtService;