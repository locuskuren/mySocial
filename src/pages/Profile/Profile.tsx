import { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useActions } from '../../hooks/useActions';
import { useSelector } from '../../hooks/useTypedSelector';

import './Profile.scss';

const Profile = () => {
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { id } = useParams();
  const { error, loading, profile } = useSelector(
    (state) => state.singleProfile
  );
  const currentUser = useSelector((state) => state.user.currentUser);
  const {
    getProfile,
    profileReset,
    userUpdatePic,
    userLogout,
    userFollow,
    userUnFollow,
  } = useActions();

  useEffect(() => {
    id && getProfile(id);

    return () => {
      profileReset();
    };
  }, [id, getProfile, profileReset, currentUser?.user.pic]);

  useEffect(() => {
    if (image && currentUser) {
      userUpdatePic(currentUser.token, image);
      setImage(null);
    }
  }, [image, currentUser, userUpdatePic]);

  return (
    <div className="profile-page-wrapper">
      {loading && <LoadingSpinner />}
      {error && <div className="error">{error}</div>}
      {profile && (
        <div className="profile-page">
          <div className="profile">
            <img src={profile.user.pic} alt={`${profile.user.name}'s avatar`} />
            <div className="details">
              <span className="profile-name">{profile.user.name}</span>
              <div className="buttons">
                {currentUser &&
                  id !== currentUser.user._id &&
                  id &&
                  !currentUser.user.following.includes(id) && (
                    <button onClick={() => userFollow(currentUser.token, id)}>
                      Follow
                    </button>
                  )}
                {currentUser &&
                  id !== currentUser.user._id &&
                  id &&
                  currentUser.user.following.includes(id) && (
                    <button onClick={() => userUnFollow(currentUser.token, id)}>
                      Unfollow
                    </button>
                  )}
                {currentUser && id === currentUser.user._id && (
                  <>
                    <input
                      style={{ display: 'none' }}
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target?.files?.[0];
                        if (file && file.type.substr(0, 5) === 'image') {
                          setImage(file);
                        } else {
                          setImage(null);
                        }
                      }}
                    />
                    <button
                      onClick={() =>
                        fileInputRef.current && fileInputRef.current.click()
                      }
                    >
                      Update Profile Picture
                    </button>
                    <button onClick={() => userLogout()}>Log Out</button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="info-bar">
            <div className="info-cell">
              <span className="digits">{profile.posts.length}</span>
              <span className="text">posts</span>
            </div>
            <div className="info-cell">
              <span className="digits">{profile.user.followers.length}</span>
              <span className="text">followers</span>
            </div>
            <div className="info-cell">
              <span className="digits">{profile.user.following.length}</span>
              <span className="text">following</span>
            </div>
          </div>
          {profile.posts.length === 0 && (
            <div className="no-posts">User doesn't have any posts</div>
          )}
          <div className="posts">
            {profile.posts.map((post) => (
              <div className="image-container">
                <Link to={`/posts/${post._id}`}>
                  <img src={post.photo} alt={`${post.postedBy.name}'s post`} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
