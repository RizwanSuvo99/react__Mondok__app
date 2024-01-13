import { CgProfile } from "react-icons/cg";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import navLogo from "../../assets/img/header-logo.png";
import { navLinks } from "../../routes/nav__links";
import { navbar, navlink, navlinks__container } from "./Navbar.module.css";
import Swal from "sweetalert2";

const Navbar = () => {
  const { state, logOut } = useAuth();

  const logout = () => {
    logOut();
    Swal.fire({
      title: "Logout Successful!",
      text: "You have been logged out. See you next time!",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <nav className={navbar}>
      <Link to={"/"}>
        <img src={navLogo} alt="site--menu" />
      </Link>
      <ul className={navlinks__container}>
        {navLinks.map((link) => {
          return (
            <li key={link.name}>
              <NavLink className={navlink} to={link.path}>
                {link.name}
              </NavLink>
            </li>
          );
        })}
        {
          <li className={navlink}>
            {state.user ? (
              <img src="https://picsum.photos/seed/picsum/200/300" alt="" />
            ) : (
              <NavLink to={"/signin"}>
                <CgProfile />
              </NavLink>
            )}
          </li>
        }
        {state.user && (
          <li className={navlink}>
            <NavLink className={navlink} onClick={logout}>
              Log Out
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
