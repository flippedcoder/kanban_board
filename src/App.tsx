import './App.css';
import NavBar from './components/NavBar/NavBar';
import Router from './Router';

function App() {
  return (
    <div className="flex w-full">
      <NavBar />
      <Router />
    </div>
  );
}

export default App;
