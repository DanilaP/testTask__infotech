import { useState } from 'react';
import './ChangeTodoModal.scss';

function ChangeTodoModal({todoObject, closeModal, changeTodo}) {

    const [newName, setNewName] = useState(todoObject.name);
    const [newContent, setNewContent] = useState(todoObject.content);

    return (
        <div className="Change__todo__modal">
            <div className="change__modal__content">
                <input  onChange={(el) => setNewName(el.target.value)} 
                        defaultValue={todoObject.name} 
                        type='text' 
                        placeholder='Наименование' 
                />
                <input  onChange={(el) => setNewContent(el.target.value)} 
                        defaultValue={todoObject.content} 
                        type='text' 
                        placeholder='Описание' 
                />
                <button onClick={() => changeTodo(newName, newContent)}>Сохранить изменения</button>
                <button onClick={() => closeModal(false, null)}>Отмена</button>
            </div>
        </div>
    );
}

export default ChangeTodoModal;
