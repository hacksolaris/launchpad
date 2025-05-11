"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const API_BASE_URL = "http://localhost:5045";

interface CounterResponse {
  count: number;
}

export function Counter() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCount = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/counter`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch: ${response.status} ${response.statusText}`
        );
      }
      const data: CounterResponse = await response.json();
      setCount(data.count);
    } catch (e: any) {
      console.error("Error fetching count:", e);
      setError(`Error fetching count: ${e.message}`);
      setCount(null);
    } finally {
      setLoading(false);
    }
  };

  const incrementCount = async () => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/counter/increment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Good practice, though not strictly needed for this simple POST
        },
      });
      if (!response.ok) {
        throw new Error(
          `Failed to increment: ${response.status} ${response.statusText}`
        );
      }
      const data: CounterResponse = await response.json();
      setCount(data.count);
    } catch (e: any) {
      console.error("Error incrementing count:", e);
      setError(
        `Error incrementing count: ${e.message}. Is the API running at ${API_BASE_URL}?`
      );
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <div className="p-6 border rounded-lg shadow-lg bg-card text-card-foreground max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">API Counter</h2>
      {loading && (
        <p className="text-center text-muted-foreground">Loading...</p>
      )}
      {error && <p className="text-center text-red-500 my-2">{error}</p>}
      {count !== null && (
        <p className="text-5xl font-bold text-center my-4 text-primary">
          {count}
        </p>
      )}
      <div className="flex flex-col space-y-2">
        <Button
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md transition-colors"
          onClick={incrementCount}
        >
          Increment
        </Button>
        <Button
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-2 px-4 rounded-md transition-colors"
          onClick={fetchCount}
        >
          Refresh Count
        </Button>
      </div>
    </div>
  );
}
