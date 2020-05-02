module.exports = function (sequelize, DataTypes) {
    var Foods = sequelize.define("Foods", {
        name: { type: DataTypes.STRING, allowNull: false },
        quantity: { type: DataTypes.STRING, allowNull: false },
        date_start: { type: DataTypes.DATE, allowNull: false },
        date_expire: { type: DataTypes.DATE, allowNull: false },
        fridge_bool: { type: DataTypes.BOOLEAN, allowNull: false}
    });

    Foods.associate = function(models){
        Foods.belongsTo(models.Users,{
            foreignKey: {
                allowNull: false
            }  
        })
    }

    return Foods;
};
