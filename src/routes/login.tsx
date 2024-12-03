import { useNavigate } from "react-router-dom";
import { S } from "./Style/loginstyle";
import useAxios from "@/utils/hook/useAxios";
import { useEffect, useState } from "react";
import { useUserToken } from "@/utils/global/useUserToken";
import { useForm } from "react-hook-form";

export const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, getValues } = useForm();
  const { token, setToken } = useUserToken();
  const { response, error, fetchData } = useAxios();
  const onSubmit = () => {
    const data = getValues();
    console.log(data);
    const config = {
      method: "POST",
      url: "http://3.35.58.101:8080/api/users/login",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };
    fetchData(config);
  };
  useEffect(() => {
    if (response && response.data && !error) {
      console.log(response);
      setToken(response.data.token);
      sessionStorage.setItem("token", response.data.token);
      navigate("/");
    }
  }, [response]);
  return (
    <S.Background>
      <S.Container>
        <S.Title>Login</S.Title>
        <S.ContentBox>
          <S.Input
            type="email"
            placeholder="email"
            {...register("email", { required: true })}
          />
          <S.Input
            type="password"
            placeholder="password"
            {...register("password", { required: true })}
          />
        </S.ContentBox>
        <S.LoginBtn onClick={handleSubmit(onSubmit)}>Login</S.LoginBtn>
        <S.AccountBox>
          <span>Forgot password</span>
          <span onClick={() => navigate("/register")}>Create Account</span>
        </S.AccountBox>
      </S.Container>
    </S.Background>
  );
};
