const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            avatar: DataTypes.STRING,
            role: DataTypes.STRING
        }, {
            sequelize
        })
    }
    static associate(models) {
        this.hasMany(models.Service, { foreignKey: 'user_id', as: 'services' });
    }
}

module.exports = User;