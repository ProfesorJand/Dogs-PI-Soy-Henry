const dog = require('../imagenes/dog-serious.gif');
const logo1 = require('../imagenes/logo.png')

const array = function (){
    const array = [logo1, dog];
    const imagen = array[Math.floor(Math.random() * array.length)];
    return imagen
}

module.exports = array;