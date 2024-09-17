// lib/getSessionClient.ts
export const getSession = async () => {
  const res = await fetch('/api/session');
  if (!res.ok) {
    throw new Error('Failed to fetch session');
  }
  const data = await res.json();
  return data.session;
};
