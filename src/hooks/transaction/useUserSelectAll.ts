import axios from "axios";
import { useCallback, useState } from "react";
import { User } from "../../types/api/User";

export const useUserSelectAll = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<User>>([]);

  const userSelectAll = useCallback(() => {
    setLoading(true);

    axios
      .get<Array<User>>("http://localhost:3001/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("ユーザ取得に失敗しました");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { userSelectAll, loading, users };
};
