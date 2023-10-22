import { useMutation } from "react-query";
import loginService from "../services/loginService.js";
import { useNavigate } from "react-router-dom";

export const signUpHook = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (values) => {
      return loginService.signUp(values);
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: () => {
      // ничего
      navigate("/");
    },
  });
};
