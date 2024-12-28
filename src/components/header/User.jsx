import React, { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { BsBagCheck } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { GrHelp } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { authActions } from "../../store/authSlice"
import { useSelector } from "react-redux"


const User = () => {

  const isLoggIn = useSelector((state) => state.auth.isLoggIn)
  // console.log(isLoggIn);
  const user = isLoggIn
  const [profileOpen, setProfileOpen] = useState(false);

  const close = () => {
    setProfileOpen(null);
  };

  const navigate = useNavigate();

  const dispatch = useDispatch()

  const logoutHandler = (e) => {
    dispatch(authActions.logout())
  }
  
  return (
    <>
      <div className="profile">
        {user ? (
          <>
            <button
              className="img"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                alt=""
              />
            </button>

            {profileOpen && (
              <div className="openProfile boxItems" onClick={close}>
                <div className="image">
                  <Link to="/account">
                    <div className="img">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                        alt=""
                      />
                    </div>
                  </Link>
                  <div className="text">
                    <h4>Eden Smith</h4>
                    <label htmlFor="">Los Angeles,CA</label>
                  </div>
                </div>
                <button className="box" onClick={() => navigate("/profile")}>
                  <IoSettingsOutline className="icon" />
                  <h4>My Account</h4>
                </button>
                <button className="box">
                  <BsBagCheck className="icon" />
                  <h4>My Order</h4>
                </button>
                <button className="box">
                  <AiOutlineHeart className="icon" />
                  <h4>Wishlist</h4>
                </button>
                <button className="box">
                  <GrHelp className="icon" />
                  <h4>Help</h4>
                </button>
                <button className="box" onClick={logoutHandler}>
                  <BiLogOut className="icon" />
                  <h4>Log Out</h4>
                </button>
              </div>
            )}
          </>
        ) : (
          <button onClick={() => navigate("/login")}>Login/Register</button>
        )}
      </div>
    </>
  );
};

export default User;
