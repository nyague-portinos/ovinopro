import { db } from "@/config/db";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const [rows] = await db.query(
      "SELECT * FROM establecimiento where id_usuario = ?",
      id
    );

    return Response.json(rows);
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }), {
      status: 400,
    });
  }
}
