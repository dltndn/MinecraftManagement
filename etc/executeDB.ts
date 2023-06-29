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

export const hasBeenUsed_db = async () => {
    const connection = await dbConnect();
    try {
        const rows = await connection.query(`SELECT NAME FROM USER WHERE ISUSING = 1;`);
        if (rows[0] === undefined) {
            return null
        } else {
            return rows[0].NAME
        }
    } catch(e) {
        return null
    } finally {
        await connection.end();
    }
}