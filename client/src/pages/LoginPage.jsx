import { GoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import styled from "styled-components";
import { redirect, useNavigate } from "react-router-dom";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");

    if (data) {
      toast.info("You are already logged in");
      return redirect("/");
    }
  } catch (error) {
    return null;
  }
};

const LoginPage = () => {
  const navigate = useNavigate();
  const handleSuccessLogin = async (credentialResponse) => {
    try {
      await customFetch.post("/auth/login", {
        idToken: credentialResponse.credential,
      });
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <Wrapper>
      <h1>Login to continue:</h1>
      <GoogleLogin
        onSuccess={(credentialResponse) =>
          handleSuccessLogin(credentialResponse)
        }
        onError={() => {
          toast.error("Login failed");
        }}
        useOneTap
        theme="filled_black"
        size="large"
        shape="pill"
      />
    </Wrapper>
  );
};

export default LoginPage;

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;

  @media only screen and (max-width: 475px) {
    justify-content: start;
    padding: 64px 30px;
  }
`