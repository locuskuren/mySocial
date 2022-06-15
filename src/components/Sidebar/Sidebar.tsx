import { useState, useEffect } from 'react';
import { mySocialAPi } from '../../api';
import { Link } from 'react-router-dom';
import { useSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

import './Sidebar.scss';
import { User } from '../../api/api-data-interfaces';

const Sidebar = () => {
  const [recomendedUsers, setRecomendedUsers] = useState<User[]>();
  const { userLogout } = useActions();
  const user = useSelector((state) => state.user.currentUser?.user);

  useEffect(() => {
    const getRecomendedUsers = async () => {
      const { data } = await mySocialAPi.get('/newfive');
      setRecomendedUsers(data);
    };
    getRecomendedUsers();
    return () => {
      setRecomendedUsers(undefined);
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="profile">
        <Link to={`/profiles/${user?._id}`}>
          <div className="details">
            <img
              src={user?.pic}
              alt={`${user?.name}'s avatar`}
              className="user-profile-image"
            />
            <span>{user?.name}</span>
          </div>
        </Link>
        <button onClick={() => userLogout()}>Log Out</button>
      </div>
      <div className="suggestions">
        <div className="title">Newest Users</div>
        {recomendedUsers &&
          recomendedUsers.map((user) => (
            <div className="profile" key={user._id}>
              <Link to={`/profiles/${user._id}`}>
                <div className="details">
                  <img
                    src={user.pic}
                    alt={`${user.name}'s profile`}
                    className="suggested-user-image"
                  />
                  <span>{user.name}</span>
                </div>
              </Link>
              <Link to={`/profiles/${user._id}`}>
                <button>View Profile</button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
