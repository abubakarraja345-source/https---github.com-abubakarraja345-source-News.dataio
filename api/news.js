export default async function handler(req, res) {
  const { category, q } = req.query;

  const url = new URL("https://newsdata.io/api/1/news");
  url.searchParams.append("apikey", process.env.NEWS_API_KEY);
  url.searchParams.append("country", "pk");
  if (category) url.searchParams.append("category", category);
  if (q) url.searchParams.append("q", q);

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
