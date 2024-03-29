import { useNavigate } from "react-router";
import Style from "./FindAccount.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Timer from "./Timer";

const FindUserId = () => {
  const [secondClick, setSecondClick] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [uAccessCode, setUAccessCode] = useState<string>("");
  const [uId, setUId] = useState<string>("");

  const navigate = useNavigate();

  const user = localStorage.getItem("user");
  //로컬스토리지로 로그인여부 확인

  useEffect(() => {
    if (user) {
      alert("로그인하시면 볼 수 없는 페이지 입니다");
      localStorage.clear();
      navigate("/");
    }
  });

  const onChange = (e: any) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "uAccessCode") {
      setUAccessCode(e.target.value);
    }
  };

  //이메일로 인증번호 수신
  const postEmail = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/email/mailConfirm", {
        email: email,
      });
      setUAccessCode(response.data);
      setSecondClick(true);
    } catch (err) {
      console.error(err);
    }
  };

  //유저가 입력한 인증번호와 get으로 가져온 인증번호랑 비교
  const compareNumber = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/email/findId", {
        email: email,
        code: uAccessCode,
      });
      setUId(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={Style.form}>
      <div>
        <button
          className={Style.FindAccount_Btn}
          onClick={(e) => navigate("/findpw")}
        >
          비밀번호 찾기
        </button>
        <div>
          <div className={Style.confirm_wrap}>
            <div className={Style.box}>
              <input
                name="email"
                placeholder="인증번호 받으실 이메일을 입력하세요"
                onChange={onChange}
              ></input>
              {!secondClick && (
                <button onClick={(e) => postEmail(e)}>인증번호 받기</button>
              )}
            </div>
            {secondClick === true ? (
              <div className={Style.box}>
                <input
                  placeholder="인증번호를 입력하세요"
                  name="uAccessCode"
                  onChange={onChange}
                ></input>
                <button onClick={(e) => compareNumber(e)}>인증하기</button>
                {uId.length === 0 && <Timer />}
                {uId.length > 1 && (
                  <h2>
                    귀하의 아이디는
                    <span className={Style.userInfo}>{uId}</span>
                    입니다.
                  </h2>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindUserId;
