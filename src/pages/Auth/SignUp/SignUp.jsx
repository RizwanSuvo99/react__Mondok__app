/* eslint-disable no-unused-vars */
/* eslint-disable no-irregular-whitespace */
import { useForm } from "react-hook-form";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import mondokLogo from "../../../assets/img/mondok-logo2.png";
import {
  create,
  signup,
  signup__form,
  signup__text,
} from "./SignUp.module.css";
import axios from "axios";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    reset
  } = useForm();

  const onSubmit = async (data) => {
    const username = data.name.split(" ").join("_").toLowerCase() + Date.now();
    const findUserByEmail = await axios.get(
      `http://localhost:8800/api/users?email=${data.email}`
    );

    if (findUserByEmail.data.length > 0) {
      setError("email", {
        type: "manual",
        message: "Email already exists",
      });
    } else {
      try {
        await axios.post("http://localhost:8800/api/auth/register", {
          ...data,
          username,
        });
        reset();
        console.log("User registered successfully");
      } catch (error) {
        console.log(error.message);
      }
    }
    
  };

  return (
    <section className={signup}>
      <div className={signup__text}>
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
      <form className={signup__form} onSubmit={handleSubmit(onSubmit)}>
        <img src={mondokLogo} alt="mondok--logo" />
        <h1>Sign Up</h1>
        <div>
          <label>
            Name <span>*</span>
          </label>
          <input
            {...register("name", {
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z]+(?:[ \t]+[a-zA-Z]+)*$/,
                message: "Invalid Name",
              },
            })}
            type="text"
            placeholder="Name"
          />
          {errors.name && <p className="errorMassgae">{errors.name.message}</p>}
        </div>
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
            placeholder="Email"
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
            placeholder="Password"
          />
          {errors.password && (
            <p className="errorMassgae">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label>
            Confirm Password <span>*</span>
          </label>
          <input
            {...register("confirmPassword", {
              required: "This field is required",
              validate: {
                equalTo: (value) =>
                  value === getValues("password") || "Passwords doesn't match",
              },
            })}
            type="password"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p className="errorMassgae">{errors.confirmPassword.message}</p>
          )}
        </div>
        <div>
          <label>
            City <span>*</span>
          </label>
          <input
            {...register("city", {
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z]+(?:[ \t]+[a-zA-Z]+)*$/,
                message: "Invalid City Name",
              },
            })}
            type="text"
            placeholder=""
          />
          {errors.city && <p className="errorMassgae">{errors.city.message}</p>}
        </div>
        <div>
          <label>
            Country <span>*</span>
          </label>
          <input
            {...register("country", {
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z]+(?:[ \t]+[a-zA-Z]+)*$/,
                message: "Invalid Country Name",
              },
            })}
            type="text"
          />
          {errors.country && (
            <p className="errorMassgae">{errors.country.message}</p>
          )}
        </div>
        <div>
          <label>
            Phone <span>*</span>
          </label>
          <input
            {...register("phone", {
              required: "This field is required",
              pattern: {
                value: /^(01[1-9][0-9]{8})$/,
                message: "Enter a valid 11-digit phone starting with '01'.",
              },
            })}
            type="number"
          />
          {errors.phone && (
            <p className="errorMassgae">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <button>Sign Up</button>
        </div>
        <div>
          <p>
            Already have an account?
            <Link to={"/signin"} className={create}>
              Log In
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
