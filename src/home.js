import { LoginContext, UserContext } from './App';
import {useContext,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleList from './ArticleList';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';


function HomePage() {
    const navigate=useNavigate();
    const {isLoggedIn} = useContext(LoginContext);
    const {userId,userName}=useContext(UserContext);
    const [articles,setArticles]=useState([]);
    const [loading, setLoading] = useState(true);
    const [tags,setTags]=useState([]);
    const fetchTags=()=>{
      setLoading(true);
      fetch(`/tags`,{
        method: 'Get',
            headers: {
                'Content-Type': 'application/json',
            }
      }).then(response=>response.json().then(
        response=>{
          if (response.error) {
            throw response.error;
        } else {
          setLoading(false);
          const responseTags=response;
          if(responseTags==null){
            throw "could not fetch tags";
          }else{
            const tagNames=[]
            for(let tag of responseTags){
              tagNames.push(tag.tagName);
            }
            // console.log(tagNames)
            setTags(tagNames);
          }
          
        }
        })
      ).catch(error => {
        setLoading(false);
        console.log("error : ", error);
    })
    }
    const fetchArticles=()=>{
      setLoading(true);
      fetch(`/articles`,{
        method: 'Get',
            headers: {
                'Content-Type': 'application/json',
            }
      }).then(response=>response.json().then(
        response=>{
          if (response.error) {
            throw response.error;
        } else {
          setLoading(false);
            setArticles(response.articles);
            console.log(response.articles.length);
        }
        })
      ).catch(error => {
        setLoading(false);
        console.log("error : ", error);
    })
    }
    useEffect(() => {
      fetchTags();
      fetchArticles();
    }, [])
   
    return (
      <Container>
      {loading ? (
          <Spinner animation="border" role="status" className="d-flex justify-content-center my-5">
              <span className="sr-only"></span>
          </Spinner>
      ) : (
          <Container className="mt-5">
          <ArticleList articles={articles} />
          </Container>
      )}


  </Container>
        // <NavBar username="abc"/>
    )
}
export default HomePage;

// import { LoginContext, UserContext } from './App';
// import {useContext,useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
// function HomePage() {
//     const navigate=useNavigate();
//     const {isLoggedIn} = useContext(LoginContext);
//     const {userId,userName}=useContext(UserContext);
//     useEffect(() => {
//       navigate('/search-article');
//     }, [])
    
//     return (
//         <>
//         {isLoggedIn}<br/>
//         {userId}<br/>
//         {userName}<br/>
//         {isLoggedIn ? "LoggedIn":"Not Logged In"}
//         <h1> this is home page</h1>
//         </>
//         // <NavBar username="abc"/>
//     )
// }
// export default HomePage;