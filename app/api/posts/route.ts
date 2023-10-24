import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { title, description, author } = body;
  const supabase = createRouteHandlerClient({ cookies: () => cookies() });

  const { error } = await supabase
    .from("posts")
    .insert({ title: title, description: description, author: author });

  if (error) {
    return NextResponse.json(error, { status: 400 });
  }

  return NextResponse.json("Post created successfully", { status: 201 });
}
