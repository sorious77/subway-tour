import { useForm } from "react-hook-form";
import { useState } from "react";
import AuthCheck from "libs/AuthCheck";

interface InputValue {
  nickname: string;
  password: string;
  newPassword: string;
}

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toggleToolTip, setToggleToolTip] = useState(false);

  AuthCheck();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<InputValue>();

  return (
    <div className="flex items-center justify-center h-full flex-col">
      <form
        className="flex flex-col w-1/3"
        onSubmit={handleSubmit(async (data) => {
          if (!data.nickname && !data.newPassword) {
            setError("닉네임이나 새 비밀번호 둘 중 하나는 필수 입력입니다.");

            return;
          }

          // update api 호출
        })}
      >
        <label>새 닉네임</label>
        <input
          type="text"
          placeholder="새 닉네임"
          className="px-4 py-2 mt-2 mb-4 border border-gray-400 rounded dark:border dark:border-white focus:outline-rose-300 dark:focus:outline-rose-500"
          maxLength={8}
          {...register("nickname", {
            minLength: {
              value: 2,
              message: "닉네임은 2글자 이상 8글자 이하로 설정해주세요",
            },
            maxLength: {
              value: 8,
              message: "닉네임은 2글자 이상 8글자 이하로 설정해주세요",
            },
          })}
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
        <label>기존 비밀번호</label>
        <input
          type="password"
          placeholder="기존 비밀번호"
          className="px-4 py-2 mt-2 mb-4 border border-gray-400 rounded dark:border dark:border-white focus:outline-rose-300 dark:focus:outline-rose-800"
          maxLength={15}
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
        <label className="flex items-center">
          새 비밀번호
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 ml-2 text-rose-400 dark:text-white"
              onMouseEnter={() => {
                setToggleToolTip(true);
              }}
              onMouseLeave={() => {
                setToggleToolTip(false);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            {toggleToolTip && (
              <div className="absolute text-xs top-0 left-8 bg-white dark:text-white dark:bg-zinc-800 border border-gray-100 rounded w-80 h-auto p-2">
                비밀번호는 8자 이상 15자 이하로 설정해주세요.
                <br />
                영문자, 특수문자, 숫자를 각각 한 글자 이상 입력해주세요.
                <br />
                특수문자는 !, @, #, $, %, ^, &, +, = 만 가능합니다.
              </div>
            )}
          </div>
        </label>
        <input
          type="password"
          placeholder="새 비밀번호"
          className="px-4 py-2 mt-2 mb-4 border border-gray-400 rounded dark:border dark:border-white focus:outline-rose-300 dark:focus:outline-rose-800"
          maxLength={15}
          {...register("newPassword", {
            pattern: {
              value:
                /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
              message: "영문자, 특수문자, 숫자를 각각 한 글자 이상 입력하세요.",
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
        {errors.newPassword && (
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
            <span className="ml-1">{errors.newPassword.message}</span>
          </small>
        )}
        <input
          type="submit"
          value="정보 수정"
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
