import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Dropdown,
  Container,
} from "react-bootstrap";

import NewsList from "./components/NewsList";
import Login from "./pages/LoginForm";
import Signup from "./pages/RegisterForm";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();  // Now it is correctly used inside Router

  const handleCategoryClick = (category) => {
    setSearchTerm(category);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setCategory("");
    setSearchTerm(event.target.search.value);
  };

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user?.access_token) {
      navigate('/login');
    }
  }, [user]); // Added navigate to dependency array

  const onLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
            News App
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />

          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">

              {user?.access_token ? (
                <Dropdown>
                  <Dropdown.Toggle variant="outline-primary">
                    Categories
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleCategoryClick("world")}>
                      World
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleCategoryClick("business")}>
                      Business
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleCategoryClick("technology")}>
                      Technology
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleCategoryClick("sports")}>
                      Sports
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleCategoryClick("entertainment")}>
                      Entertainment
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

              ) : ""}

            </Nav>


            <Form onSubmit={handleSearch} className="d-flex">
              <FormControl
                type="text"
                placeholder="Search"
                className="me-2"
                name="search"
              />

              <Button variant="outline-primary" type="submit">
                Search
              </Button>
            </Form>

            <Nav>
              {user?.access_token ? (
                <Nav.Item style={{ border: '1px solid black', marginLeft: 5, borderRadius: 8, padding: 8 }} onClick={onLogout}>
                  Logout
                </Nav.Item>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup">
                    Sign Up
                  </Nav.Link>
                </>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <Row>
                <Col xs={12} md={3}>
                  <h5>Categories</h5>
                  <Nav className="flex-column">
                    <Nav.Link onClick={() => handleCategoryClick("world")}>
                      World
                    </Nav.Link>
                    <Nav.Link onClick={() => handleCategoryClick("business")}>
                      Business
                    </Nav.Link>
                    <Nav.Link onClick={() => handleCategoryClick("technology")}>
                      Technology
                    </Nav.Link>
                    <Nav.Link onClick={() => handleCategoryClick("sports")}>
                      Sports
                    </Nav.Link>
                    <Nav.Link onClick={() => handleCategoryClick("entertainment")}>
                      Entertainment
                    </Nav.Link>
                  </Nav>
                </Col>

                <Col xs={12} md={9}>
                  <NewsList category={category} searchTerm={searchTerm} />
                </Col>
              </Row>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
