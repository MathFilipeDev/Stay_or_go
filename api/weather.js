export default async function handler(req, res) {

  const apiKey = process.env.WEATHER_API_KEY;
  const city = req.query.city || "Sao Paulo";

  try {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=en`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return res.status(200).json({
      city: data.location.name,
      temp: Math.round(data.current.temp_c),
      condition: data.current.condition.text
    });

  } catch (err) {
    return res.status(500).json({ error: "Weather API failed" });
  }
}
