const { Model, DataTypes } = require('sequelize');

class Category extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            icon: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.Service, { foreignKey: 'category_id', as: 'categories'})
    }
}

module.exports = Category;