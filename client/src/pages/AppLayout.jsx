import { useContext, createContext } from "react";
import { useLoaderData, Outlet, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { googleLogout } from "@react-oauth/google";

export const loader = async () => {
  try {
    const { data } = await customFetch("/users/current-user");
    return data;
  } catch (error) {
    console.log(error);
    return redirect("/login");
  }
};

const AppContext = createContext();

const AppLayout = () => {
  const navigate = useNavigate();

  const { user } = useLoaderData();

  const logout = async () => {
    try {
      googleLogout()
      customFetch.get("/auth/logout");
      toast.success("Logged out successfully");
      location.reload()
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      navigate("/");
    }
  };

  return (
    <AppContext.Provider value={{ user, logout }}>
      <Outlet />
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppLayout;
