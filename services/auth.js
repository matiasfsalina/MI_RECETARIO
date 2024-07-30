// Componente que contiene funciones para manejar la autenticación del usuario(iniciar sesión) y obtener el perfil del usuario.
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;
const PROFILE_URL = import.meta.env.VITE_PROFILE_URL;

// Iniciar sesion
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}${LOGIN_URL}`, { username, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Error al iniciar sesión');
  }
};

// Obtiene el perfil del usuario
export const getProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}${PROFILE_URL}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Error al obtener perfil');
  }
};