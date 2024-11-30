import { useEffect, useState } from "react";
import useAppToast from "./useAppToasts";
import { getAllPosts } from "@/lib/appwrite";

export const useAppWrite = <T>(fn: () => Promise<T>) => {
  const [data, setData] = useState<T | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const showToast = useAppToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fn();
      // there any use since this hool use to fetch different methods
      // else we neec to create seperate hooks for each fetch and use their type
      setData(response as any);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      showToast({ text: errorMessage, type: "danger" });
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};
