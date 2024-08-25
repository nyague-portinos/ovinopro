import { db } from "@/config/db"

export async function GET(){

    const [rows] = await db.query('SELECT NOW()')

    return new Response(
        JSON.stringify({now: rows[0]['NOW()']}),
        {
            status: 200
        }
    )
}