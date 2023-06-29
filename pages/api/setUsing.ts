import { NextApiRequest, NextApiResponse } from "next";
import { setUsing_db } from "@/etc/executeDB";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      const submitData = req.body; // POST 요청의 데이터
      const result = await setUsing_db(submitData);
      res.status(200).json({ result });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

