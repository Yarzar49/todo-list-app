import { createContext, useContext, useEffect, useReducer } from "react";
import axios from 'axios';

const TodoContext = createContext();

const initialState = {
    todos: [],
    loading: true,
};

const reducer = (state, action) => {
    
    switch(action.type) {
        case 'SET_TODOS':
            return {...state, todos: action.payload, loading: false};
        case 'ADD_TODO':
            return {...state, todos: [...state.todos, action.payload]};
        case 'REMOVE_TODO':
            return {...state, todos: state.todos.filter(todo => todo.id !== action.payload)};
        case 'UPDATE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo => 
                    todo.id === action.payload.id ? action.payload : todo
                ),
            };
        default:
            return state;
    }
}

export const TodoProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        axios.get('http://localhost:4000/todos')
            .then(response => {
                dispatch({type: 'SET_TODOS', payload: response.data});
            });
    }, []);

    return (
        <TodoContext.Provider value={{ state, dispatch }}>
            {children}
        </TodoContext.Provider>
    )

};

export const useTodos = () => {
    const context = useContext(TodoContext);

    if (!context) {
        throw new Error('useTodos must be used within a TodoProvider');
    }

    return context;
    
}

