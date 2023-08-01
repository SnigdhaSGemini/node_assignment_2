import './App.css';
import User from './Components/User/user';
import View from './Components/View/view';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    // Application Routes
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={User}/>
        <Route exact path="/users/create" Component={User}/>
        <Route path="/users/create/:_id" Component={User} />
        <Route exact path="/users/view" Component={View}/>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
