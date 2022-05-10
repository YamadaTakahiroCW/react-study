import { User } from "../api/User"
import { UserRecord } from "../view/UserRecord"

const toUsersApi = (usersView: UserRecord[]): User[] => {
  const result = usersView.map( (userView: UserRecord) => {
    const user = toUserApi(userView);
    return user;
  })

  return result;
}

const toUserApi = (userView: UserRecord): User => {
  const result = {
    id: Number.parseInt(userView.id),
    mail: userView.mailAddress,
    age: userView.age,
    gender: userView.gender,
    job: '',
    interests: [...userView.hobby]
  } as User;
  
  return result;
}

export { toUsersApi, toUserApi };
