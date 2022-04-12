import axios from "axios";
import { useCallback, useState } from "react";
import { job } from "./../../types/api/job";

// 全件取得
export const useAllJobs = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [jobs, setJobs] = useState<Array<job>>([]);

  const getAllJobs = useCallback(() => {
    setLoading(true);

    axios
      .get<Array<job>>("http://localhost:3001/job")
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        console.log("職業取得に失敗しました");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { getAllJobs, loading, jobs };
};
