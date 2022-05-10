import axios from "axios";
import { useCallback, useState } from "react";
import { User } from "../../types/api/User";

export const useUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const getUser = useCallback((id: number) => {
    setLoading(true);

    axios
      .get<User | null>(`http://localhost:3001/users/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log("ユーザ取得に失敗しました");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { getUser, loading, user };
}
