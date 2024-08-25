import { db } from "@/config/db";
import bcrypt from "bcrypt";

export async function GET(){
    const [rows] = await db.query('SELECT * FROM usuarios')
    
    return Response.json(rows)
}

// CREAR USUARIO
export async function POST(req) {
  try {
    const { nombre, apellido, email, usuario, password, confirmPassword } =
      await req.json();

    // si los password matchean
    if (password === confirmPassword) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await db.query("INSERT INTO usuarios SET ?", {
        username: usuario,
        password_hash: hashedPassword,
        email,
        nombre,
        apellido,
      });
      return Response.json({ message: "Usuario creado con exito" });
    } else {
      return new Response(
        JSON.stringify({ error: "Las contraseñas no coinciden." }),
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }), {
      status: 400,
    });
  }
}
