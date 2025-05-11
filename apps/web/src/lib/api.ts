const API_BASE_URL = "http://localhost:5045";

interface CounterResponse {
  count: number;
}

export const fetchCount = async (): Promise<CounterResponse> => {
  const response = await fetch(`${API_BASE_URL}/counter`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch count: ${response.status} ${response.statusText}`
    );
  }
  return response.json();
};

export const incrementCount = async (): Promise<CounterResponse> => {
  const response = await fetch(`${API_BASE_URL}/counter/increment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to increment count: ${response.status} ${response.statusText}. Is the API running at ${API_BASE_URL}?`
    );
  }
  return response.json();
};
