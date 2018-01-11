module.exports = function(app, db) {    
	app.get('/api/recipe/:id', (req, res) => {
		console.log(req.params.id);
    res.send(
      {
        CategoryID: 2,
        name: 'Макароны по флотски',
        short_comemnt: 'Блюдо на все случаи жизни',
        ingredients: [
          { name: 'Макароны', count: '100 г.' },
          { name: 'Фарш', count: '100 г.' }
        ],
        annotation: 'Данное блюдо спасало меня не раз и не два.',
        steps: 'Этап первый. Варим Макароны. Этап второй. Готовим фарш.'
      }
    )
  });
};