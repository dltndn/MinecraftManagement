import { dbConnect } from "./dbConnector";
import { User_db, SetUsing_db, UserSignUp_db } from "@/app/util/interface/compInterface";

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

export const setUsing_db = async (submitData: SetUsing_db) => {
    const connection = await dbConnect();
    try {
        const rows = await connection.query(`UPDATE USER SET ISUSING = ${submitData.usage} WHERE NAME = '${submitData.user_name}';`);
        return true
    } catch(e) {
        return false
    } finally {
        await connection.end();
    }
}

export const signUp_db = async (submitData: UserSignUp_db) => {
    const connection = await dbConnect();
    try {
        const rows = await connection.query(`INSERT INTO USER (NAME, PASSWORD, ID, ISUSING)
        VALUES ('${submitData.user_name}', '${submitData.user_password}', '${submitData.user_id}', 0);
        `);
        return true
    } catch(e) {
        console.log(e)
        return false
    } finally {
        await connection.end();
    }
}

export const getGuestBook_db = async () => {
    const connection = await dbConnect();
    try {
        const rows = await connection.query(`SELECT G.BOOKID AS bookId, G.MESSAGE AS message, G.TIMESTAMP AS timeStamp, U.NAME AS name, CAST(COUNT(C.COMMENTID) AS CHAR) AS comment_count
        FROM GUESTBOOK G
        INNER JOIN USER U ON G.USERID = U.USERID
        LEFT JOIN COMMENT C ON G.BOOKID = C.BOOKID
        GROUP BY G.BOOKID, G.USERID, U.NAME
        ORDER BY G.BOOKID DESC
        LIMIT 5;               
        `)
        if (rows[0] === undefined) {
            return null
        } else {
            return rows
        }
    } catch (e) {
        return null
    } finally {
        await connection.end();
    }
}

export const getComments_db = async (submitData: UserSignUp_db) => {
    const connection = await dbConnect();
    try {

    } catch (e) {

    } finally {
        await connection.end();
    }
}