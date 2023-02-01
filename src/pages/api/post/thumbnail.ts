import type { NextApiRequest, NextApiResponse } from "next";
import Handler from "../../../libs/Handler";
import axios from "axios";
import formidable from "formidable";

const ThumbnailHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const filePromise = new Promise<File>((resolve, reject) => {
      const form = new formidable.IncomingForm({
        // maxFileSize: 5 * 1024 * 1024,
        // keepExtensions: true
      });

      form.parse(req, (err, _, files) => {
        const file: File = Array.isArray(files) ? files[0] : files;

        if (err) return reject(err);
        return resolve(file);
      });
    });

    let fileData: File;
    filePromise
      .then((file) => {
        fileData = file;
      })
      .catch((error) => {
        throw new Error("");
      });

    const formData = new FormData();

    formData.append("image", fileData!);

    const result = await axios.post(
      `${process.env.BASE_URL}/thumbnail`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // const result = await axios({
    //   url: `${process.env.BASE_URL}/thumbnail`,
    //   data: formData,
    //   method: "post",
    // });

    console.log("result", result);

    res.send("success");

    // const fileData: formidable.Files = await new Promise((resolve, reject) => {
    //   const form = new formidable.IncomingForm({
    //     maxFileSize: 5 * 1024 * 1024,
    //     keepExtensions: true,
    //     maxFiles: 1,
    //   });

    //   form.parse(req, (err, fields, files) => {
    //     if (err) return reject(err);

    //     return resolve(files);
    //   });
    // });

    // const formData = new FormData();
    // const file = Array.isArray(fileData.file)
    //   ? fileData.file[0]
    //   : fileData.file;

    // // formData.append("thumbnail", file);

    // const url =
    //   "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg";

    // return res.status(200).json({ url });

    // const result = await axios({
    //     url:`${process.env.BASE_URL}/posts/thumbnail`,
    //     data: req.body,
    //     method: "post"
    // })
  } catch (e) {}
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default Handler("POST", ThumbnailHandler);
