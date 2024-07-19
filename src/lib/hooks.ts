import { useEffect, useState } from "react";
import { EJobItem, JobItem } from "./types";
import { BASE_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";

const fetchJobItem = async (id: number | null): Promise<EJobItem> => {
  const response = await fetch(`${BASE_URL}/${id}`);
  const data = await response.json();
  return data.jobItem;
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
      onError: () => { }
    }
  );

  return [data, isInitialLoading] as const;
}

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const total = jobItems.length;
  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) return;
    setIsLoading(true);
    fetch(`${BASE_URL}?search=${searchText}`).then(res => {
      if (!res.ok) {
        return
      }
      return res.json()
    }).then(data => {
      setJobItems(data.jobItems);
      setIsLoading(false)
    })
  }, [searchText]);

  return [jobItemsSliced, isLoading, total] as const;
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