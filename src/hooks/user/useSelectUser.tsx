import axios from "axios";
import { useCallback, useState } from "react";
import { User } from "../../types/api/User";

// 全件取得
export const useAllUsers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<User>>([]);

  const getUsers = useCallback(() => {
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

  return { getUsers, loading, users };
};

// IDで抽出
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
