"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCount, incrementCount } from "@/lib/api";

export function Counter() {
  const queryClient = useQueryClient();

  const {
    data: countData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["counter"],
    queryFn: fetchCount,
  });

  const incrementMutation = useMutation({
    mutationFn: incrementCount,
    onSuccess: (newData) => {
      queryClient.setQueryData(["counter"], newData);
    },
    onError: (error: Error) => {
      console.error("Error incrementing count:", error);
    },
  });

  const handleIncrement = () => {
    incrementMutation.mutate();
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="p-6 border rounded-lg shadow-lg bg-card text-card-foreground max-w-sm mx-auto">
      <div className="text-2xl font-semibold mb-4 text-center">API Counter</div>
      {isLoading && (
        <p className="text-center text-muted-foreground">Loading count...</p>
      )}
      {(isError || incrementMutation.error?.message) && (
        <p className="text-center text-red-500 my-2">
          Error: {error?.message || incrementMutation.error?.message}
        </p>
      )}
      {countData?.count !== undefined && !isLoading && !isError && (
        <p className="text-5xl font-bold text-center my-4 text-primary">
          {countData.count}
        </p>
      )}
      <div className="flex flex-col space-y-2">
        <Button
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md transition-colors"
          onClick={handleIncrement}
          disabled={incrementMutation.isPending || isLoading}
        >
          {incrementMutation.isPending ? "Incrementing..." : "Increment"}
        </Button>
        <Button
          className="w-full bg-primary text-secondary-foreground hover:bg-secondary/90 py-2 px-4 rounded-md transition-colors"
          onClick={handleRefresh}
          disabled={isLoading || incrementMutation.isPending}
        >
          Refresh Count
        </Button>
      </div>
    </div>
  );
}
