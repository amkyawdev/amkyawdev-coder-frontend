import { NextRequest, NextResponse } from "next/server";

const HUGGING_FACE_API_URL = process.env.HUGGING_FACE_API_URL || "https://api-inference.huggingface.co/models";
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY || "";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ endpoint: string }> }
) {
  const { endpoint } = await params;
  
  try {
    const response = await fetch(`${HUGGING_FACE_API_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to proxy request" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ endpoint: string }> }
) {
  const { endpoint } = await params;
  
  try {
    const body = await request.json();
    
    const response = await fetch(`${HUGGING_FACE_API_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to proxy request" },
      { status: 500 }
    );
  }
}
