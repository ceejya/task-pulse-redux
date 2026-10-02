import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addTodo, toggleTodo, deleteTodo } from "../../todoSlice"

const Home = () => {
    const dispatch = useDispatch()
    const [text, setText] = useState("")
    const todos = useSelector((state) => state.todos)

    const handleAddTodo = (e) => {
        if (e) e.preventDefault()
        if (text.trim()) {
            dispatch(addTodo(text.trim()))
            setText("")
        }
    }

    const completedCount = todos.filter(t => t.completed).length

    return (
        <div className="app-card">
            <header className="app-header">
                <span className="badge">Redux Toolkit</span>
                <h1 className="app-title">TaskPulse</h1>
                <p className="app-subtitle">Stay organized and get things done faster.</p>
            </header>

            <form onSubmit={handleAddTodo} className="input-group">
                <input 
                    type="text"
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    placeholder="What needs to be done?" 
                    className="todo-input"
                />
                <button type="submit" className="add-btn">
                    <span>Add Task</span>
                </button>
            </form>

            <div className="stats-bar">
                <span>Tasks completed</span>
                <span className="counter">{completedCount} / {todos.length}</span>
            </div>

            <div className="todo-list">
                {todos.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">✨</div>
                        <h3 className="empty-title">No tasks yet</h3>
                        <p className="empty-desc">Add a new task above to get started!</p>
                    </div>
                ) : (
                    todos.map((todo) => (
                        <div 
                            key={todo.id} 
                            className={`todo-item ${todo.completed ? 'completed' : ''}`}
                        >
                            <div 
                                className="todo-content"
                                onClick={() => dispatch(toggleTodo(todo.id))}
                            >
                                <div className="custom-checkbox">
                                    {todo.completed && <span className="checkmark">✓</span>}
                                </div>
                                <span className="todo-text">{todo.text}</span>
                            </div>

                            <button 
                                className="delete-btn"
                                onClick={() => dispatch(deleteTodo(todo.id))}
                                title="Delete task"
                            >
                                ✕
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Home