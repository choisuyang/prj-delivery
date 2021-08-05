module.exports = (sequelize, DataTypes) => {
  const ShopsMenu = sequelize.define(
    "ShopsMenu",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, commnet: "메뉴명" },
      price: { type: DataTypes.INTEGER, commnet: "가격" },
    },
    {
      tableName: "ShopsMenu",
    }
  );

  ShopsMenu.associate = (models) => {
    ShopsMenu.belongsToMany(models.Checkout, {
      through: {
        model: "CheckoutMenu",
        unique: false,
      },
      as: "Checkout",
      foreignKey: "menu_id",
      sourceKey: "id",
      constraints: "false",
    });
  };

  return ShopsMenu;
};
