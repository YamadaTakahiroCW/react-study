import axios from "axios";
import { useCallback, useState } from "react";
import { User } from "../../types/api/User";

export const useUserSelect = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const userSelect = useCallback((id: number) => {
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

  return { userSelect, loading, user };
}
