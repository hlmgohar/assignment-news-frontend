import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user?.access_token) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true); // Set loading to true before starting the request

    try {
      // Prepare the headers
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
  
      // Send the request
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData)
      });
  
      // Check if the response is ok
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Parse the JSON response
      const user = await response.json();
  
      // Store the user in localStorage
      localStorage.setItem('user', JSON.stringify(user));
  
      // Navigate to the home page
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed: ' + error.message); // Display an alert if there's an error
    } finally {
      setLoading(false); // Set loading to false after the request is done
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="text-center mb-4">Login</h3>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
