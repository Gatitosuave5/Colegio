import { NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:3001";

/* GET: listar salones o buscar por código */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Buscar por código
    if (searchParams.get("codigo")) {
      const codigo = searchParams.get("codigo");
      const req = await fetch(`${BACKEND_URL}/api/salones?codigo=${codigo}`);
      const data = await req.json();
      return NextResponse.json(data);
    }

    // Listar todos
    const req = await fetch(`${BACKEND_URL}/api/salones`);
    const data = await req.json();
    return NextResponse.json(data);

  } catch (err) {
    return NextResponse.json(
      { error: "Error obteniendo salones" },
      { status: 500 }
    );
  }
}

/* POST: crear salón */
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

  } catch {
    return NextResponse.json(
      { error: "Error creando salón" },
      { status: 500 }
    );
  }
}

/* PUT: editar */
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

  } catch {
    return NextResponse.json(
      { error: "Error editando salón" },
      { status: 500 }
    );
  }
}

/* DELETE */
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

  } catch {
    return NextResponse.json(
      { error: "Error eliminando salón" },
      { status: 500 }
    );
  }

  
}
