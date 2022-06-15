import { useEffect } from 'react';
import { useSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

import ImageCard from '../../components/ImageCard/ImageCard';
import Sidebar from '../../components/Sidebar/Sidebar';
import './HomeExplore.scss';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const HomeExplore = () => {
  const { error, loading, posts } = useSelector((state) => state.posts);
  const token = useSelector((state) => state.user.currentUser?.token);
  const { getPosts, resetPosts } = useActions();
  const pathname = window.location.pathname;

  useEffect(() => {
    token && getPosts(pathname, token);

    return () => {
      resetPosts();
    };
  }, [token, getPosts, resetPosts, pathname]);

  return (
    <div className="home-explore">
      {(loading || error) && (
        <div className="loading-error-container">
          {loading && <LoadingSpinner />}
          {error && <div className="info-message">{error}</div>}
        </div>
      )}
      {posts && !loading && !error && (
        <div className="imagecard-container">
          {posts.length === 0 && !loading && !error && (
            <span className="info-message">
              Please follow more people to see posts here
            </span>
          )}
          {posts.map((post) => (
            <ImageCard
              key={post._id}
              id={post._id}
              userId={post.postedBy._id}
              pic={post.postedBy.pic}
              name={post.postedBy.name}
              photo={post.photo}
              title={post.title}
              author={post.postedBy}
              likes={post.likes}
            />
          ))}
        </div>
      )}
      <div className="sidebar-container">
        <Sidebar />
      </div>
    </div>
  );
};

export default HomeExplore;
