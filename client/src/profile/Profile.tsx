import { useState } from "react";
import axios from "axios";

const user = {
  nickname: "홍길동",
  email: "gildong@gmail.com",
  password: "비밀번호486",
};
const Profile = () => {
  const [userReTouch, setUserReTouch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [userNickname, setUserNickname] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.put("/:user_id", {
        //추후에 백엔드 api명세서 나오면 수정
        userNickname,
        userPassword,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (e: any) => {
    if (e.target.nickname) {
      setUserNickname(e.target.value);
    } else {
      setUserPassword(e.target.value);
    }
  };

  return (
    <div>
      {userReTouch === true ? (
        <div>
          <h2>{user.nickname}</h2>
          <h5>{user.email}</h5>
          <h5>{user.password}</h5>
          <button onClick={() => setUserReTouch(false)}>수정</button>
        </div>
      ) : (
        <div>
          <input
            name="nickname"
            type="text"
            defaultValue={user.nickname}
            onChange={onChange}
          ></input>
          <h5>{user.email}</h5>
          {showPassword === false ? (
            <div>
              <input
                name="password"
                type="password"
                defaultValue={user.password}
                onChange={onChange}
              ></input>
              <button onClick={() => setShowPassword(true)}>
                비밀번호 보이기
              </button>
            </div>
          ) : (
            <div>
              <input
                name="password"
                type="text"
                defaultValue={user.password}
                onChange={onChange}
              ></input>
              <button onClick={() => setShowPassword(false)}>
                비밀번호 가리기
              </button>
            </div>
          )}

          <button onClick={() => onSubmit}>수정 완료!</button>
          <button onClick={() => setUserReTouch(true)}>수정 취소</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
