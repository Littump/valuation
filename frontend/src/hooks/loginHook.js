import { useMutation } from "react-query";
import loginService from "../services/loginService";
import { useNavigate } from "react-router-dom";

export const loginHook = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (values) => {
      return loginService.login(values);
    },
    onSuccess: (data) => {
      localStorage.setItem("auth_token", data.data.auth_token);
      navigate("/");
    },
    onError: () => {
      alert("логин или пароль неверный");
    },
  });
};
