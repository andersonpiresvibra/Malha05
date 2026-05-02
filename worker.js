const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const method = request.method;

    // Handle CORS preflight requests
    if (method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    try {
      // Endpoint to check health
      if (url.pathname === "/") {
        return new Response(JSON.stringify({ message: "JETFUEL API REST is running!", endpoints: ["/api/fleet", "/api/flights", "/api/operators"] }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // API: Get Fleet
      if (url.pathname === "/api/fleet" && method === "GET") {
        const { results } = await env.db.prepare("SELECT * FROM fleet").all();
        return new Response(JSON.stringify(results), {
           status: 200,
           headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // API: Get Flights
      if (url.pathname === "/api/flights" && method === "GET") {
        const { results } = await env.db.prepare("SELECT * FROM flights").all();
        return new Response(JSON.stringify(results), {
           status: 200,
           headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // API: Get Operators
      if (url.pathname === "/api/operators" && method === "GET") {
        const { results } = await env.db.prepare("SELECT * FROM operators").all();
        return new Response(JSON.stringify(results), {
           status: 200,
           headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // API: Create event logs
      if (url.pathname === "/api/logs" && method === "POST") {
        const body = await request.json();
        const { id, flight_id, action_type, description } = body;
        await env.db.prepare(
          "INSERT INTO daily_logs (id, flight_id, action_type, description) VALUES (?, ?, ?, ?)"
        ).bind(id || crypto.randomUUID(), flight_id, action_type, description).run();
        
        return new Response(JSON.stringify({ success: true }), {
           status: 201,
           headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Not found
      return new Response(JSON.stringify({ error: "Endpoint não encontrado" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};
