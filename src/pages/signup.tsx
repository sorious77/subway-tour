import { useForm } from "react-hook-form";
import { useState } from "react";

type InputValue = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
};

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<InputValue>();

  return (
    <div className="flex items-center justify-center h-full flex-col">
      <form
        className="flex flex-col w-1/3"
        onSubmit={handleSubmit(async (data) => {})}
      >
        <label>이메일</label>
        <input
          type="text"
          placeholder="email@gmail.com"
          className="px-4 py-2 mt-2 mb-4 border border-gray-400 rounded dark:border dark:border-white focus:outline-rose-300 dark:focus:outline-rose-500"
          {...register("email", {
            required: "이메일을 입력하세요.",
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
        <label>닉네임</label>
        <input
          type="text"
          placeholder="닉네임"
          maxLength={10}
          {...register("nickname", {
            pattern: {
              value: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
              message: "닉네임은 한글, 영어, 숫자만 사용 가능합니다.",
            },
            maxLength: {
              value: 10,
              message: "닉네임은 최대 10자리 입니다.",
            },
          })}
          className="px-4 py-2 mt-2 mb-4 border border-gray-400 rounded dark:border dark:border-white focus:outline-rose-300 dark:focus:outline-rose-800"
        />
        {errors.nickname && (
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
            <span className="ml-1">{errors.nickname.message}</span>
          </small>
        )}
        <label>비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호"
          className="px-4 py-2 mt-2 mb-4 border border-gray-400 rounded dark:border dark:border-white focus:outline-rose-300 dark:focus:outline-rose-800"
          maxLength={15}
          {...register("password", {
            required: "비밀번호를 입력하세요.",
            pattern: {
              value:
                /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
              message: "특수문자, 문자, 숫자를 각각 한 글자 이상 입력하세요.",
            },
            minLength: {
              value: 8,
              message: "비밀번호는 최소 8자리 이상입니다.",
            },
            maxLength: {
              value: 15,
              message: "비밀번호는 최대 15자리 입니다.",
            },
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
        <label>비밀번호 확인</label>
        <input
          type="password"
          placeholder="비밀번호"
          className="px-4 py-2 mt-2 mb-4 border border-gray-400 rounded dark:border dark:border-white focus:outline-rose-300 dark:focus:outline-rose-800"
          maxLength={15}
          {...register("passwordConfirm", {
            required: "비밀번호 확인을 입력하세요.",
          })}
        />
        {errors.passwordConfirm && (
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
            <span className="ml-1">{errors.passwordConfirm.message}</span>
          </small>
        )}
        <input
          type="submit"
          value="회원가입하기"
          className="mt-10 px-4 py-2 text-white cursor-pointer rounded-3xl bg-rose-400 disabled:cursor-default disabled:bg-rose-200 dark:disabled:bg-rose-400"
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

export default Signup;
