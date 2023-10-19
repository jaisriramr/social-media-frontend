import { Fragment, useEffect, useState } from "react";
import "./register.css";
import Logo from "../../../assets/logo.svg";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import { Link, useNavigate } from "react-router-dom";
import message from "antd/lib/message";
import { container } from "tsyringe";
import { AuthService } from "../../../services/auth.service";

const Register = () => {
  const authService = container.resolve(AuthService);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [registerData, setRegisterData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  async function handleRegisterSubmit() {
    const hide = message.loading("Loading..", 0);

    await authService
      .register(registerData)
      .then((response: any) => {
        console.log("RRRRR ", response);
        hide();
        message.success("You have registered successfully. Please Login!");
      })
      .catch((err: any) => {
        hide();
        console.log("EEEEE ", err);
        message.error(err?.message);
      });
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      navigate("/");
    }
  }, []);

  return (
    <Fragment>
      <div className="auth-container">
        <div className="auth-form-container">
          <div className="auth-logo-container">
            <img src={Logo} className="auth-logo" alt="logo" />
          </div>
          <div className="auth-input-container">
            <Input
              placeholder="Fullname"
              value={registerData.fullname}
              onChange={(e) =>
                setRegisterData({ ...registerData, fullname: e.target.value })
              }
            />
            <Input
              placeholder="Username"
              value={registerData.username}
              onChange={(e) =>
                setRegisterData({ ...registerData, username: e.target.value })
              }
            />
            <Input
              placeholder="Email"
              type="email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
            />
            <Input
              placeholder="Password"
              type="password"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
            />
          </div>
          <div className="auth-form-footer">
            <Button type="primary" block onClick={handleRegisterSubmit}>
              Register
            </Button>
            <p>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
