const { Sequelize } = require('sequelize');

class DataBaseService {
    constructor() {
        this.sequelize;
    };

    init() {
        this.sequelize = 
        new Sequelize(
            'jwtBinding_db',
            'postgres',
            '31415',
            {host: 'localhost', dialect: 'postgres'}
        );
        return this.sequelize;
    }

    connect() {
        this.sequelize.authenticate();
    };
}

module.exports = DataBaseService;