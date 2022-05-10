import { memo, VFC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { UserList } from '../components/pages/UserList';
import { UserAdd } from '../components/pages/UserAdd';
import { UserEdit } from '../components/pages/UserEdit';
import { ErrorNotFound } from '../components/pages/ErrorNotFound';

export const Router: VFC = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/user-list" element={<UserList />} />
      <Route path="/user-list/:user-id" element={<UserEdit />} />
      <Route path="/user-list/add" element={<UserAdd />} />
      <Route path="*" element={<ErrorNotFound />} />
    </Routes>
  )
});