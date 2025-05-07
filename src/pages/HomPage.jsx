import React from 'react'
import { Link } from "react-router";
const navigate = useNavigate();

const handleNavigation = (path) => {
    navigate(path);
  };

const HomPage = () => {
  return (
    <div>
       {/* <button onClick={() => handleNavigation('/adminlogin')} > Admin Login</button>
       <button  onClick={() => handleNavigation('/userlogin')}> User Login</button> */}
      <Link to="/adminlogin">admin Login </Link>;
    </div>

  )
}

export default HomPage
