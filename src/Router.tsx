import { Routes, Route } from 'react-router';
import Board from './pages/Board/Board.Container';

const Router = () => {
  return (
    <div className="flex w-full">
      <Routes>
        <Route
          path="board"
          element={<Board />}
        />
      </Routes>
    </div>
  );
};

export default Router;
