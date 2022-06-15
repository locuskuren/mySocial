import { Link } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import { useSelector } from '../../hooks/useTypedSelector';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

import './PostInteractionBar.scss';

interface Props {
  id: string;
  likes: string[];
}

const PostInterActionBar: React.FC<Props> = ({ id, likes }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { likePost, unlikePost } = useActions();

  return (
    <div className="interaction-bar">
      <div className="buttons">
        {currentUser && !likes.includes(currentUser.user._id) && (
          <FavoriteBorderOutlinedIcon
            className="interaction-button"
            onClick={() => {
              likePost(currentUser.token, id);
            }}
          />
        )}
        {currentUser && likes.includes(currentUser.user._id) && (
          <FavoriteIcon
            interaction-button
            className="interaction-button"
            id="red"
            onClick={() => {
              unlikePost(currentUser.token, id);
            }}
          />
        )}
        <Link to={`/posts/${id}`}>
          <ChatBubbleOutlineOutlinedIcon className="interaction-button" />
        </Link>
      </div>
      <div className="likes">{likes.length} likes</div>
    </div>
  );
};

export default PostInterActionBar;
