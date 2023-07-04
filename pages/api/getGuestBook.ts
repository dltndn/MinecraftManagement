import { NextApiRequest, NextApiResponse } from "next";
import { getGuestBook_db } from "@/etc/executeDB";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const result = await getGuestBook_db();
      res.status(200).json({ result });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

