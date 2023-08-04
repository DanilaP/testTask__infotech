import { useEffect, useRef, useState } from 'react';
import './TodoComponent.scss';
import ChangeTodoModal from '../ChangeTodoModal/ChangeTodoModal';

function TodoComponent() {

    const [arrayOfTodos, setArrayOfTodos] = useState([]);
    const [todoName, setTodoName] = useState("");
    const [todoContent, setTodoContent] = useState("");
    const [changedTodo, setChangedTodo] = useState(false);
    const [indexOfChangedElement, setIndexOfChangedElement] = useState();
    
    const addTodo = () => {
        if ((todoName && todoContent) === "") {
            return;
        }
        else {
            let newTodo = {
                name: todoName,
                content: todoContent,
                status: "Ожидает",
            }
            setArrayOfTodos([...arrayOfTodos, newTodo]);
        }
    }
    const deleteTodo = (indexOfElement) => {
        let todos = arrayOfTodos;
        setArrayOfTodos(todos.filter((el, index) => index !== indexOfElement));
    }
    const startChanging = (changedElement, index) => {
        setChangedTodo(changedElement);
        setIndexOfChangedElement(index);
    }
    const changeTodo = (newName, newContent) => {
        let newTodosArray = arrayOfTodos;
        newTodosArray[indexOfChangedElement] = {
            name: newName, 
            content: newContent, 
            status: newTodosArray[indexOfChangedElement].status,
        };
        setArrayOfTodos(newTodosArray);
        startChanging(false);
    }
    const changeStatusOfTodo = async (status, indexOfTodo) => {
        let newTodoList = arrayOfTodos.slice();
        newTodoList[indexOfTodo].status = status;
        setArrayOfTodos(newTodoList);
    }
    useEffect(() => {
        console.log(arrayOfTodos);
    }, [arrayOfTodos])
    return (
        <div className='main'>
            { (changedTodo !== false) ? <ChangeTodoModal todoObject={changedTodo} closeModal={startChanging} changeTodo = {changeTodo} /> : null }
            <div className="wrapper">
                <div className="add__todo">
                    <input onChange={(e) => setTodoName(e.target.value)} type = "text" placeholder='Наименование' />
                    <input onChange={(e) => setTodoContent(e.target.value)} type = "text" placeholder='Описание' />
                    <button onClick={addTodo}>Добавить</button>
                    <input type = "text" placeholder='Поиск по имени' />
                    <button>Поиск</button>
                </div>
                <div className="todo__main">
                    <div className="todo__names">
                        <h3>Наименования</h3>
                        <div className="todo__names__list">
                            {
                                arrayOfTodos.map((el, index) => {
                                    return (
                                        <div key={index} className='todo__name'>
                                            <div>{el.name}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="todo__content">
                        <h3>Описание</h3>
                        <div className="todo__content__list">
                            {
                                arrayOfTodos.map((el, index) => {
                                    return (
                                        <div key={index} className='content'>
                                            <div className='header'>{el.content}</div>
                                            <button onClick={() => startChanging(el, index)}>Изменить</button>
                                            <button onClick={() => deleteTodo(index)}>Удалить</button>
                                            <select className={(el.status == "Ожидает") ? null : (el.status == "В процессе") ? "active"
                                            : "done" } 
                                            onChange={(e) => changeStatusOfTodo(e.target.value, index)}>
                                                <option value={"Ожидает"}>Ожидает</option>
                                                <option value={"В процессе"}>В процессе</option>
                                                <option value={"Выполнена"}>Выполнена</option>
                                            </select>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodoComponent;
