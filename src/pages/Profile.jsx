// Página de perfil del usuario autenticado
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { getProfile } from '../services/auth'; 

const Profile = () => {
  const [profileData, setProfileData] = useState({
    user_id: '',
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    dob: '',
    bio: '',
    image: '',
    state: '',
    created_at: '',
    updated_at: ''
  });
  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(); // función que devuelve los datos del perfil
        setProfileData(data);
      } catch (error) {
        setNotification({ open: true, message: 'Failed to fetch profile', severity: 'error' });
      }
    };

    fetchProfile();
  }, []);
/*
  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // importante falta Implementar la actualización del perfil
      setNotification({ open: true, message: 'Profile updated successfully', severity: 'success' });
    } catch (error) {
      setNotification({ open: true, message: error.message, severity: 'error' });
    }
  };
*/
  return (
    <Container>
      <h2>Profile</h2>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" value={profileData.username} readOnly />
        </Form.Group>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="first_name" value={profileData.first_name} readOnly />
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="last_name" value={profileData.last_name} readOnly />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={profileData.email} readOnly />
        </Form.Group>
        <Form.Group controlId="formDob">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date" name="dob" value={profileData.dob} readOnly />
        </Form.Group>
        <Form.Group controlId="formBio">
          <Form.Label>Bio</Form.Label>
          <Form.Control as="textarea" name="bio" value={profileData.bio} readOnly rows={4} />
        </Form.Group>
        <Button type="submit" variant="primary">Update Profile</Button>  {/* el botom esta activo pero falta implementar para actualizar */}
      </Form>
      {notification.open && (
        <Alert variant={notification.severity === 'success' ? 'success' : 'danger'} onClose={() => setNotification({ ...notification, open: false })} dismissible>
          {notification.message}
        </Alert>
      )}
    </Container>
  );
};

export default Profile;
