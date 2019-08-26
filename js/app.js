// Task manager
// 1. создать задачу
//      а. обработка формы
//          - проверить данные перед добавлением (валидация)
//      б. добавить задачу в массив
//      в. добавить данные в таблицу
//      г. офистить форму
// 2. удалить задачу
//      а. подтверждение
//      б. удаление данных из таблицы
//      в. удаление данных из массива 
// 3. редактировать задачу 
//      а. взять данные из массива
//      б. поместить в форму 
//      в. обработать форму на редактирование
//          - валидация
//      г. обновить данные в массиве
//      д. обновить данные в таблице
//      е. офистить форму

task = {
    id: {
        type: 'String',
        required: true
    },
    title: {
        type: 'String',
        required: true
    },
    text: {
        type: 'String',
        required: true
    }
}

;(function () {
    
    let storage = {
        todos: []
    };

    /**
     * 
     */
    function generateId() {
        const words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
        let id = '';

        for (let char of words) {
            let index = Math.floor(Math.random() * words.length);
            id += words[index];
        }

        return id;
    }

    /**
     * 
     * @param {*} title 
     * @param {*} text 
     */
    const form = document.querySelector('form[name=addTodoForm]');
    const title = document.querySelector('#title');
    const text = document.querySelector('#text');
    const table = document.querySelector('.table tbody');

    function addNewTodoToStorage(id ,title, text) {
        if (!title) return console.log('Введите заголовок задачи');
        if (!text) return console.log('Введите текст задачи');

        const newTask = {
            title,
            text, 
            id
        };

        storage.todos.push(newTask);

        addNewTodoToViev(newTask);
        
        return storage.todos;
    }

    addNewTodoToStorage(generateId(), 'My title 1', 'My text 1');
    addNewTodoToStorage(generateId(), 'My title 2', 'My text 2');
    addNewTodoToStorage(generateId(), 'My title 3', 'My text 3');
    addNewTodoToStorage(generateId(), 'My title 4', 'My text 4');

    /**
     * 
     * @param {*} id 
     */
    function deleteTodoFromStorage(id) {
        if (!id) return console.log('Передайте id задачи');

        const checkId = storage.todos.some(function(task, i) { 
            return task.id === id 
        });
        if (!checkId) return console.log('id несуществуе');

        let removedTask;

        for (let i = 0; i < storage.todos.length; i++) {
            if (storage.todos[i].id === id) {
                removedTask = storage.todos.splice(i, 1);
                break;
            }
        }
        
        return removedTask;
    }

    /**
     * 
     * @param {*} id 
     * @param {*} title 
     * @param {*} text 
     */
    function editTaskStorage(id, title, text) {
        deleteTodoFromStorage(id);
        addNewTodoToStorage(id ,title, text);
    }

    

    form.addEventListener('submit', function(event){
        event.preventDefault();

        if (!title.value || !text.value) return console.log(('Введите title и text'));
        
        addNewTodoToStorage(generateId(), title.value , text.value);


        form.reset();

    });

    function todoTemplate (task){
        return `
        <tr data-id=${task.id}>
            <td>${task.title}</td>
            <td>${task.text}</td>
            <td>
                <i class="fas fa-trash"></i>
                <i class="fas fa-edit"></i>
            </td>
        </tr>
        `;
        //closest
    };

    function addNewTodoToViev(task){
        const template = todoTemplate(task);
        table.insertAdjacentHTML('afterbegin',template);//!!!!!!!!
    };

    

    

    console.log(storage);
    console.log(table);
    console.log(todoTemplate(task));
    

})();

//получить форму
// обработчик на сабмит
// appenchild в тело таблицы



