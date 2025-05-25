import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'
import { useDispatch, useSelector } from 'react-redux'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchData = async () => {
    try {
      if(userData) return ;
      const response = await axios.get(BASE_URL + '/profile/view', {
        withCredentials: true,
      });
      dispatch(addUser(response.data));
    } catch (err) {
     
        navigate('/login');
     
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
   
      fetchData();
    
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};


export default Body
