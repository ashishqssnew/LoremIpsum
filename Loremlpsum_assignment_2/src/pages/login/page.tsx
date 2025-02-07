import { FormEvent, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { LoginForm } from "../../types";
import "./styles/style.scss";

// Initial form field values
const initialFields: LoginForm = {
   username: "",
   password: "",
};

const LoginPage = () => {
   const [fields, setFields] = useState<LoginForm>(initialFields); // State to hold form field values
   const navigate = useNavigate(); // Hook to navigate to the dashboard upon successful login

   /**
    * Handles form submission for user login.
    * Resets the form if login is successful and navigates to the dashboard.
    *
    * @param {FormEvent} e - The form event triggered on submit.
    */
   const handleLogin = useCallback((e: FormEvent) => {
      e.preventDefault(); // Prevent default form submission behavior
      const { username, password } = fields;

      // Check if both username and password are provided
      if (username && password) {
         navigate("/dashboard"); // Redirect to dashboard on successful login
         setFields(initialFields); // Reset form fields after successful login
      }
   }, [fields, navigate]); // Only recreate this function if `fields` or `navigate` change

   /**
    * Generic handler for updating form field values.
    * This allows handling both `username` and `password` changes with one function.
    *
    * @param {keyof LoginForm} field - The name of the field to update ('username' or 'password').
    * @returns A function to handle the change event.
    */
   const handleChange = (field: keyof LoginForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      // Update the respective field value in the state
      setFields((prev) => ({ ...prev, [field]: e.target.value }));
   };

   return (
      <div className="login">
         <div className="container">
            <h1>Welcome</h1>
            <p>
               Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum
               rerum optio maxime, harum eius temporibus odio consequatur, amet
               rem cupiditate praesentium ratione odit non. Eius?
            </p>
            {/* Login form */}
            <form onSubmit={handleLogin}>
               {/* Username field */}
               <input
                  type="text"
                  placeholder="Username"
                  value={fields.username}
                  required
                  onChange={handleChange("username")} // Update `username` field on change
               />
               {/* Password field */}
               <input
                  type="password"
                  placeholder="Password"
                  value={fields.password}
                  required
                  onChange={handleChange("password")} // Update `password` field on change
               />
               {/* Submit button is disabled if either username or password is empty */}
               <button type="submit" disabled={!fields.username || !fields.password}>
                  Login
               </button>
            </form>
         </div>
      </div>
   );
};

export default LoginPage;
