import axios from 'axios';

const API_URL = 'http://localhost:4000/todos';

export const fetchTodos = () => axios.get(`${API_URL}?_limit=10`);
export const createTodo = (todo) => axios.post(API_URL, todo);
export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);
export const updateTodo = (id, todo) => axios.put(`${API_URL}/${id}`, todo);
// export const editTodoTitle = (id, editTitle) => axios.put(`${API_URL}/${id}`, editTitle);