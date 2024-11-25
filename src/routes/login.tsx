import { useNavigate } from "react-router-dom";
import { S } from "./Style/loginstyle";

export const Login = () => {
  const navigate = useNavigate();
  return (
    <S.Background>
      <S.Container>
        <S.Title>Login</S.Title>
        <S.ContentBox>
          <S.Input type="text" placeholder="id" />
          <S.Input type="text" placeholder="password" />
        </S.ContentBox>
        <S.LoginBtn>Login</S.LoginBtn>
        <S.AccountBox>
          <span>Forgot password</span>
          <span onClick={() => navigate("/register")}>Create Account</span>
        </S.AccountBox>
      </S.Container>
    </S.Background>
  );
};
