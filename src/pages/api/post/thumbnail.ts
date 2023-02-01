import type { NextApiRequest, NextApiResponse } from "next";
import Handler from "../../../libs/Handler";
import axios from "axios";
import formidable from "formidable";

const receiveFile = (req: NextApiRequest) =>
  new Promise<File>((resolve, reject) => {
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

const ThumbnailHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const file = await receiveFile(req);

    const formData = new FormData();

    formData.append("image", file);

    const result = await axios.post(
      `${process.env.BASE_URL}/thumbnail`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("result", result);
    res.send("success");
  } catch (e) {
    res.json({ e });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default Handler("POST", ThumbnailHandler);
