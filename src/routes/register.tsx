import { useNavigate } from "react-router-dom";
import { S } from "./Style/registerstyle";

export const Register = () => {
  const navigate = useNavigate();
  return (
    <S.Background>
      <S.Container>
        <S.Title>Create Account</S.Title>
        <S.ContentBox>
          <div>
            <S.Input type="text" placeholder="Email Address" />
          </div>
          <div>
            <S.Input type="text" placeholder="Password" />
            <S.Input type="text" placeholder="Confirm password" />
          </div>
          <div>
            <S.Input type="text" placeholder="Username" />
          </div>
        </S.ContentBox>
        <S.CreateBtn>Create Account</S.CreateBtn>
        <S.AccountBox>
          <span onClick={() => navigate("/login")}>Return to login</span>
        </S.AccountBox>
      </S.Container>
    </S.Background>
  );
};
