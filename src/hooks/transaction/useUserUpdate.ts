import axios from "axios";
import { useCallback, useState } from "react";

import { User as apiUser } from "../../types/api/User";
import { UserRecord as viewUser } from "../../types/view/UserRecord";

// ユーザ新規登録
export const useUserUpdate = () => {
  const [saving, setSaving] = useState<boolean>(false);
  
  const addUser = useCallback((user: viewUser) => {
    setSaving(true);

    axios
      .post("http://localhost:3001/users", {
        "user_id": "test1",
        "mail": "test1@example.jp",
        "age": 20,
        "gender": 1,
        "job": "エンジニア",
        "interests": [
            "ゲーム",
            "プログラミング"
        ]
      })
      .finally(() => {
        setSaving(false);
      });
  }, []);

  return { addUser, saving };
};
