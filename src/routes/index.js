let app = new (require('express'))();
let Categories = new require('./categories')
let Recipes = new require('./recipes')

app.route("/api/categories")
    .get(Categories.GetCategories)
    .post(Categories.SyncCategories)

app.use(require('./recipes'))

module.exports = app;