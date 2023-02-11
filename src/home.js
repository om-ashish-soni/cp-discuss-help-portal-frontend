import { LoginContext, UserContext } from './App';
import {useContext,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
function HomePage() {
    const navigate=useNavigate();
    const {isLoggedIn} = useContext(LoginContext);
    const {userId,userName}=useContext(UserContext);
    useEffect(() => {
      navigate('/search-article');
    }, [])
    
    return (
        <>
        {isLoggedIn}<br/>
        {userId}<br/>
        {userName}<br/>
        {isLoggedIn ? "LoggedIn":"Not Logged In"}
        <h1> this is home page</h1>
        </>
        // <NavBar username="abc"/>
    )
}
export default HomePage;