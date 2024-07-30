// Componente principal de la aplicación para configurar las rutas
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Profile from './pages/Profile';
import HomePrivate from './pages/HomePrivate'; 
import { AuthProvider, useAuth } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Navbar = () => {
  const { isAuthenticated } = useAuth(); 

  return (
    
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Mi Receta</a>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
                </li>
                {!isAuthenticated ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/">Home</Link>
                    </li>                    
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/homeprivate">HomePrivate</Link>
                    </li>                    
                  </>
                )}
              </ul>
            </div>
          </nav>
  );      
};  
function App() {
  const { isAuthenticated } = useAuth();

  return (
      <AuthProvider>
        <Router>
            <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />                  
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />                  
                  <Route path="/profile" element={isAuthenticated ? <Profile /> : <Login />} />
                  <Route path="/homeprivate" element={isAuthenticated ? <HomePrivate /> : <Login />} />
                </Routes>
                
        </Router>
      </AuthProvider>
  );
}

export default App;
