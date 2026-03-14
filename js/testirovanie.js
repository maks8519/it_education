function countMaxScore(elements){
	// Временная переменная для хранения кол-во баллов
	var tmpScore = 0;
	//Перебираем все элементы в переданном массиве
	for (var i = 0; i < elements.length; i++) {
		// Проверяем, есть ли у элемента атрибут 'data-true'
		if (elements[i].hasAttribute('data-true')) {
			// Получаем значение атрибута 'data-true', преобразуем его в число
            // и прибавляем к общей сумме
			tmpScore += parseFloat(elements[i].getAttribute('data-true'));
		}	
	}
	//Возврат результата
	return tmpScore;
}

function textAnswer(answer) {
	//Балл за ответ
	var tmpScore = 0;
	//Получаем правильный ответ из атрибута data-ans и переводим его в нижний регистр
	var correct = answer.getAttribute('data-ans').toLowerCase();
	// Сравниваем введённый пользователем ответ с правильным (оба в нижнем регистре)
	if (answer.value.toLowerCase() == correct) {
		//Если ответ совпадает, прибавляем к счёту значение из атрибута data-true
		tmpScore += parseFloat(answer.getAttribute('data-true'));
	}
	return tmpScore;
}

function radioCheckAnswer(answers) {
	//Балл за ответ
	var tmpScore = 0;
	 // Перебираем все варианты ответов данного вопроса
	for (var i = 0; i < answers.length; i++) {
		// Проверяем:
        // 1. Есть ли у ответа атрибут data-true (означает, что он правильный и начисляет баллы)
        // 2. Отмечен ли этот вариант пользователем (checked == true)
		if (answers[i].hasAttribute('data-true') && answers[i].checked) {
			tmpScore +=parseFloat(answers[i].getAttribute('data-true'));
		}
	}
	return tmpScore;
}

function counUserScore(elements){
	// Временная переменная для хранения кол-во баллов
	var userScore = 0;
	//счетчик цикла
	var i = 0;
	//имя текущего вопроса
    var queName;
    //временный массив, куда собираются все <input>-элементы, относящиеся к одному вопросу 
    var answers;
    //Цикл перебора элементов
    while (i < elements.length) {
    	//получаем значение атрибута name у текущего элемента
		queName = elements[i].getAttribute('name');
		//обнуленый массив для сохранения ответов к одному вопросу.
		answers = [];
		//пока имя текущего элемента такое же, как у предыдущего (то есть тот же вопрос)
		while (i < elements.length && elements[i].getAttribute('name') == queName){
			//собираем все варианты ответов для одного вопроса
			answers[answers.length] = elements[i];
			// Переходим к следующему варианта ответа
			i++;
		}
 
		if (answers.length>0) {
			if(answers[0].getAttribute('type') =='text'){
				userScore += textAnswer(answers[0]);
			} 
			else if (answers[0].getAttribute('type') == 'radio' ||  answers[0].getAttribute('type') == 'checkbox') {
				userScore += radioCheckAnswer(answers);
			}
		}

 	}
	
	//Возврат результата
	return userScore;

	

}

function otvetit(){
	//обращаемся к форме и заносим в переменную
	var myform = document.getElementById('testirovanie');
	//получаем все элементы input
	var elements = myform.getElementsByTagName('input');
	

	// Переменная для хранения максимального балла
    var maxScore = countMaxScore(elements);
    // Переменная для хранения баллов набранных пользователем
    var userScore = counUserScore(elements);

	//Вывод результата пользователю
	alert("Вы набрали " + userScore.toFixed(1) + " баллов" + "из максимального количества баллов " +  maxScore.toFixed(1));
	

}



