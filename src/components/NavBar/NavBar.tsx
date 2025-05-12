import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <Link to={'/board'}>Board</Link>
    </div>
  );
};

export default NavBar;
