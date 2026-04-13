export default async function handler(req, res) {
  try {
    const response = await fetch('http://204.168.233.75:8080/monitor_log.json', {
      headers: { 'User-Agent': 'ALC-Hub/1.0' },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      return res.status(502).json({ error: `VPS returned ${response.status}` });
    }
    const data = await response.json();
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.json(data);
  } catch (err) {
    return res.status(502).json({ error: err.message });
  }
}
