const addTodo = document.querySelector('.write-area')
const todoList = document.querySelector('.items')
const finished = document.querySelector('#finished')
const progressBar = document.querySelector('.progress-bar')

//scroll to bottom when add new items
function scrollBot() {
    todoList.scrollTop = todoList.scrollHeight;
}

//for all items
let todo;

//for crossed items
let checked;

function getLocalStorage() {
    return localStorage.getItem('todo-list') ? JSON.parse(localStorage.getItem('todo-list')) : [];
}

function getCheckedItems() {
    return localStorage.getItem('crossed') ? JSON.parse(localStorage.getItem('crossed')) : [];
}

//display items already in local storage 
function displayList() {
    todo = getLocalStorage();
    checked = getCheckedItems();

    if (todo.length > 0) {
        for (let i = 0; i <= todo.length - 1; i++) {
            createItems(todo[i].id, todo[i].value)
        }

        const check = document.querySelectorAll('.check');
        const todoContent = document.querySelectorAll('.todo-content');

        for (let i = 0; i <= todo.length - 1; i++) {
            if (checked.length > 0 && checked.includes(todo[i].id)) {
                check[i].classList.add('done')
                todoContent[i].classList.add('done')
            }
        }

    }

    progress()

}

displayList()


//add items once hit enter 
addTodo.addEventListener('keyup', e => {
    if (e.key == 'Enter' && addTodo.value) {
        e.preventDefault();
        const value = addTodo.value;

        const id = Date.now().toString();

        createItems(id, value);

        const thingTodo = { id, value };

        todo = getLocalStorage()
        todo.push(thingTodo)
        localStorage.setItem('todo-list', JSON.stringify(todo))

        addTodo.value = '';

        progress()
        scrollBot()

    }

})

//create new items
function createItems(id, value) {
    let newItem = document.createElement('div');
    newItem.classList.add('single-item');
    newItem.setAttribute('id', id);
    newItem.innerHTML =
        `<div class="check"><i class="fas fa-check"></i></div>
                            
        <input type="text" value='${value}' class='todo-content'>

        <div class="trash"><i class="fas fa-trash-alt"></i></div>`
    todoList.appendChild(newItem)

    //to delete
    const trash = newItem.querySelector('.trash')
    trash.addEventListener('click', () => {
        todoList.removeChild(newItem);
        deleteFromStorage(id)
        checkedItems()
    })

    //to cross out items

    const check = newItem.querySelector('.check')
    const todoContent = newItem.querySelector('.todo-content')
    let oldValue = todoContent.value;

    check.addEventListener('click', () => {
        check.classList.toggle('done');
        todoContent.classList.toggle('done');
        checkedItems()
    })

    todoContent.addEventListener('change', () => {
        let newValue = todoContent.value;
        if (newValue && newValue !== oldValue) {
            todo = getLocalStorage();
            for (let i = 0; i <= todo.length - 1; i++) {
                if (todo[i].id == id) {
                    todo[i].value = newValue;
                }
            }
            localStorage.setItem('todo-list', JSON.stringify(todo))
            oldValue = newValue;
        }
    })


}

//delete items from local storage
function deleteFromStorage(id) {

    todo = getLocalStorage();
    for (let i = 0; i <= todo.length - 1; i++) {
        if (todo[i].id == id) {
            todo.splice(i, 1);
        }
    }
    localStorage.setItem('todo-list', JSON.stringify(todo))

    progress()

}

//save crossed items to local storage 
function checkedItems() {
    checked = [];
    const check = document.querySelectorAll('.check');

    if (check.length > 0) {
        for (let i = 0; i <= check.length - 1; i++) {

            if (check[i].classList.contains('done')) {
                let checkedId = check[i].parentElement.getAttribute('id')
                checked.push(checkedId)
            }

            localStorage.setItem('crossed', JSON.stringify(checked));
        }
    } else {
        localStorage.setItem('crossed', JSON.stringify(checked));
    }

    progress()

}

//progress bar 
function progress() {
    todo = getLocalStorage();
    checked = getCheckedItems();


    if (todo.length > 0 && checked.length > 0) {
        let percent = Math.round((checked.length / todo.length) * 100);
        finished.innerHTML = `${percent}%`;
        progressBar.style.width = `${percent}%`;
    } else {
        finished.innerHTML = '0%';
        progressBar.style.width = '0%';
    }
}