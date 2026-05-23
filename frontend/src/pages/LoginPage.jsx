import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

useEffect(() => {

  const token = localStorage.getItem("token");

  if (token) {

    navigate("/dashboard");

  }

}, [navigate]);

const handleGoogleLogin = async () => {

  window.google.accounts.oauth2.initTokenClient({

    client_id:
      "768792569540-figjod3g9ibuki0frhh8irvm0q5mlmg1.apps.googleusercontent.com",

    scope: "email profile openid",

    callback: async (response) => {

      try {

        const userInfo = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        const user = await userInfo.json();

        const res = await API.post(
          "/google-login",
          {
            name: user.name,
            email: user.email,
          }
        );

        localStorage.setItem(
          "token",
          res.data.access_token
        );

        localStorage.setItem(
          "userName",
          res.data.user.name
        );

        localStorage.setItem(
          "userEmail",
          res.data.user.email
        );

        navigate("/dashboard", {
          replace: true,
        });

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.detail ||
          "Google Login Failed"
        );

      }

    },

  }).requestAccessToken();

};
  const [form, setForm] = useState({
  email: "",
  password: "",
});

const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const formData = new FormData();

    formData.append("username", form.email);
    formData.append("password", form.password);

    const response = await API.post(
      "/login",
      formData
    );

    console.log(response.data);

localStorage.setItem(
  "token",
  response.data.access_token
);
localStorage.setItem(
  "userEmail",
  form.email
); 

    alert("Login Successful!");

navigate("/dashboard");

  } catch (error) {

    console.log(error);

    alert("Invalid Email or Password");
  }
};

  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-[#f8f5ff]
      via-[#f5f3ff]
      to-[#eef2ff]
      px-6
      py-10
    ">

      <div className="
        w-full
        max-w-[1500px]
        min-h-[900px]
        bg-white/70
        backdrop-blur-xl
        rounded-[40px]
        overflow-hidden
        shadow-[0_20px_80px_rgba(139,92,246,0.08)]
        grid
        grid-cols-1
        xl:grid-cols-2
      ">

        {/* LEFT SECTION */}

        <div className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-[#efe7ff]
          to-[#f8f5ff]
          p-16
          flex
          flex-col
          justify-between
        ">

          {/* BACKGROUND CIRCLES */}

          <div className="
            absolute
            -top-24
            -left-24
            w-[420px]
            h-[420px]
            rounded-full
            bg-purple-300/20
          " />

          <div className="
            absolute
            top-0
            right-0
            w-[320px]
            h-[320px]
            rounded-full
            bg-purple-200/20
          " />

          {/* TITLE */}

          <div className="relative z-10">

            <h1 className="
              text-[72px]
              leading-[0.95]
              font-black
              tracking-[-3px]
              text-[#111827]
            ">

              Expense
              <br />

              <span className="
                bg-gradient-to-r
                from-purple-500
                to-violet-600
                bg-clip-text
                text-transparent
              ">
                Tracker
              </span>

            </h1>

            <p className="
              mt-6
              text-[24px]
              text-slate-500
            ">
              Smart Finance. Better Future.
            </p>

          </div>

          {/* IMAGE */}

          <div className="
            relative
            z-10
            flex
            justify-center
            mt-10
          ">

            <img
              src="/login-illustration.png"
              alt="Login Illustration"
              className="
                w-full
                max-w-[560px]
                object-contain
              "
            />

          </div>

          {/* QUOTE */}

          <div className="
            relative
            z-10
            mt-10
          ">

            <p className="
              text-[22px]
              text-slate-600
              font-medium
              leading-relaxed
            ">
              “ Take control of your finances and achieve your goals.”
            </p>

          </div>

        </div>

        {/* RIGHT SECTION */}

        <div className="
          flex
          items-center
          justify-center
          p-10
          xl:p-20
        ">

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              w-full
              max-w-[650px]
              bg-white
              rounded-[36px]
              border
              border-slate-100
              shadow-xl
              p-12
            "
          >

            {/* TITLE */}

            <h2 className="
              text-[58px]
              font-black
              tracking-[-2px]
              text-center
              text-[#111827]
            ">
              Welcome back
            </h2>

            <p className="
              text-center
              text-slate-500
              text-[22px]
              mt-4
            ">
              Login to continue to your account
            </p>

            {/* FORM */}

            <div className="space-y-6 mt-10">

              {/* EMAIL */}

              <input
  name="email"
  type="email"
  placeholder="Email Address"
  value={form.email}
  onChange={handleChange}
  className="
    w-full
    h-[70px]
    px-6
    rounded-2xl
    border
    border-slate-200
    outline-none
    text-[18px]
    focus:border-purple-400
  "
/>

              {/* PASSWORD */}

              <input
  name="password"
  type="password"
  placeholder="Password"
  value={form.password}
  onChange={handleChange}
  className="
    w-full
    h-[70px]
    px-6
    rounded-2xl
    border
    border-slate-200
    outline-none
    text-[18px]
    focus:border-purple-400
  "
/>

              {/* OPTIONS */}

              <div className="
                flex
                items-center
                justify-between
                pt-1
              ">

                <label className="
                  flex
                  items-center
                  gap-3
                  text-[18px]
                  text-slate-600
                ">

                  <input
                    type="checkbox"
                    className="
                      w-5
                      h-5
                      accent-purple-600
                    "
                  />

                  Remember me

                </label>

                <button className="
                  text-purple-600
                  text-[18px]
                  font-medium
                ">
                  Forgot password?
                </button>

              </div>

              {/* LOGIN BUTTON */}

              <button
  type="button"
  onClick={handleSubmit}className="
                w-full
                h-[72px]
                rounded-2xl
                bg-gradient-to-r
                from-purple-500
                to-violet-600
                text-white
                text-[24px]
                font-semibold
                shadow-lg
                hover:scale-[1.01]
                transition-all
              ">
                Login
              </button>

              {/* SOCIAL LOGIN */}

              <div className="pt-6">

                <div className="
                  flex
                  items-center
                  gap-4
                  mb-6
                ">

                  <div className="
                    flex-1
                    h-[1px]
                    bg-slate-200
                  " />

                  <p className="
                    text-slate-400
                    text-[18px]
                  ">
                    or login with
                  </p>

                  <div className="
                    flex-1
                    h-[1px]
                    bg-slate-200
                  " />

                </div>

                {/* BUTTONS */}

 {/* BUTTONS */}
{/* BUTTONS */}

<div className="
  grid
  grid-cols-2
  gap-4
">

  {/* GOOGLE */}

<div className="w-full">

  <div className="opacity-0 absolute">

    <GoogleLogin
      onSuccess={(response) => {

        localStorage.setItem(
          "token",
          response.credential
        );

        navigate("/dashboard");

      }}

      onError={() => {

        console.log("Login Failed");

      }}
    />

  </div>

  <button
    onClick={handleGoogleLogin}
    className="
      h-[68px]
      rounded-2xl
      border
      border-slate-200
      text-[20px]
      font-medium
      hover:bg-slate-50
      transition-all
      flex
      items-center
      justify-center
      gap-3
      w-full
    "
  >

    <img
      src="https://www.svgrepo.com/show/475656/google-color.svg"
      alt="google"
      className="w-5 h-5"
    />

    Google

  </button>

</div>

  {/* MICROSOFT */}

  <button className="
    h-[68px]
    rounded-2xl
    border
    border-slate-200
    text-[20px]
    font-medium
    hover:bg-slate-50
    transition-all
    flex
    items-center
    justify-center
    gap-3
  ">

    <svg className="w-5 h-5" viewBox="0 0 23 23">
      <path fill="#f35325" d="M0 0h11v11H0z" />
      <path fill="#81bc06" d="M12 0h11v11H12z" />
      <path fill="#05a6f0" d="M0 12h11v11H0z" />
      <path fill="#ffba08" d="M12 12h11v11H12z" />
    </svg>

    Microsoft

  </button>
  </div>

</div>



              {/* SIGNUP */}

              <p className="
                text-center
                text-slate-500
                text-[18px]
                pt-5
              ">

                Don’t have an account?{" "}

                <span className="
                  text-purple-600
                  font-semibold
                  cursor-pointer
                ">
                 <Link to="/register">
  Sign up
</Link>
                </span>

              </p>

            </div>

          </motion.div>

        </div>

      </div>

    </div>
  )
}

export default LoginPage