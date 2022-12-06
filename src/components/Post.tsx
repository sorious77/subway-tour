import Image from "next/image";
import Link from "next/link";

interface PostProps {
  title: string;
  content: string;
  thumbnail?: string;
  id: string;
}

const Post = ({ title, content, thumbnail, id }: PostProps) => {
  return (
    <Link href={`/post/${id}`}>
      <div className="flex w-full mb-10">
        <div className="w-1/6 h-40 bg-red-50" />
        <div className="flex flex-col justify-center w-5/6 pl-4">
          <div className="text-2xl">{title}</div>
          <div>
            {content
              .concat(
                ` 모든 국민은 보건에 관하여 국가의 보호를 받는다. 형사피의자 또는 형사피고인으로서 구금되었던 자가 법률이 정하는 불기소처분을 받거나 무죄판결을 받은 때에는 법률이 정하는 바에 의하여 국가에 정당한 보상을 청구할 수 있다. 
              제2항의 재판관중 3인은 국회에서 선출하는 자를, 3인은 대법원장이 지명하는 자를 임명한다. 탄핵결정은 공직으로부터 파면함에 그친다. 그러나, 이에 의하여 민사상이나 형사상의 책임이 면제되지는 아니한다.`
              )
              .substring(0, 150)}
            ...
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
