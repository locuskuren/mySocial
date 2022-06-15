import { useState } from 'react';
import { useSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

import './PostForm.scss';

interface Props {
  id: string;
}

const PostForm: React.FC<Props> = ({ id }) => {
  const [comment, setComment] = useState('');
  const token = useSelector((state) => state.user.currentUser?.token);
  const { commentPost } = useActions();

  return (
    <form className="post-form" onSubmit={() => console.log('click')}>
      <input
        placeholder="Add comment..."
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />
      <button
        disabled={comment === '' || !token}
        onClick={(e) => {
          e.preventDefault();
          token && commentPost(token, comment, id);
          setComment('');
        }}
      >
        Post
      </button>
    </form>
  );
};

export default PostForm;
