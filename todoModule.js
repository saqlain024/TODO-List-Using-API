 var TodoListApp = ( function() {

    let tasks = [];
    const tasksList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');
    
     var a =10;   // for testing
    
    // async function fetchTodos () {
    //     // GET request
    // //  fetch('https://jsonplaceholder.typicode.com/todos')  //return a promise
    // //     .then(function(response) {
    // //         // console.log(response);              //chaining 
    // //         return response.json();             //this (json) also return promise
    // //     }).then(function (data) {
    // //         // console.log(data);
    // //         tasks = data.slice(0,10);
    // //         renderList();
    // //     })
    // //     .catch( function (error) {
    // //         console.log('error', error);
    // //     })
    
    //       // doing same thing using async and await 
    //       try {
    
    //         const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    //         const data = await response.json();
    //         tasks =  data.slice(0,10);
    //         renderList();
    
    //       } catch (error) {
    //         console.log(error)
    //       }
        
    
    // }
    
    function addTasktoDOM (task) {
        const li = document.createElement('li');
    
        li.innerHTML = `
            <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
            <label for="${task.id}">${task.title}</label>
            <img src="delete-trash.svg" class="delete" data-id="${task.id}" />
        `;
    
        tasksList.append(li);
    
    }
    
    function renderList () {
        tasksList.innerHTML = '';
    
        for (let i = 0; i < tasks.length; i++) {
            addTasktoDOM(tasks[i]);
        }
    
        tasksCounter.innerHTML = tasks.length; 
    }
    
    function toggletask (taskId) { 
        const task = tasks.filter( function (task) {
            return task.id === Number(taskId);   //===
        })
    
        if (task.length > 0 ) {
            const currentTask = task[0];
    
            currentTask.completed = !currentTask.completed; //
            renderList();
            showNotification('task toggle successfully');
            return;
        }
    
        showNotification('could not toggle the task');
    
    }
    
    function deleteTask (taskId) {
        const newTasks = tasks.filter( function (task) {
            return task.id !== Number(taskId);   //!==
        })
    
        tasks = newTasks;
        renderList();
        showNotification('task deleted successfully');
    }
    
    function addTask (task) {
        
        if (task) {
            // fetch('https://jsonplaceholder.typicode.com/todos', {
            //     method: POST,
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(task),
    
            // }).then(function(response) {
            //     // console.log(response);              //chaining 
            //     return response.json();             //this (json) also return promise
            // }).then(function (data) {
            //     // tasks = data.slice(0,10);
            //     renderList();
            //     tasks.push(task);
            //     renderList();    
            //     showNotification('Task added successfully'); 
            // })
            // .catch( function (error) {
            //     console.log('error', error);
            // })
    
            tasks.push(task);
            renderList();    
            showNotification('Task added successfully');
            return;
        }
    
        showNotification('Task can not be added');
    }
    
    function showNotification(text) {
        alert(text);
    }
    
    function handleInputKeypress(e) {
        if (e.key == 'Enter') {
            const text = e.target.value;
            console.log('text', text);  //comment
    
            if (!text) {
                showNotification('Task text can not be reply');
                return;
            }
    
            const task = { 
                title: text,              // this is same as this line ->  text : text
                // id: Date.now().toString(),
                id: Date.now(), 
                done: false
            }
    
            e.target.value = '';  // making input box empty again
            addTask(task);      // function calling to add task
        }
    
    }
    
    
    function handleClickListener (e) {
        const target = e.target;
        // console.log(target);
    
        if ( target.className === 'delete') {
            const taskId = target.dataset.id;
            deleteTask(taskId);
            return; 
        }
        else if (target.className === 'custom-checkbox') { // ===
            const taskId = target.id;           //  notice this -> not  - target.dataset.id;
            toggletask(taskId);
            return;
        }  
    
    }
    
    function initializeApp () {
        // fetchTodos();
        addTaskInput.addEventListener('keyup',handleInputKeypress);
        document.addEventListener('click', handleClickListener)    
    }
    
    // initializeApp();
    
    return  {                    //revealing modularization
        initialize: initializeApp,
        a: a  
    };

})();


// var todoListApp = (function () {
//     return {}         //return this object
// })();
