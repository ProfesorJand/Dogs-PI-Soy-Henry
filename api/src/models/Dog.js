const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    //id se crea automatico
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
      // set(value){
      //   let i = 203;
        
      //   this.setDataValue('id', value + i )  // no me funciona
      // }
    },
    name: { //Name *
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    height: { // Altura *
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: { // Peso *
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span: { // Años de Vida
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, { initialAutoIncrement: 200});
};
