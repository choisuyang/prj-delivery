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

  return ShopsMenu;
};
