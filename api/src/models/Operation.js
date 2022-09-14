const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("operation", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // para poder generar id nuevos uuidv4( que no choquen con los ID de la api)
    },
    concept: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    // type: {
    //   type: DataTypes.ENUM(),
    //   allowNull: false,
    // },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};
