import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { db } from '@/config/db'

export async function POST(req){
    const {usuario, password} = await req.json()

    const [rows] = await db.query('SELECT * FROM usuarios WHERE username = ?', usuario)

    if (rows.length === 0) return new Response(
        JSON.stringify({error: 'Usuario no existe'}),
        {
            status: 400
        }
    )
    const {id, username, password_hash, email, nombre, apellido} = rows[0]

    const isPasswordMatch = await bcrypt.compare(password, password_hash)
    if (!isPasswordMatch) return new Response(
        JSON.stringify({error: 'Password invalido'}),
        {
            status: 400
        }
    )

    const payload = {
        id,
        username,
        email,
        nombre,
        apellido
    }

    const options = {
        expiresIn: '1hr'
    }

    const token = jwt.sign(payload, process.env.SECRET_KEY, options)
    return Response.json({token, payload})
} 