export const API_URL = import.meta.env.VITE_API_URL || '';

export const api = {
  getFleet: async () => {
    if (!API_URL) return null;
    const res = await fetch(`${API_URL}/api/fleet`);
    if (!res.ok) throw new Error('Failed to fetch fleet');
    return res.json();
  },
  getFlights: async () => {
    if (!API_URL) return null;
    const res = await fetch(`${API_URL}/api/flights`);
    if (!res.ok) throw new Error('Failed to fetch flights');
    return res.json();
  },
  getOperators: async () => {
    if (!API_URL) return null;
    const res = await fetch(`${API_URL}/api/operators`);
    if (!res.ok) throw new Error('Failed to fetch operators');
    return res.json();
  },
  createLog: async (logInfo: any) => {
    if (!API_URL) return null;
    const res = await fetch(`${API_URL}/api/logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logInfo)
    });
    if (!res.ok) throw new Error('Failed to create log');
    return res.json();
  }
};
