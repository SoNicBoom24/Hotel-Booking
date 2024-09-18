import { mock } from "../db";
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location");

  if (!location) {
    return new Response(JSON.stringify(mock), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  const result = mock.filter((hotel) => hotel.location === location);

  if (result.length > 0) {
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response(JSON.stringify(mock), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
