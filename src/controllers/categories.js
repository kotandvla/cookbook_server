let app = new (require('express').Router)();
const models = require("../models");
const logger = new (require('../logger'))()
    
let TestData = [
    {
      title: 'Горячее',
      link: 'hot'
    },
    {
      title: 'Закуски',
      link: 'snacks'
    }
  ]

app.get('/api/categories', (req, res) => {
  req = TestData
  let IsAllCorrect = true
  req.forEach(CategoryData => {
    let CategoryForTest = models.Categories(CategoryData)  
    let result = categories_new.validateSync()
  });
	let categories_new = models.Categories(TestData[0])
	let result = categories_new.validateSync()
	logger.info(result)
  /*models.Post.find({}).exec().then((posts)=>{

    res.render('index',{
        user:req.user,
        posts
    });
    // Отправим рендер образа под именем index
}).catch(next);*/
    res.send(TestData)
});

app.post('/api/categories', (req, res) => {
    res.send(TestData)
});

module.exports = app;