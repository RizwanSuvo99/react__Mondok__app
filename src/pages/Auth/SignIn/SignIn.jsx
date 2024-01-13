/* eslint-disable no-irregular-whitespace */
import { useForm } from "react-hook-form";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../../Context/AuthContext";
import mondokLogo from "../../../assets/img/mondok-logo2.png";
import {
  create,
  signin,
  signin__form,
  signin__text,
} from "./SignIn.module.css";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();

  const { logIn } = useAuth();

  const onSubmit = (data) => {
    const { email, password } = data;
    logIn(email, password);
    Swal.fire({
      title: "Login Successful!",
      text: "Welcome back, Rizwan Suvo!",
      icon: "success",
      confirmButtonText: "OK",
    });
    navigate("/");
  };


  return (
    <section className={signin}>
      <div className={signin__text}>
        <div>
          <h2>Boelumn Room</h2>
          <p>
            Extensive leisure activities and exotic spa and wellness facilities.
            Set against a backdrop of...
          </p>
          <div>
            <Link>
              <FaMapMarkerAlt />
            </Link>
          </div>
        </div>
      </div>
      <form className={signin__form} onSubmit={handleSubmit(onSubmit)}>
        <img src={mondokLogo} alt="mondok--logo" />
        <h1>Log In</h1>
        <p>Please enter your email and password</p>
        <div>
          <label>
            Email <span>*</span>
          </label>
          <input
            {...register("email", {
              required: "This field is required",
              pattern: {
                value:
                  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/,
                message: "Invalid email address",
              },
            })}
            type="email"
          />
          {errors.email && (
            <p className="errorMassgae">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label>
            Password <span>*</span>
          </label>
          <input
            {...register("password", {
              required: "This field is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!#~.*%*?&]{8,}$/,
                message:
                  "Password must contain uppercase, lowercase, number, special character, and be at least 8 characters long.",
              },
            })}
            type="password"
          />
          {errors.password && (
            <p className="errorMassgae">{errors.password.message}</p>
          )}
        </div>
        <div>
          <Link>Forgot Password?</Link>
        </div>
        <div>
          <button>Log In</button>
        </div>
        <div>
          <p>
            Don’t have an account yet?{" "}
            <Link to={"/signup"} className={create}>
              Register
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default SignIn;
