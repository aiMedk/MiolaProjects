import React, { Component } from "react";
import axios from "axios";

class login extends Component {
  constructor() {
    super();

    this.state = {
      username: "admin",
      password: "admin",
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

//    const endpoint = "https://miolaproject.herokuapp.com/authenticate";

    const username = this.state.username;
    const password = this.state.password;

    const user_object = {
      username: username,
      password: password,
    };

    axios.post("https://miolaproject.herokuapp.com/authenticate", user_object).then((res) => {
      localStorage.setItem("authorization", res.data.jwttoken);
      console.log(res.data.jwttoken);
      return this.handleDashboard();
    });
  };

  handleDashboard() {
    axios.get("https://miolaproject.herokuapp.com/users").then((res) => {
        console.log(res.data, "dddd");
      if (res.data === "success") {
        this.props.history.push("/dashboard");
      } else {
        alert("Authentication failure");
      }
    });
  }

  render() {
    return (
      <div>
        <div class="wrapper">
          <form class="form-signin" onSubmit={this.handleFormSubmit}>
            <h2 class="form-signin-heading">Please login</h2>
            <div className="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="User name"
                value="admin"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                class="form-control"
                placeholder="password"
                value="admin"
              />
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default login;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useHistory } from "react-router-dom";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     console.log("ssssss", username);
//   });

//   const handleFormSubmit = (event) => {
//     event.preventDefault();

//     // const endpoint = "https://miolaproject.herokuapp.com/authenticate";

//     const currUsername = username;
//     const currPassword = password;

//     const user_object = {
//       username: currUsername,
//       password: currPassword,
//     };

//     axios
//       .post("https://miolaproject.herokuapp.com/authenticate", user_object)
//       .then((res) => {
//         localStorage.setItem("authorization", res.data.token);
//         console.log(res.data.token);
//         return handleDashboard();
//       });
//   };

//   const History = useHistory();

//   const handleDashboard = () => {
//     axios.get("https://miolaproject.herokuapp.com/Encadrants").then((res) => {
//       if (res.data === "success") {
//         // this.props.history.push("/dashboard");
//         History.push("/");
//       } else {
//         alert("Authentication failure");
//       }
//     });
//   };

//   return (
//     <div>
//       <form onSubmit={handleFormSubmit}>
//         <h3>Sign In</h3>

//         <div className="form-group">
//           <label>Email address</label>
//           <input
//             type="text"
//             value={username}
//             className="form-control"
//             placeholder="Enter username"
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             className="form-control"
//             placeholder="Enter password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <div className="custom-control custom-checkbox">
//             <input
//               type="checkbox"
//               className="custom-control-input"
//               id="customCheck1"
//             />
//             <label className="custom-control-label" htmlFor="customCheck1">
//               Remember me
//             </label>
//           </div>
//         </div>

//         <button type="submit" className="btn btn-primary btn-block">
//           Submit
//         </button>
//         <p className="forgot-password text-right">
//           Forgot <a href="/">password?</a>
//         </p>
//       </form>
//     </div>
//   );
// }
