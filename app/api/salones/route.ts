import { NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:3001"; // cambiar si usas dominio o IP

// ✅ GET - Obtener lista de salones
export async function GET() {
  try {
    const req = await fetch(`${BACKEND_URL}/api/salones`);
    const data = await req.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "No se pudo conectar al servidor" }, { status: 500 });
  }
}

// ✅ POST - Crear salón
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const req = await fetch(`${BACKEND_URL}/api/salones`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await req.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Error creando salón" }, { status: 500 });
  }
}

// ✅ PUT - Editar salón
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const req = await fetch(`${BACKEND_URL}/api/salones`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await req.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Error editando salón" }, { status: 500 });
  }
}

// ✅ DELETE - Eliminar salón
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const req = await fetch(`${BACKEND_URL}/api/salones`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await req.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Error eliminando salón" }, { status: 500 });
  }
}
