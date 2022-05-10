import axios from "axios";
import { useCallback, useState } from "react";

import { User as userApi } from "../../types/api/User";
import { UserRecord as userView } from "../../types/view/UserRecord";
import { toUserApi } from './../../types/converts/toUserApi';

export const useAddUser = () => {
  const [saving, setSaving] = useState<boolean>(false);
  
  const addUser = useCallback((srcUser: userView) => {

    console.log(srcUser);

    const userApi = toUserApi(srcUser);

    console.log(userApi);

    setSaving(true);

    axios
      .post("http://localhost:3001/users", {
        "user_id": userApi.id,
        "mail": userApi.mail,
        "age": userApi.age,
        "gender": userApi.gender,
        "job": userApi.job,
        "interests": [...userApi.interests]
      })
      .finally(() => {
        setSaving(false);
      });
  }, []);

  return { addUser, saving };
};
