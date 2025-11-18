import { NextResponse } from "next/server";
import { isAdmin } from "../../../../../../../lib/CsrfSessionManagement";
import { cancelRental } from "../../../../../../../lib/RentalManagementSystem";

export async function POST(_: Request, context: Promise<{ params: { id: string } }>) {
  const { params } = await context;
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { error } = cancelRental(params.id);
  if (error) return NextResponse.json({ error }, { status: 404 });
  return NextResponse.json({ ok: true });
}
