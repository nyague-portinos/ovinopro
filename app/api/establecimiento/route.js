import { db } from "@/config/db";

export async function GET() {
  const [rows] = await db.query("SELECT * FROM establecimiento");

  return Response.json(rows);
}

export async function POST(req) {
  try {
    const { nombre, ubicacion, id_usuario } = await req.json();
    const result = await db.query("INSERT INTO establecimiento SET ?", {
      nombre,
      ubicacion,
      id_usuario,
    });

    console.log(result);
    return Response.json({ message: "Establecimiento guardado con exito." });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        error: "Ha ocurrido un error guardando el establecimiento.",
      }),
      {
        status: 400,
      }
    );
  }
}
