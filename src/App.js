import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './login';
import HomePage from './home';
import NavBar from './header';
import CreateArticle from './createArticle';
import SignUp from './signUp';
import Article from './Article';
import SearchArticle from './SearchArticle';
import TagSearch from './TagSearch';
import Profile from './Profile';
import Articles from './Articles';

export const LoginContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {}
});

export const UserContext = createContext({
  userId:null,
  setUserId: () => {},
  userName:null,
  setUserName: () => {}
});

function App() {
  const [userId,setUserId]=useState(null);
  const [userName,setUserName]=useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
    <UserContext.Provider value={{userId,userName,setUserId,setUserName}}>
      <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <NavBar />
        
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/articles" element={<Articles/>} />

            <Route exact path="/create-article" element={<CreateArticle />} />
            <Route exact path="/search-article" element={<SearchArticle />} />
            <Route exact path="/article/tag/:tagName" element={<TagSearch />} />
            <Route exact path="/article/:articleName" element={<Article />} />
            <Route exact path="/profile/:profileName" element={<Profile />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Routes>
        
      </LoginContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
