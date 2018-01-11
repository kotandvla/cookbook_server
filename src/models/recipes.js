// Загрузим mongoose т.к. нам требуется несколько классов или типов для нашей модели
const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');
var logger = new (require('../logger'))()

let RecipesSchema = new mongoose.Schema({
	categoryID:{
		type: Number,
		required:[true,"titleRequired"]
	},
	Name: {
		type:String,
		required:[true,"titleRequired"],
	},
	ShortComment: {
		type:String
	},
	Ingredients: [{
		name:String,
		count:String
	}],
	Annotation:{
		type:String
	},
	Steps: {
		type:String
	}
});

// Компилируем и Экспортируем модель
module.exports = mongoose.model('Recipes', RecipesSchema);