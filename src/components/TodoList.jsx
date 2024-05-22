import React,  { useState }  from 'react'
import axios from 'axios';
import { useTodos } from '../context/TodoContext'
import { deleteTodo, updateTodo } from '../services/todoService';
import { List, ListItem, ListItemText, IconButton, Checkbox, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';


const TodoList = () => {
    const { state, dispatch } = useTodos();
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState('');

    const handleToggle = async (todo) => {
        const updatedTodo = {...todo, completed: !todo.completed};
        await updateTodo(todo.id, updatedTodo);
        dispatch({type: 'UPDATE_TODO', payload: updatedTodo});
    };

    if (state.loading) {
        return <p>Loading...</p>;
    }

    const handleDelete = async (id) => {
        await deleteTodo(id);
        dispatch({type: 'REMOVE_TODO', payload: id});
    }

    const handleEdit = (id, title) => {
      setEditId(id);
      setEditTitle(title);
    };

    const handleUpdate = async (todo) => {
      try {
        const updatedTodo = {...todo, title: editTitle };
        await updateTodo(todo.id, updatedTodo);
        dispatch({type: 'UPDATE_TODO', payload: updatedTodo});
        setEditId(null);
        setEditTitle('');
      } catch (error) {
        console.error("There was an error updating the todo!", error);
      }
    };
  

  return (
    <>
    <List>
       {state.todos.map(todo => (
         <ListItem key={todo.id} dense button>
           <Checkbox
             edge="start"
             checked={todo.completed}
             tabIndex={-1}
             disableRipple
             onClick={() => handleToggle(todo)}
           />
            {editId === todo.id ? (
            <TextField
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              variant="outlined"
              size="small"
            />
          ) : (
            <ListItemText primary={todo.title} />
          )}
          {editId === todo.id ? (
            <IconButton edge="end" aria-label="save" onClick={() => handleUpdate(todo)}>
              <SaveIcon />
            </IconButton>
          ) : (
            <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(todo.id, todo.title)}>
              <EditIcon />
            </IconButton>
          )}
          <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(todo.id)}>
             <DeleteIcon />
           </IconButton>
         </ListItem>
       ))}
     </List>
    </>
  )
}

export default TodoList