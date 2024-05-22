import React, { useState } from 'react'
import { useTodos } from '../context/TodoContext';
import { createTodo } from '../services/todoService';
import { TextField, Button } from '@mui/material';

const TodoForm = () => {
    const [value, setValue] = useState('');
    const{ dispatch } = useTodos();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!value) return;

        const response = await createTodo({
            title: value,
            completed: false,
        });

        dispatch({type: 'ADD_TODO', payload: response.data});
        setValue('');
    }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
      <TextField
        label="New Todo"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        variant="outlined"
        fullWidth
        style={{ marginRight: '8px' }}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Todo
      </Button>
    </form>
  )
}

export default TodoForm