import { Link } from 'react-router-dom';
import { User } from '../../api/api-data-interfaces';

import './PostComments.scss';

interface Props {
  comments?: { text: string; postedBy: User }[];
  showComments: boolean;
  title: string;
  author: User;
  id: string;
}

const PostComments: React.FC<Props> = ({
  comments,
  showComments,
  author,
  title,
  id,
}) => {
  return (
    <div className="comments-section">
      <div className="comment">
        <p>
          <span>{author.name}</span> {title}
        </p>
        {!showComments && (
          <Link to={`/posts/${id}`}>
            <span className="view-more">View all comments</span>
          </Link>
        )}
        {showComments &&
          comments &&
          comments.map((comment) => (
            <p>
              <span>{comment.postedBy.name}</span> {comment.text}
            </p>
          ))}
      </div>
    </div>
  );
};

export default PostComments;
