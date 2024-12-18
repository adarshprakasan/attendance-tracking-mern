import { useState } from "react";
import Style2 from "../css/SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const SignUp = () => {
  let [formData, setFormData] = useState({
    fn: "",
    ln: "",
    email: "",
    pwd: "",
    cPwd: "",
    number: "",
  });
  let navigate = useNavigate()
  let [errors, setError] = useState({});
  let handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.fn == "" ||
      formData.ln == "" ||
      formData.email == "" ||
      formData.number == "" ||
      formData.pwd == "" ||
      formData.cPwd == ""
    ) {
      toast.error("Error! Something went wrong.");
    } else if (formData.pwd !== formData.cPwd) {
      toast.info("Error! password does not matched");
    } else {
      await axios.post("http://localhost:5000/api/auth/signup", formData);
      toast.success("Success! account created successfully.");
     setTimeout(()=>{
      navigate('/')
     }, 3000)
    }
    setFormData({ fn: "", ln: "", email: "", pwd: "", cPwd: "", number: "" });
    setError(validForm(formData));
  };

  let updateEmpData = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //  ! Validation for email
  let IsemailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // ! Validation for password
  let IsPasswordValid = (pwd) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
    return passwordRegex.test(pwd);
  };

  // ! Validation for number
  let isValidNumber = (number) => {
    let numberRegx = /^\d{10}$/;
    return numberRegx.test(number);
  };

  let validForm = (formData) => {
    // console.log(formData);
    let errors = {};
    if (!formData.fn) {
      errors.fn = "FirstName is required";
    }

    if (!formData.ln) {
      errors.ln = "LastName is required";
    }

    if (!formData.number) {
      errors.number = "Number is required";
    } else if (!isValidNumber(formData.number)) {
      errors.number = "Number must be 10digit";
    }

    if (!formData.email) {
      errors.email = "email is required";
    } else if (!IsemailValid(formData.email)) {
      errors.email = "Email is not valid";
    }

    if (!formData.pwd) {
      errors.pwd = "password is required";
    } else if (!IsPasswordValid(formData.pwd)) {
      errors.pwd =
        "password should have one cap letter, small leter, number and must 10digit";
    }

    if (!formData.cPwd) {
      errors.cPwd = "confirm password is required";
    } else if (!IsPasswordValid(formData.cPwd)) {
      errors.cPwd = "password is not valid";
    } else if (formData.pwd !== formData.cPwd) {
      errors.cPwd = "Password does not matched";
    }

    return errors;
  };

  return (
    <section className={Style2.mainContainer}>
      <div className={Style2.left_Container}>
        <div className={Style2.left_Control}>
          <h1>HRM_TECH</h1>
          <h5>Welcome to HRM</h5>
        </div>
      </div>
      <div>
        <div className={Style2.head_control}>
          <h3>SignUp in to HRM_TECH</h3>
        </div>
        <div className={Style2.form_control}>
          <form action="" onSubmit={handleSubmit}>
            <div className={Style2.firstDiv}>
              <label htmlFor="">First Name</label>
              <input
                type="text"
                name="fn"
                value={formData.fn}
                onChange={updateEmpData}
              />
              <aside className={Style2.errorFn}>
                {errors.fn && <div>{errors.fn}</div>}
              </aside>
            </div>
            <div className={Style2.firstDiv}>
              <label htmlFor="">Last Name</label>
              <input
                type="text"
                name="ln"
                value={formData.ln}
                onChange={updateEmpData}
              />
              <aside className={Style2.errorFn}>
                {errors.ln && <div>{errors.ln}</div>}
              </aside>
            </div>
            <div className={Style2.firstDiv}>
              <label htmlFor="">Mob</label>
              <input
                type="tel"
                name="number"
                value={formData.number}
                onChange={updateEmpData}
              />
              <aside className={Style2.errorFn}>
                {errors.number && <div>{errors.number}</div>}
              </aside>
            </div>
            <div className={Style2.firstDiv}>
              <label htmlFor="">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={updateEmpData}
              />
              <aside className={Style2.errorFn}>
                {errors.email && <div>{errors.email}</div>}
              </aside>
            </div>
            <div className={Style2.firstDiv}>
              <label htmlFor="">Password</label>
              <input
                type="password"
                name="pwd"
                value={formData.pwd}
                onChange={updateEmpData}
              />
              <aside className={Style2.errorPwd}>
                {errors.pwd && <div>{errors.pwd}</div>}
              </aside>
            </div>
            <div className={Style2.firstDiv}>
              <label htmlFor="">Confirm Password</label>
              <input
                type="password"
                name="cPwd"
                value={formData.cPwd}
                onChange={updateEmpData}
              />
              <aside className={Style2.errorFn}>
                {errors.cPwd && <div>{errors.cPwd}</div>}
              </aside>
            </div>
            <div>
              <button>CREATE ACCOUNT</button>
            </div>
            <div className={Style2.btn_link}>
              <h3>Have already an account?</h3> <Link to="/">Login here</Link>
            </div>
          </form>
        </div>
        {/* ToastContainer to display notifications */}
        <ToastContainer
          position="top-right"
          autoClose={5000} // Time before toast auto-closes (in ms)
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable = {true}
        />
      </div>
    </section>
  );
};

export default SignUp;
