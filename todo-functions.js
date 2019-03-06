const deleteTodo = function (id) {
    const index = todos.findIndex(function (todo) {
        return todo.id === id
    })
    if (index > -1) {
        todos.splice(index, 1)
    }
}


const toggleTodo = function (id) {
    const todo = todos.find(function (todo) {
        return todo.id === id
    })
    if (todo !== undefined) {
        todo.completed = !todo.completed
    }
}
const renderTodos = function (todos, filters) {
    let filteredTodos = todos.filter(function (todo) {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        
    })

    filteredTodos = filteredTodos.filter(function (todo) {
        return !filters.hideCompleted || !todo.completed
    })

    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''
    
    const summary = document.createElement('h2')
    
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    document.querySelector('#todos').appendChild(summary)
    
    filteredTodos.forEach(function (todo) {

        //setting up the container-div
        let position = document.createElement('div')
        document.querySelector('#todos').appendChild(position)

        //setting up the checkbox
        let checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        checkbox.checked = todo.completed
        position.appendChild(checkbox)
        checkbox.addEventListener('change', function () {
            toggleTodo(todo.id)
            addNewTodo(todos)
            renderTodos(todos, filters)
        })

        //setting up the todo-text
        const p = document.createElement('span')
        p.textContent = todo.text
        position.appendChild(p)

        //setting up the Delete button
        const button = document.createElement('button')
        button.textContent = 'Delete'
        position.appendChild(button)
        //remove todo
        button.addEventListener('click', function () {
            const comment = document.createElement('h2')
            comment.textContent = `You have deleted (${todo.text})`
            document.querySelector('body').appendChild(comment)
            deleteTodo(todo.id)
            addNewTodo(todos)
            renderTodos(todos, filters)
           
        })
    })
}

//search bar
const searchInput = function () {
    document.querySelector('#search-text').addEventListener('input', function (e) {
        filters.searchText = e.target.value
        renderTodos(todos, filters)
    })
}


// check box
const hideCompleted = function () {
    document.querySelector('#hide-completed').addEventListener('change', function (e) {
        filters.hideCompleted = e.target.checked
        renderTodos(todos, filters)
    })
}

const sortByCompleted = function () {
    
todos.sort(function (a, b) {
    if (a.completed === false && b.completed === true) {
        return -1
    } else if (b.completed === false && a.completed === true) {
        return 1
    } else {
        return 0
    }
})
}

const addNewTodo = function () {
    document.querySelector('#new-todo').addEventListener('submit', function (e) {
        e.preventDefault()
        todos.push({
            id: uuidv4(),
            text: e.target.elements.text.value,
            completed: false
        })
    
        localStorage.setItem('todos', JSON.stringify(todos))
    
        renderTodos(todos, filters)
        e.target.elements.text.value = ''
    })
}