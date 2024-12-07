import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Public() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (user) {
      if(user.role === 'admin'){
        navigate("/admin");
      }else{
        navigate("/");
      }
    }
  }, [user, navigate]);
  return (
    <div>
      <Outlet />
    </div>
  );
}
