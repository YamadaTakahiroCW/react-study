import axios from "axios";
import { useCallback, useState } from "react";
import { interest } from "./../../types/api/interest";

// 全件取得
export const useAllInterests = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [interests, setInterests] = useState<Array<interest>>([]);

  const getAllInterests = useCallback(() => {
    setLoading(true);

    axios
      .get<Array<interest>>("http://localhost:3001/interest")
      .then((res) => {
        setInterests(res.data);
      })
      .catch((err) => {
        console.log("趣味取得に失敗しました");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { getAllInterests, loading, interests };
};
