export async function handler() {
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "🏓 Pong! Netlify Function is working ✅",
        timestamp: new Date().toISOString(),
      }),
    };
  }