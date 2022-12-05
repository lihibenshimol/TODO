const STORAGE_KEY = 'todosDB'
var gTodos
var gFilterBy = 'all'

_createTodos()

function getTodosForDisplay() {
    if (gFilterBy === 'most-recent') return gTodos.sort((a,b) => b.createdAt - a.createdAt)
    if (gFilterBy === 'txt') return gTodos.sort((txt1,txt2) => txt1.txt.localeCompare(txt2.txt))
    if (gFilterBy === 'importance') return gTodos.sort((a,b) => a.importance - b.importance)
    if (gFilterBy === 'all') return gTodos

    return gTodos.filter(todo =>
        todo.isDone && gFilterBy === 'done' ||
        !todo.isDone && gFilterBy === 'active')
}




function addTodo(txt, importance) {
    if (!txt) return
    const todo = _createTodo(txt, importance)
    gTodos.unshift(todo)
    saveToStorage(STORAGE_KEY, gTodos)

}

function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    saveToStorage(STORAGE_KEY, gTodos)

}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    saveToStorage(STORAGE_KEY, gTodos)

}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function getTotalTodos() {
    return gTodos.length
}

function getActiveTodos() {
    return gTodos.filter(todo => !todo.isDone).length
}

function getDoneTodos() {
    return gTodos.filter(todo => todo.isDone).length
}

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)
    if (!gTodos || !gTodos.length) {
        gTodos = [
            _createTodo('Learn HTML'),
            _createTodo('Study CSS'),
            _createTodo('Master JS'),
        ]
        saveToStorage(STORAGE_KEY, gTodos)
    }
}

function _createTodo(txt, importance) {
    return {
        id: _makeId(),
        txt,
        isDone: false,
        createdAt: _getCurrentTimestamp(),
        importance
    }

}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _getCurrentTimestamp() {
    return Date.now()
    // var date = new Date()
    // var hour = date.getHours()
    // var minute = date.getMinutes()
    // var str = `Created at ${hour}:${minute}`
    // return str
}