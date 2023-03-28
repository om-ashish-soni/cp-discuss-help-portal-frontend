// import { LoginContext, UserContext } from './App';
// import {useContext,useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
// import ArticleList from './ArticleList';
// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';


// function HomePage() {
//     const navigate=useNavigate();
//     const {isLoggedIn} = useContext(LoginContext);
//     const {userId,userName}=useContext(UserContext);
//     const [articles,setArticles]=useState([]);
//     const [loading, setLoading] = useState(true);
//     const [tags,setTags]=useState([]);
//     const fetchTags=()=>{
//       setLoading(true);
//       fetch(`/tags`,{
//         method: 'Get',
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//       }).then(response=>response.json().then(
//         response=>{
//           if (response.error) {
//             throw response.error;
//         } else {
//           setLoading(false);
//           const responseTags=response;
//           if(responseTags==null){
//             throw "could not fetch tags";
//           }else{
//             const tagNames=[]
//             for(let tag of responseTags){
//               tagNames.push(tag.tagName);
//             }
//             // console.log(tagNames)
//             setTags(tagNames);
//           }
          
//         }
//         })
//       ).catch(error => {
//         setLoading(false);
//         console.log("error : ", error);
//     })
//     }
//     const fetchArticles=()=>{
//       setLoading(true);
//       fetch(`/articles`,{
//         method: 'Get',
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//       }).then(response=>response.json().then(
//         response=>{
//           if (response.error) {
//             throw response.error;
//         } else {
//           setLoading(false);
//             setArticles(response.articles);
//             console.log(response.articles.length);
//         }
//         })
//       ).catch(error => {
//         setLoading(false);
//         console.log("error : ", error);
//     })
//     }
//     useEffect(() => {
//       fetchTags();
//       fetchArticles();
//     }, [])
   
//     return (
//       <Container>
//       {loading ? (
//           <Spinner animation="border" role="status" className="d-flex justify-content-center my-5">
//               <span className="sr-only"></span>
//           </Spinner>
//       ) : (
//           <Container className="mt-5">
//           <ArticleList articles={articles} />
//           </Container>
//       )}


//   </Container>
//         // <NavBar username="abc"/>
//     )
// }
// export default HomePage;

// // import { LoginContext, UserContext } from './App';
// // import {useContext,useEffect} from 'react';
// // import { useNavigate } from 'react-router-dom';
// // function HomePage() {
// //     const navigate=useNavigate();
// //     const {isLoggedIn} = useContext(LoginContext);
// //     const {userId,userName}=useContext(UserContext);
// //     useEffect(() => {
// //       navigate('/search-article');
// //     }, [])
    
// //     return (
// //         <>
// //         {isLoggedIn}<br/>
// //         {userId}<br/>
// //         {userName}<br/>
// //         {isLoggedIn ? "LoggedIn":"Not Logged In"}
// //         <h1> this is home page</h1>
// //         </>
// //         // <NavBar username="abc"/>
// //     )
// // }
// // export default HomePage;

import { LoginContext, UserContext } from './App';
import {useContext,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleList from './ArticleList';
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Header.css';
import Grid from '@mui/material/Grid';

import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
// import ReactPaginate from 'react-paginate';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


function HomePage() {
    const navigate=useNavigate();
    const {isLoggedIn} = useContext(LoginContext);
    const {userId,userName}=useContext(UserContext);
    const [articles,setArticles]=useState([]);
    const [tags,setTags]=useState([
      {
        'tagName':'dp',
        'tagUrl':'data:image/jpeg;base64,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'
      },
      {
        'tagName':'python',
        'tagUrl':'data:image/jpeg;base64,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'
      },
      {
        'tagName':'graph',
        'tagUrl':'data:image/jpeg;base64,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'
      },
      {
        'tagName':'dsa',
        'tagUrl':'data:image/jpeg;base64,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'
      },
      {
        'tagName':'data structures',
        'tagUrl':'data:image/jpeg;base64,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'
      },
    ]);
    const imageUrls=[
      'https://prod-discovery.edx-cdn.org/media/course/image/b8c19739-f97b-4ef1-8943-feeaaf186bf3-cb2f5dadbd2b.small.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKipuGOAxlcyAs5IlRNf0e5J6W7umcLsVjNQ&usqp=CAU',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfelEzS6kBkgH8J-GJ_W3acQXAfBAgH9efqA&usqp=CAU',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmckUP69ryZ3f4sJi9t1yeD_jysVVE2C77BDZ3f-46j3nZb3lHMfyXMd7IG27KdEO0M1Q&usqp=CAU',
      'https://www.simplilearn.com/ice9/free_resources_article_thumb/deep_learning_interview_questions.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHRgsruUXoOpQzkrmlQ8_hrGzzNxe0WaVAkg&usqp=CAU',
      'https://www.freecodecamp.org/news/content/images/2021/06/1_s6hhrgR5_tXpO_j7uKaHMw-1.png',
      'https://community.nasscom.in/sites/default/files/styles/960_x_600/public/media/images/Screen%20Shot%202022-10-11%20at%204.12.16%20PM.png?itok=CzJnj-br'
    ]
    const colors = ['#FFC0CB', '#FFA07A', '#F0E68C', '#ADD8E6', '#90EE90', '#B0E0E6', '#DA70D6']; // pre-defined set of colors
  
    const [color, setColor] = useState('#FFFFFF'); // initialize with white color

    const getRandomColor=()=>{
      const randomIndex = Math.floor(Math.random() * colors.length);
      const randomColor = colors[randomIndex];
      return randomColor;
    }
    function getRandomImageUrl() {
      const randomIndex = Math.floor(Math.random() * imageUrls.length);
      const randomImageUrl = imageUrls[randomIndex];
      return randomImageUrl;
    }


    const [loading, setLoading] = useState(true);


    const fetchTags=()=>{
      setLoading(true);
      fetch('/tags',{
        method: 'Get',
            headers: {
                'Content-Type': 'application/json',
            }
      }).then(response=>response.json()).then(response=>{
        if (response.error) {
            throw response.error;
        } else {
          setLoading(false);
            // setArticles(response.articles);
            console.log("response",response);
            const myTags=[]
            for(let tag of response){
              if(tag.tagName){
                tag.tagName=tag.tagName.split('-').join(' ')
              }
              myTags.push({
                tagName:tag.tagName,
                tagUrl:''
              })
            }
            console.log(myTags,"<=")
            setTags(myTags);
        }
      }).catch(err=>{
        setLoading(false);
        console.log(err);
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
      fetchArticles();
      fetchTags();
    }, [])
   
    return (
      <>
      <Carousel style={{"height":"450px"}}variant="dark">
      <Carousel.Item>
        <img
        style={{"height":"500px"}}
          className="d-block h-10 w-100"
          src="w7.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5 className="heading">CP Discuss</h5>
          <p className="disc">Any fool can write code that a computer can understand. Good programmers write code that humans can understand. </p>
          <p className="disc">-Martin Fowler</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
        style={{"height":"500px"}}
          className="d-block w-100"
          src="w5.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5 className="heading"> CP Discuss</h5>
          <p className="disc">Experience is the name everyone gives to their mistakes. </p>
          <p className="disc">-Oscar Wilde</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
        style={{"height":"500px"}}
          className="d-block w-100"
          src="w2.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5 className="heading">CP Discuss</h5>
          <p className="disc">
          First, solve the problem. Then, write the code.
          </p>
          <p className="disc"> -John Johnson</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
      <Container className='my-3'>
      {loading ? (
          <Spinner animation="border" role="status" className="d-flex justify-content-center my-5">
              <span className="sr-only"></span>
          </Spinner>
      ) : (
          <Container className="mt-5">
            <h1 className='my-5 text-center'>Featured Tags:</h1>
            <Grid container spacing={5}>
            {
              tags.map(tag =>(
                <Grid item xs={4}>
                 <Card className="column"sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={()=>{navigate(`/article/tag/${tag.tagName}`)}}>
        <CardMedia
          component="img"
          height="220"
          image={getRandomImageUrl()}
          alt="green iguana"
        />
        {/* <CardMedia
      component="div" // use a div instead of an img
      style={{ backgroundColor: getRandomColor() }} // set background color dynamically
      height="220"
    /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {tag.tagName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>
              ))
            }
    </Grid>       

         
          </Container>
      )}




  </Container>
  </>
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
