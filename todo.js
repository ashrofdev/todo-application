let todos = []

sortByCompleted()

const filters = {
    searchText: '',
    hideCompleted: false
}


renderTodos(todos, filters)

searchInput()

const tJSON = localStorage.getItem('todos')
if (tJSON !== null) {
    todos = JSON.parse(tJSON)
} 

hideCompleted()

addNewTodo()
