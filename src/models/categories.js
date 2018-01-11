// Загрузим mongoose т.к. нам требуется несколько классов или типов для нашей модели
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');


let CategoriesSchema = new mongoose.Schema({
    title:{
        type:String, // тип: String
        required:[true,"titleRequired"],
        // Данное поле обязательно. Если его нет вывести ошибку с текстом titleRequired
        unique:true // Оно должно быть уникальным
    },
    link:{
        type:String,
        required:[true,"EngNameRequired"]
    },
});
CategoriesSchema.plugin(autoIncrement.plugin, 'Categories');

// Компилируем и Экспортируем модель
module.exports = mongoose.model('Categories', CategoriesSchema);