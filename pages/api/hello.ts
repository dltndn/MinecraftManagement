import { NextApiRequest, NextApiResponse } from "next";
import { checkUser_db } from "@/etc/executeDB";

const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Boob' },
];
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const ischecked = await checkUser_db({user_id: "", user_password: ""})
    console.log("ischecked", ischecked)
    res.status(200).json(users);
  }
