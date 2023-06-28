import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/etc/dbConnector";

const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Boob' },
];
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(users);
  }

