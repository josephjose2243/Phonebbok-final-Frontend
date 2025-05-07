import React from 'react'

const navigate = useNavigate();

const handleNavigation = (path) => {
    navigate(path);
  };

const HomPage = () => {
  return (
    <div>
       <button onClick={() => handleNavigation('/adminlogin')} > Admin Login</button>
       <button  onClick={() => handleNavigation('/userlogin')}> User Login</button>
    </div>
  )
}

export default HomPage
