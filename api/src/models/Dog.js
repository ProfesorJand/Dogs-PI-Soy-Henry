const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    //id se crea automatico
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      set(value){
        this.setDataValue("id", value + 200)
      }
    },
    name: { //Name *
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: { // Altura *
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    weight: { // Peso *
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    years_of_life: { // Años de Vida
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
};
