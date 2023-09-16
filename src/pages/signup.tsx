import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import Container from "components/Container";

type InputValue = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toggleToolTip, setToggleToolTip] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
  } = useForm<InputValue>();

  const watchPassword = watch("password");

  const signup = async (data: InputValue) => {
    try {
      const { error, message } = await (
        await fetch("/api/users/signup", {
          method: "POST",
          body: JSON.stringify(data),
        })
      ).json();

      if (error) {
        alert(message);
        return;
      }

      alert("회원 가입에 성공했습니다!");
      router.push("/login");
    } catch (e) {
      alert("회원 가입에 실패했습니다.");
    }
  };

  return (
    <Container>
      <form
        className="flex flex-col w-full"
        onSubmit={handleSubmit(async (data) => {
          await signup(data);
        })}
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
        <label className="flex items-center">
          비밀번호
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
              <div className="absolute top-0 h-auto p-2 text-xs bg-white border border-gray-100 rounded left-8 dark:text-white dark:bg-zinc-800 w-80">
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
          placeholder="비밀번호"
          className="px-4 py-2 mt-2 mb-4 border border-gray-400 rounded dark:border dark:border-white focus:outline-rose-300 dark:focus:outline-rose-800"
          maxLength={15}
          {...register("password", {
            required: "비밀번호를 입력하세요.",
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
            validate: {
              isMatchPassword: (confirm) =>
                confirm === watchPassword || "비밀번호가 일치하지 않습니다.",
            },
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
          className="px-4 py-2 mt-10 text-white cursor-pointer rounded-3xl bg-rose-400 disabled:cursor-default disabled:bg-rose-200 dark:disabled:bg-rose-400"
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
    </Container>
  );
};

export default Signup;
