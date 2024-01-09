import React, { useEffect, useState } from "react";
import style from "./Login.module.scss";
import Style from "./LoginForm.module.scss"; //로그인 버튼 클릭시 보이는 css

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import classnames from "classnames";

import { useSelector, useDispatch } from "react-redux";
import { login } from "../../slices/login/reducer";
import { AppDispatch, RootState } from "../../slices/store";

interface Ires {
  data: {
    accessToken: string;
    refreshToken: string;
    memberId: number;
    nickname: string;
  };
}

const Login = () => {
  const [isBtnClick, setIsBtnClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isSecretPassword, setIsSecretPassword] = useState(true);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const user = useSelector((state: any) => state.auth.user);
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  console.log(isLoggedIn, 1);

  useEffect(() => {
    if (isLoggedIn && user) {
      alert(`${user.nickname}님 반갑습니다`);
      localStorage.setItem("user", JSON.stringify(user));
      setIsLogin(true);
    }
  }, [user, isLoggedIn]);

  const handleLogin = (e: any) => {
    e.preventDefault();
    navigate("/");
    dispatch(login(username, password));
    localStorage.setItem("accessToken ", "fdsafd");
    localStorage.setItem("refreshToken ", "asdfsafsdfd");
    setIsBtnClick(false);
  };

  // console.log("user", user);
  // console.log("isLoggedIn", isLoggedIn);

  const onClickPasswordShow = (e: React.MouseEvent) => {
    setIsSecretPassword(!isSecretPassword);
  };

  const onChange = (e: any) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const onSubmit = async (e: any) => {
    // setIsLoading(true);
    // e.preventDefault();
    // const res: Ires = await axios.post("/user/login", {
    //   username,
    //   password,
    // });
    // try {
    //   console.log(res.data);
    //   localStorage.clear();
    //   localStorage.setItem("accessToken", res.data.accessToken);
    //   localStorage.setItem("refreshToken", res.data.refreshToken);
    //   navigate("/");
    // } catch (e) {
    //   console.error(e);
    // } finally {
    //   setIsLoading(false);
    // }
  };
  const clear = () => {
    localStorage.clear();
  };
  return (
    <div className={style.area_login}>
      {isLogin === false ? (
        <div className={style.wrap_login}>
          {isBtnClick ? (
            <form onSubmit={onSubmit} className={Style.form}>
              <div className={Style.wrapper_username}>
                <input
                  onChange={onChange}
                  name="username"
                  type="text"
                  placeholder="아이디"
                  value={username}
                  maxLength={20}
                  className={Style.input}
                  required
                />
              </div>
              <div className={Style.wrapper_password}>
                <input
                  onChange={onChange}
                  name="password"
                  type={isSecretPassword ? "password" : "text"}
                  placeholder="비밀번호"
                  value={password}
                  maxLength={20}
                  className={style.input}
                  required
                />
                <div className={Style.password_info}>
                  <button
                    type="button"
                    className={classnames(Style.btn_show, {
                      [Style.is_hide]: !isSecretPassword,
                    })}
                    onClick={onClickPasswordShow}
                  >
                    <span className="blind">비밀번호 숨기기</span>
                  </button>
                </div>
              </div>
              {/* <input
              type="submit"
              value={isLoading ? "로그인 중 ..." : "로그인하기"}
              disabled={isLoading}
              className={Style.btn_submit}
            /> */}
              <button
                className={Style.btn_submit}
                onClick={(e) => handleLogin(e)}
              >
                로그인하기
              </button>
            </form>
          ) : (
            <>
              <p className={style.top_text}>글을 작성하시려면 로그인하세요.</p>
              <button
                type="button"
                className={style.btn_login}
                onClick={(e) => setIsBtnClick(true)}
              >
                로그인
              </button>
            </>
          )}
          <div className={style.bottom_menu}>
            <div className={style.info_find}>
              <Link to="">아이디 찾기</Link>
              <span className={style.dot} />
              <Link to="">비밀번호 찾기</Link>
            </div>
            <div className={style.sign_in}>
              <Link to="/join">회원가입</Link>
            </div>
          </div>
        </div>
      ) : (
        <div className={style.wrap_login}>{user?.nickname}님 반갑습니다.</div>
      )}
    </div>
  );
};

export default Login;
