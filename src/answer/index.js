let AnswerStruct = {
	status: '',
	message: '',
	data: {}
}

module.exports = class Answer // Класс логера
{
	constructor()
	{
		function generateLogFunction(level) // Функция генератор функий логгера :)
		{
			return function(message, data)
			{
				let OutMessage = AnswerStruct
				OutMessage.status = level
				OutMessage.message = message
				OutMessage.data = data
				return OutMessage
			}
		};
		// В дальнейшем здесь будет стрим к файлу
		this.OK = generateLogFunction('OK'); // Лог поведения
		this.Error = generateLogFunction('Error'); // Лог ошибок
		this.Warn = generateLogFunction('Warn'); // Лог предупреждений
	}
}