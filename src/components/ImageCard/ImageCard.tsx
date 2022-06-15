import PostProfile from '../PostProfile/PostProfile';
import PostComments from '../PostComments/PostComemments';
import PostForm from '../PostForm/PostForm';
import PostInterActionBar from '../PostInteractionBar/PostInteractionBar';
import { User } from '../../api/api-data-interfaces';

import './ImageCard.scss';

interface Props {
  id: string;
  userId: string;
  name: string;
  pic: string;
  photo: string;
  title: string;
  author: User;
  likes: string[];
}

const ImageCard: React.FC<Props> = ({
  id,
  userId,
  name,
  pic,
  photo,
  author,
  title,
  likes,
}) => {
  return (
    <div className="image-card">
      <PostProfile userId={userId} pic={pic} name={name} id={id} />
      <img src={photo} alt={`${name}'s post'`} />
      <PostInterActionBar id={id} likes={likes} />
      <PostComments
        showComments={false}
        author={author}
        title={title}
        id={id}
      />
      <PostForm id={id} />
    </div>
  );
};

export default ImageCard;
