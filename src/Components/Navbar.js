import {React,useEffect} from 'react';
import { Link,useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';

function Navbar() {
  let navi = useNavigate
  const handlelogout=()=>{
     localStorage.removeItem('token');
     navi('/');

  }
  let location = useLocation();
    useEffect(() => {

    }, [location]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/home"?"active":""}`} aria-current="page" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
              </li>
            </ul>
            </div>
          {!localStorage.getItem('token')?
           <div>
          <Link button type="button" className="btn btn-light" to="/login">Login</Link>
          <Link button type="button" className="btn btn-light" to="/signup">SignUp</Link></div>
        : <Link button type="button" className="btn btn-light" to="/login" onClick={handlelogout}>LogOut</Link>}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
