import { User } from "../api/User"
import { UserRecord } from "../view/UserRecord"

const toUsersRecord = (users: User[]): UserRecord[] => {
  const result = users.map( (user: User) => {
    const userRecord = toUserRecord(user);
    return userRecord;
  })

  return result;
}

const toUserRecord = (user: User): UserRecord => {
  const userRecord = new UserRecord();
  userRecord.id = user.id.toString();
  userRecord.mailAddress = user.mail;
  userRecord.age = user.age;
  userRecord.gender = user.gender;
  userRecord.job.push(user.job);
  userRecord.hobby = user.interests;

  return userRecord;
}

export { toUsersRecord, toUserRecord };
