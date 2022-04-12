import { memo, useCallback, ChangeEvent, useState, useEffect, VFC } from "react";
import { Card, CardActions, SelectChangeEvent, CardContent, Checkbox, FormControlLabel, FormGroup, FormLabel, MenuItem, Radio, RadioGroup, Select, TextField, Button } from "@mui/material";

import { Gender, GenderList } from './../../types/consts/Gender'

import { useAllJobs } from "./../../hooks/master/useJob";
import { useAllInterests } from "./../../hooks/master/interest";
import { useAddUser } from "../../hooks/user/userAddUser";

export const UserList: VFC = memo((props) => {
  const { getAllJobs, jobs: mstJobs, loading: loadingJob } = useAllJobs();
  const { getAllInterests, interests: mstInterests, loading: loadingInterests } = useAllInterests();

  const [id, setId] = useState<string>('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");
  const [interests, setInterests] = useState<Array<string>>([]);

  useEffect(() => {
    // マスタ取得
    getAllJobs();
    getAllInterests();
  }, []);

  const onChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangeAge = (e: ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
  };
  const onChangeGender = (e: ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };
  const onChangeJob = (e: SelectChangeEvent<string>) => {
    setJob(e.target.value);
  };
  const onChangeInterests = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      interests.push(e.target.value);
    }
    else {
      const removeIndex = interests.indexOf(e.target.value);
      if (removeIndex >= 0) {
        interests.splice(removeIndex, 1);
      }
    }

    setInterests(interests);
  };
  const onClickAdd = () => {
    useAddUser
  }

  return (
    <main>
      <div style={{ height: "80vh", width: '100%' }}>
        <Card>
          <CardContent>
            <TextField
              required
              id="user-id"
              label="ID"
              defaultValue={id}
              onChange={onChangeId}
            />
            <TextField
              required
              id="user-email"
              label="メールアドレス"
              defaultValue={email}
              onChange={onChangeEmail}
            />
            <TextField
              required
              id="user-age"
              label="年齢"
              defaultValue={age}
              onChange={onChangeAge}
            />
            <FormLabel id="demo-row-radio-buttons-group-label">性別</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={onChangeGender}
            >
              {
                Object.entries(GenderList).map(([key, value]) => {
                  <FormControlLabel value={value.id} control={<Radio />} label={value.name} />
                })
              }
            </RadioGroup>
            <Select
              labelId="user-job"
              id="user-job"
              value={age}
              label="職業"
              onChange={onChangeJob}
            >
              {
                mstJobs.map((mstJob) => {
                  <MenuItem value={mstJob.id}>{mstJob.name}</MenuItem>
                })
              }
            </Select>
            <FormGroup>
              {
                mstInterests.map((mstInterest) => {
                  <FormControlLabel control={<Checkbox value={mstInterest.id} onChange={onChangeInterests} />} label={mstInterest.name} />
                })
              }
            </FormGroup>
            <Button onClick={onClickAdd}>追加</Button>
          </CardContent>
          <CardActions>
            
          </CardActions>
        </Card>
      </div>
    </main>
  );
});