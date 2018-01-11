var AnswerStruct

module.exports = class Answer // Класс логера
{
	constructor()
	{
		function generateLogFunction(level) // Функция генератор функий логгера :)
		{
			return function(message,meta)
			{
				//let d = Date.now(); // Будем потом записовать время вызова
				let mes = this.module + " -- ";
				mes += level + " -- ";
				mes += message; // прицепить сообщение
				if(meta) mes += "  " + util.inspect(meta) + " "; // Записать доп инфу (Object||Error)
				mes += '\n'; // Конец строки :)

				this.write(mes);
				// Записать во все потоки наше сообщение
			}
		};
		
		this.trace = stackTrace.get()[1]; // Получить стек вызова
		this.filename = this.trace.getFileName(); // Получить имя файла которое вызвало конструктор
		this.module = projectname + path.sep + path.relative(__dirname + "/..",this.filename); // Записать име модуля
		this.streams = [process.stdout]; // Потоки в которые мы будем записовать логи
		// В дальнейшем здесь будет стрим к файлу
		this.OK = generateLogFunction('Log'); // Лог поведения
		this.Error = generateLogFunction('Error'); // Лог ошибок
		this.Warn = generateLogFunction('Warning'); // Лог предупреждений
	}
	write(d)
	{
		this.streams.forEach((stream)=>{
			stream.write(d);
		});
	}
}