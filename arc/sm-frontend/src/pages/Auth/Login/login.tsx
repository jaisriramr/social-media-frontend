import { Fragment, useState } from "react";
import Logo from "../../../assets/logo.svg";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import { Link } from "react-router-dom";
import message from "antd/lib/message";
import { container } from "tsyringe";
import { AuthService } from "../../../services/auth.service";

const Login = () => {
  const authService = container.resolve(AuthService);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  async function handleLoginSubmit() {
    const hide = message.loading("Loading..", 0);
    await authService
      .login(loginData)
      .then((response: any) => {
        hide();
        localStorage.setItem("userToken", response?.token);
        message.success("You have logged in successfully!");
      })
      .catch((err: any) => {
        hide();
        message.error(err?.message);
      });
  }

  return (
    <Fragment>
      <div className="auth-container">
        <div className="auth-form-container">
          <div className="auth-logo-container">
            <img src={Logo} className="auth-logo" alt="logo" />
          </div>
          <div className="auth-input-container">
            <Input
              placeholder="Username"
              value={loginData.username}
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
            />
            <Input
              placeholder="Password"
              type="password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
          </div>
          <div className="auth-form-footer">
            <Button type="primary" block onClick={handleLoginSubmit}>
              Login
            </Button>
            <p>
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
