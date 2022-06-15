import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import { useSelector } from '../../hooks/useTypedSelector';

import PostProfile from '../../components/PostProfile/PostProfile';
import PostComments from '../../components/PostComments/PostComemments';
import PostForm from '../../components/PostForm/PostForm';
import PostInterActionBar from '../../components/PostInteractionBar/PostInteractionBar';

import './Post.scss';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const Post = () => {
  const { id } = useParams();
  const { post, error, loading } = useSelector((state) => state.singlePost);
  const { getPost, resetPost } = useActions();

  useEffect(() => {
    id && getPost(id);

    return () => {
      resetPost();
    };
  }, [id, getPost, resetPost]);

  return (
    <div className="post-wrapper">
      {loading && !post && (
        <div className="loading-error-wrapper">
          <LoadingSpinner />
        </div>
      )}
      {error && <div className="loading-error-wrapper">{error}</div>}
      {!post && !loading && !error && (
        <div className="no-post">
          It appears that post you are looking for doesn't exist or has been
          deleted, please contact admin in case there should be something on
          this page
        </div>
      )}
      {post && (
        <div className="post">
          <img
            src={post.photo}
            alt={`${post.postedBy.name}'s post'`}
            className="post-image"
          />
          <div className="details">
            <PostProfile
              userId={post.postedBy._id}
              pic={post.postedBy.pic}
              name={post.postedBy.name}
              id={post._id}
            />
            <PostComments
              comments={post.comments}
              showComments={true}
              author={post.postedBy}
              title={post.title}
              id={post._id}
            />
            <PostInterActionBar id={post._id} likes={post.likes} />
            <PostForm id={post._id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
