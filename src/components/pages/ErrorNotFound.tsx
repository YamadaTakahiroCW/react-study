import { memo, useCallback, useEffect, VFC } from "react";
import { Link } from 'react-router-dom';

export const ErrorNotFound: VFC = memo(() => {
  return (
    <>
      <h1>ページが存在しません</h1>
      <br /><br /><br />
      <Link to="/">Topページに戻る</Link>
    </>
  );
});
