import { memo, useCallback, ChangeEvent, useState, useEffect, VFC } from "react";
import { createFilterOptions, Autocomplete, Stack, Box, Card, CardActions, SelectChangeEvent, CardContent, Checkbox, FormControlLabel, FormGroup, FormLabel, MenuItem, Radio, RadioGroup, Select, TextField, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import { Gender, GenderList } from './../../types/consts/Gender'

import { UserRecord } from "./../../types/view/UserRecord";
import { useAllJobs } from "./../../hooks/master/useJob";
import { useAllInterests } from "./../../hooks/master/interest";
import { useUserAdd } from "../../hooks/transaction/useUserAdd";

const filter = createFilterOptions({stringify: (option: {title: string, inputValue: string}) => `${option.inputValue} ${option.title}`});

export const UserAdd: VFC = memo((props) => {
  const navigate = useNavigate();

  const { getAllJobs, jobs: mstJobs, loading: loadingJob } = useAllJobs();
  const { getAllInterests, interests: mstInterests, loading: loadingInterests } = useAllInterests();
  const { userAdd, saving } = useUserAdd();

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
    const user = new UserRecord();
    user.id = id;
    user.mailAddress = email;
    user.age = Number.parseInt(age);
    user.gender = Number.parseInt(gender);
    user.job.push(job);
    user.hobby = [...interests];

    userAdd(user);
  };
  const onClickCancel = () => {
    navigate('/user-list');
  }

  return (
    <main>
      <div>
        <Box sx={{ width: '100%' }}>
          <Stack spacing={2}>
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
            <Autocomplete
              id="tags"
              size="small"
              options={[]}
              getOptionLabel={(option: {title: string, inputValue: string}) => {
                if (typeof option === 'string') {
                  return option;
                }
                if (option.inputValue) {
                  return option.inputValue;
                }
                return option.title;
              }}
              multiple
              freeSolo
              clearOnBlur
              filterOptions={(options: {title: string, inputValue: string}[], params) => {
                const filtered = filter(options, params);
                if (params.inputValue !== '') {
                  filtered.push({
                    inputValue: params.inputValue,
                    title: params.inputValue,
                  });
                }
                return filtered;
              }}
              onChange={(e, v) => setInterests(v.map((tag) => {
                  if (typeof tag === 'string') {
                    return tag;
                  }
                  if (tag.inputValue) {
                    return tag.inputValue;
                  }
                  return tag.title;
                }))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="tag"
                  variant="standard"
                />
              )}
            />
          </Stack>
          <Button variant="contained" size="medium" onClick={onClickAdd}>追加</Button>
          <Button variant="contained" size="medium" onClick={onClickCancel}>戻る</Button>
        </Box>
      </div>
    </main>
  );
});