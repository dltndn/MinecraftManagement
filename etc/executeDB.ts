import { dbConnect } from "./dbConnector";
import { User_db } from "@/app/util/interface/compInterface";

//** user_id, user_password */
export const checkUser_db = async (submitData: User_db) => {
    const connection = await dbConnect();
    try {
        const rows = await connection.query(`SELECT * FROM USER`);
        for (const row of rows) {
            if (submitData.user_id === row.ID && submitData.user_password === row.PASSWORD) {
                return row.NAME
            }
          }          
        return null
    } catch(e) {
        console.log("error")
        console.log(e)
        return null
    } finally {
        await connection.end();
    }
}