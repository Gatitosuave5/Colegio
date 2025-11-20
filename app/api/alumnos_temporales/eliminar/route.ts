import { NextResponse } from "next/server";

const BACKEND_URL = "http://34.130.10.63:3001";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await fetch(`${BACKEND_URL}/api/alumnos_temporales/eliminar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true, 
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("❌ Error al eliminar alumno:", error);
    return NextResponse.json({ success: false, error: "No eliminado" });
  }
}
