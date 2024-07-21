import { useEffect, useState } from "react";
import { EJobItem, JobItem } from "./types";
import { BASE_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";

const fetchJobItem = async (id: number | null): Promise<EJobItem> => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data.jobItem;
}

const fetchJobItems = async (searchText: string): Promise<JobItem[]> => {
  const response = await fetch(`${BASE_URL}?search=${searchText}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data.jobItems;
}

export function useJobItem(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ['job-item', id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!id,
      onError: handleError
    }
  );

  return [data, isInitialLoading] as const;
}

export function useJobItems(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ['job-items', searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!searchText,
      onError: handleError
    }
  );

  return [data, isInitialLoading] as const;
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null)
  useEffect(() => {
    const handleHashChange = () => {
      setActiveId(+window.location.hash.slice(1))
    }
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])
  return activeId;
}

export function useDebounce<T>(value: T, delay = 250): T {
  const [debouncedSearchText, setDebouncedSearchText] = useState(value)
  useEffect(() => {
    const timerID = setTimeout(() => {
      setDebouncedSearchText(value);
    }, delay);
    return () => clearTimeout(timerID)
  }, [value, delay])
  return debouncedSearchText;
}