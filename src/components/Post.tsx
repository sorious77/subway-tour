import Link from "next/link";

interface PostProps {
  title: string;
  content: string;
  thumbnail?: string;
  id: string;
}

const Post = ({ title, content, thumbnail, id }: PostProps) => {
  return (
    <Link href={{ pathname: `/post/${id}` }}>
      <div className="flex w-full mb-10">
        <div className="w-1/6 h-40 rounded-lg shadow bg-red-50" />
        <div className="flex flex-col justify-center w-5/6 pl-4">
          <div className="text-2xl">{title}</div>
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
