import connection from './index.js';
import { DataTypes } from 'sequelize';

const bookModel = connection.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    }, 
    name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    author: {
        type: DataTypes.STRING,
        allowNull:false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull:false
    },
    description: {
        type: DataTypes.TEXT
    },
    image: {
        type: DataTypes.STRING
    }
}, 
{
    timestamps:false
})

export default bookModel;