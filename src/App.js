import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Container, Typography } from '@mui/material';

function App() {
  return (
    <div className='App'>
      <Container maxWidth="sm" style={{ marginTop: '32px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Todo List
        </Typography>
        <TodoForm />
        <TodoList />
      </Container>    
    </div>
  );
}

export default App;
