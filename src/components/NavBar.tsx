import Link from "next/link";
import { userState } from "./states";
import { useRecoilState } from "recoil";
import { useTheme } from "next-themes";

const NavBar = () => {
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useRecoilState(userState);

  console.log(theme);

  return (
    <div className="flex items-center justify-between px-6 py-5 dark:bg-gray-800">
      <div className="text-2xl">
        <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">
          Subway Tour
        </Link>
      </div>
      <div className={`flex justify-between ${user ? "w-1/3" : "w-1/6"}`}>
        <button
          className="cursor-pointer"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 rounded-full hover:bg-gray-600"
            >
              <path
                fillRule="evenodd"
                d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 rounded-full hover:bg-gray-100"
            >
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
            </svg>
          )}
        </button>
        <div className="px-4 text-white bg-black cursor-pointer dark:text-black dark:bg-white rounded-xl hover:bg-gray-700 dark:hover:bg-gray-200">
          {user ? (
            <span
              onClick={() => {
                setUser(null);
              }}
            >
              로그아웃
            </span>
          ) : (
            <Link href="/login">로그인</Link>
          )}
        </div>
        {user && (
          <>
            <Link
              href="/gacha"
              className="hover:text-gray-700 dark:hover:text-gray-200"
            >
              여행
            </Link>
            <Link
              href="/list/1"
              className="hover:text-gray-700 dark:hover:text-gray-200"
            >
              다이어리
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
