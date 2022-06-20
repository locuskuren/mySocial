import { useEffect } from 'react';
import { useSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

import ImageCard from '../../components/ImageCard/ImageCard';
import Sidebar from '../../components/Sidebar/Sidebar';
import './HomeExplore.scss';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const HomeExplore = () => {
  const pathname = window.location.pathname;
  const { error, loading, posts } = useSelector((state) =>
    pathname === '/' ? state.homePosts : state.explorePosts
  );
  const token = useSelector((state) => state.user.currentUser?.token);
  const { getPosts } = useActions();

  useEffect(() => {
    token && getPosts(pathname, token);
  }, [token, getPosts, pathname, posts]);

  return (
    <div className="home-explore">
      <div className="imagecard-container">
        {((loading && !posts[0]) || error) && (
          <div className="loading-error-container">
            {loading && <LoadingSpinner />}
            {error && <div className="info-message">{error}</div>}
          </div>
        )}
        {posts && !error && (
          <>
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
          </>
        )}
      </div>
      <div className="sidebar-container">
        <Sidebar />
      </div>
    </div>
  );
};

export default HomeExplore;
