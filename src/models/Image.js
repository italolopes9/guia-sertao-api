const { Model, DataTypes } = require('sequelize');

class Image extends Model {
    static init(sequelize) {
        super.init({
            url: DataTypes.STRING
        }, {
            sequelize
        })
    }

    static associate(models) {
      this.belongsTo(models.Service, { foreignKey: 'service_id', as: 'services' });
    }
    
}

module.exports = Image;