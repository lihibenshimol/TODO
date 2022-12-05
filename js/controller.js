
function onInit() {
    renderTodos()
}

function renderTodos() {

    const todos = getTodosForDisplay()
    const strHTMLs = todos.map(todo => `
    <li class="${(todo.isDone) ? "done" : ""}"
         onclick="onToggleTodo('${todo.id}')">
         ${todo.txt}
        <button onclick="onRemoveTodo(event,'${todo.id}')">x</button> 
    </li>` )

    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')
    document.querySelector('.total-todos').innerText = (getTotalTodos()) ? getTotalTodos() : `No TODOs`
    document.querySelector('.active-todos').innerText = (getActiveTodos()) ? getActiveTodos() : `No Active TODOs`
    document.querySelector('.done-todos').innerText = (getDoneTodos()) ? getDoneTodos() : `No Done TODOs`
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('input[name="todo-txt"]')
    const txt = elTxt.value
    const elImportance = document.querySelector('input[name="importance"]')
    const importance = elImportance.value
    // console.log('txt', txt)
    addTodo(txt, importance)
    elTxt.value = ''
    renderTodos()
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    if (confirm('Are you sure?')) {
        removeTodo(todoId)
        renderTodos()
    } return
}

function onToggleTodo(todoId) {
    // console.log('Toggling', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onSetFilter(filterBy) {
    // console.log('filterBy', filterBy)
    setFilter(filterBy)
    renderTodos()
}

function onSort(sortBy) {
    setFilter(sortBy)
    renderTodos()
}

