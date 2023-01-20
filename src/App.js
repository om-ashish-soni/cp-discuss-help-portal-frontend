// import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './login';
import HomePage from './home';
import NavBar from './header';
import CreateArticle from './createArticle';
function App() {
  return (
    <>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <NavBar/>
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<HomePage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/createArticle" element={<CreateArticle />} />

      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
