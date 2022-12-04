import { userState } from "components/states";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { useState } from "react";

type InputValue = {
  email: string;
  password: string;
};

const Login = () => {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<InputValue>();

  const handleLogin = async (data: InputValue) => {
    try {
      setLoading(true);

      const result = await (
        await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify(data),
        })
      ).json();

      if (result.error) {
        console.log("Login fail");
        setError(result.error);
      } else {
        setUser(result);
        router.push("/");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <form
        className="flex flex-col w-1/3"
        onSubmit={handleSubmit(async (data) => {
          handleLogin(data);
        })}
      >
        <label>이메일 주소</label>
        <input
          type="text"
          placeholder="이메일 주소"
          className="px-4 py-2 mt-2 mb-4 border border-gray-400 rounded dark:border dark:border-white focus:outline-sky-300 dark:focus:outline-sky-800"
          {...register("email", {
            required: "이메일 주소를 입력하세요.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "이메일 형식에 맞지 않습니다.",
            },
          })}
        />
        {errors.email && (
          <small
            role="alert"
            className="flex items-center mb-4 -mt-2 text-red-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-1">{errors.email.message}</span>
          </small>
        )}
        <label>비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호"
          className="px-4 py-2 mt-2 mb-4 border border-gray-400 rounded dark:border dark:border-white focus:outline-sky-300 dark:focus:outline-sky-800"
          {...register("password", {
            required: "비밀번호를 입력하세요.",
          })}
        />
        {errors.password && (
          <small
            role="alert"
            className="flex items-center mb-4 -mt-2 text-red-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-1">{errors.password.message}</span>
          </small>
        )}
        <input
          type="submit"
          value="로그인하기"
          className="px-4 py-2 text-white cursor-pointer rounded-3xl bg-sky-400 disabled:cursor-default disabled:bg-sky-200 dark:bg-sky-600 dark:disabled:bg-sky-400"
          disabled={isSubmitting || loading}
        />
        {error && (
          <small role="alert" className="flex items-center mt-4 text-red-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-1">{error}</span>
          </small>
        )}
      </form>
    </div>
  );
};

export default Login;
