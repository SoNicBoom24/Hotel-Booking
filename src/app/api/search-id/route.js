import { mock } from "../db";
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const hotel = mock.find((hotel) => hotel.id === parseInt(id, 10));
    if (hotel) {
      return new Response(JSON.stringify(hotel), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ error: "Hotel not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return new Response(JSON.stringify({ error: "No id provided" }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}
