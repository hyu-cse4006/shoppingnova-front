import { useNavigate } from "react-router-dom";
import { S } from "./Style/registerstyle";
import { useForm } from "react-hook-form";
import useAxios from "@/utils/hook/useAxios";

export const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, getValues, watch } = useForm();
  const { response, error, fetchData } = useAxios();
  const password = watch("password");
  const passwordConfirm = watch("passwordConfirm");
  const onSubmit = () => {
    if (password !== passwordConfirm) {
      alert("비밀번호를 일치시켜 주세요.");
      return;
    }
    const data = getValues();
    const config = {
      method: "POST",
      url: "http://3.35.58.101:8080/api/users/form",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };
    fetchData(config);
    if (response && response.data) navigate("/login");
  };
  return (
    <S.Background>
      <S.Container>
        <S.Title>Create Account</S.Title>
        <S.ContentBox>
          <div>
            <S.Input
              type="email"
              placeholder="Email Address"
              {...register("email", { required: true })}
            />
          </div>
          <div>
            <S.Input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            <S.Input
              type="password"
              placeholder="Confirm password"
              {...register("passwordConfirm", { required: true })}
            />
          </div>
          <div>
            <S.Input
              type="text"
              placeholder="Username"
              {...register("username", { required: true })}
            />
          </div>
        </S.ContentBox>
        <S.CreateBtn onClick={handleSubmit(onSubmit)}>
          Create Account
        </S.CreateBtn>
        <S.AccountBox>
          <span onClick={() => navigate("/login")}>Return to login</span>
        </S.AccountBox>
      </S.Container>
    </S.Background>
  );
};
