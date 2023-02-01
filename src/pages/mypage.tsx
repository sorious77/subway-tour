import { useForm } from "react-hook-form";

type InputValue = {
  thumbnail: FileList;
};

const MyPage = () => {
  const { register, handleSubmit, watch } = useForm<InputValue>();

  const watchThumbnail = watch("thumbnail");

  const uploadThumbnail = async (data: InputValue) => {
    if (watchThumbnail && watchThumbnail.length > 0) {
      console.log("thumbnail exists");
    } else {
      return;
    }

    const thumbnail = data?.thumbnail[0];

    const formData = new FormData();
    formData.append("image", thumbnail);

    try {
      const result = await fetch("/api/post/thumbnail", {
        method: "POST",
        body: formData,
      });

      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>MyPage</h1>
      <form
        onSubmit={handleSubmit(async (data) => {
          await uploadThumbnail(data);
        })}
      >
        <input
          type="file"
          className="h-16 mt-2 text-center"
          {...register("thumbnail")}
          accept="image/*"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default MyPage;
