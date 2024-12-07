import React, { useEffect } from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {toast} from 'react-hot-toast'
function Admin() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);


    useEffect(() => {
        if (!user || user.role !== 'admin') {
            toast.error('You are not authorized to access this page');
            navigate('/');
        }
    }, [user]);    
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default Admin
