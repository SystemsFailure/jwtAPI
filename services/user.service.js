const User = require("../models/user.model");

class UserService {
    constructor() {};

    async find(userId) {
        return await User.findOne({userId: userId});
    };

    async findEmail(email) {
        return await User.findOne({email: email});
    }

    async register(_) {
        // create a new instance of user in db
        const user = await User.create({
            username: _?.username,
            email: _?.email,
            password: _?.password,
        })
        return user;
    };

    async auth(data) {
        // code
    };
}

module.exports = UserService;