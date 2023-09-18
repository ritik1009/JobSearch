import { useNavigate } from "react-router-dom"
import { logoutRedux } from "../Firebase/firebase";
import { useDispatch } from "react-redux";
const Navbar = ({loggedIn,setLoggedIn}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleLogout = ()=>{
    logoutRedux(dispatch);
    setLoggedIn(false)
  }
  return (
    <div>
      <div className="flex justify-end px-2">
        {loggedIn ? (
          <div className="text-base font-semibold cursor-pointer text-red-500 " onClick={handleLogout}>
            Logout
          </div>
        ) : (
          <div className="text-base font-semibold cursor-pointer text-red-500 " onClick={()=>navigate("/login")}>
            Login/Signup
          </div>
        )}
      </div>
      <div className="flex justify-center p-6 pt-4 items-center">
        <h1 className="text-5xl font-bold text-orange-500">JobSearch</h1>
      </div>
    </div>
  );
};

export default Navbar;
