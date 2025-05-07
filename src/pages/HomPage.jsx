import React from 'react'

import { Link } from "react-router-dom";


// const navigate = useNavigate();

// const handleNavigation = (path) => {
//     navigate(path);
//   };

const HomPage = () => {
  return (
    <div>
      <h1>home page </h1>
       {/* <button onClick={() => handleNavigation('/adminlogin')} > Admin Login</button>
       <button  onClick={() => handleNavigation('/userlogin')}> User Login</button> */}
      <Link to="/adminlogin">admin Login1 </Link>;
    </div>

  )
}

export default HomPage
