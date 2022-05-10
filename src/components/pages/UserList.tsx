import { memo, useCallback, useEffect, VFC } from "react";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import { toUsersRecord } from "../../types/converts/toUserView";
import { useAllUsers } from "../../hooks/transaction/useUserSelectAll";
import { UserGrid } from '../organisms/UserGrid';

export const UserList: VFC = memo(() => {
  const navigate = useNavigate();

  const { getUsers, users, loading } = useAllUsers();

  useEffect(() => {
    getUsers();
  }, []);

  const onClickAddUser = () => {
    navigate('/user-list/add');
  }

  return (
    <>
      <header>
        <Button variant="contained" size="medium" onClick={onClickAddUser}>
          追加
        </Button>
      </header>
      <main>
        <div style={{ height: "80vh", width: '100%' }}>
          <UserGrid users={toUsersRecord(users)}></UserGrid>
        </div>
      </main>
    </>
  );
});