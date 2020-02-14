const {Router} = require('express')
const router = Router()

const todos = [
    {id: 0, name: 'Some text', completed: false},
    {id: 1, name: 'Some text', completed: false},
    {id: 2, name: 'Some text', completed: false},
    {id: 3, name: 'Some text', completed: false},
    {id: 4, name: 'Some text', completed: false},
]

/*
    get
*/
router.get('/', (req, res) => {
    res.send(todos)
})
router.get('/:id', (req, res) => {
    const todoItem = todos.find(item => +item.id === +req.params.id)
    !todoItem ? res.status('404').send(`Item not found`) : null
    res.send(todoItem)
})


module.exports = router