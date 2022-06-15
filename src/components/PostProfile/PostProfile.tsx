import { Link } from 'react-router-dom';
import { useSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

import './PostProfile.scss';

interface Props {
  userId: string;
  pic: string;
  name: string;
  id: string;
}

const PostProfile: React.FC<Props> = ({ userId, pic, name, id }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { userFollow, userUnFollow, deletePost } = useActions();

  return (
    <div className="post-profile">
      <Link to={`/profiles/${userId}`}>
        <div className="info">
          <img src={pic} alt={`${name}'s avatar`} className="profile-image" />
          <span>{name}</span>
        </div>
      </Link>
      {currentUser &&
        currentUser.user.following.includes(userId) &&
        currentUser.user._id !== userId && (
          <button onClick={() => userUnFollow(currentUser.token, userId)}>
            Unfollow
          </button>
        )}
      {currentUser &&
        !currentUser.user.following.includes(userId) &&
        currentUser.user._id !== userId && (
          <button onClick={() => userFollow(currentUser.token, userId)}>
            Follow
          </button>
        )}
      {currentUser && currentUser.user._id === userId && (
        <button
          style={{ color: 'red' }}
          onClick={() => deletePost(currentUser.token, id)}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default PostProfile;
