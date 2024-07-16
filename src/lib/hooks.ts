import { useEffect, useState } from "react";
import { EJobItem, JobItem } from "./types";
import { BASE_URL } from "./constants";

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return [jobItemsSliced, isLoading] as const;
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

export function useJobItem(id: number | null) {
  const [jobItem, setJobItem] = useState<EJobItem | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`${BASE_URL}/${id}`).
      then(resp => {
        if (!resp.ok) {
          return
        }
        return resp.json();
      }).then(data => {
        setJobItem(data.jobItem);
      })
  }, [id])
  return jobItem;
}