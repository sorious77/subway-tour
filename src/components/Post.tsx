import Link from "next/link";

interface PostProps {
  title: string;
  content: string;
  thumbnail?: string;
  id: string;
  author: string;
  createdAt: string;
}

const getDate = (timestamp: string) => {
  const date = new Date(timestamp);

  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const Post = ({
  title,
  content,
  thumbnail,
  id,
  author,
  createdAt,
}: PostProps) => {
  return (
    <Link href={{ pathname: `/post/${id}` }}>
      <div className="flex w-full mb-10">
        {/* <div className="w-1/5 h-40 rounded-lg shadow bg-red-50" /> */}
        <div className="flex flex-col justify-center w-5/6 pl-4">
          <div>
            <span className="text-2xl">{title}</span>
            <span> - {author}</span>
            <span className="text-sm"> / {getDate(createdAt)}</span>
          </div>
          <div>
            {content.length > 150
              ? content.substring(0, 150).concat("...")
              : content}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
