import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Header.css';
function NavBar(props) {
  const navigate = useNavigate();
  const redirect = (e, location) => {
    e.preventDefault();
    navigate(location);
  }
  const doLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    redirect(e, "/login")
  }
  const ConditionalRendering = ({ children }) => {
    if (!localStorage.getItem('userName')) {
      return children;
    } else {
      const userName = localStorage.getItem('userName');
      return <>
        <NavItem className="nav-item-link text-light" onClick={(e) => redirect(e, `/profile/${userName}`)}>Welcome {userName}</NavItem>
        &nbsp;&nbsp;
        <NavItem className="nav-item-link text-light" onClick={(e) => doLogout(e)}>logout</NavItem>
      </>
    }
  }
  return (
    
    <Navbar bg="dark"  className="text-dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand style={{"fontFamily":"satisfy","color":"cornflowerblue"}}className="px-1">CP Discuss</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavItem className="nav-item-link">
              <Link to="/home" className="nav-link text-light">Home</Link>
            </NavItem>
            &nbsp;&nbsp;
            <NavItem className="nav-item-link">
              <Link to="/articles " className="nav-link text-light">Articles</Link>
            </NavItem>
            &nbsp;&nbsp;
            <NavItem className="nav-item-link">
              <Link to="/create-article" className="nav-link text-light">Create</Link>
            </NavItem>
            &nbsp;&nbsp;
            <NavItem className="nav-item-link">
              <Link to="/search-article" className="nav-link text-light">Search</Link>
            </NavItem>
            <NavItem className="nav-item-link">
              <Link to="/article/Writing-articles-in-markdown-guidelines" className="nav-link text-light">Guidelines</Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <ConditionalRendering>
            <NavItem className="nav-item-link">
              <Link to="/login" className="nav-link text-light">Login</Link>
            </NavItem>
            &nbsp;&nbsp;
            <NavItem className="nav-item-link">
              <Link to="/signup" className="nav-link text-light">Sign up</Link>
            </NavItem>
            
          </ConditionalRendering>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}

export default NavBar;