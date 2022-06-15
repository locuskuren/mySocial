import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

import './CreatePost.scss';

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const token = useSelector((state) => state.user.currentUser?.token);
  const { error, loading, post } = useSelector((state) => state.singlePost);
  const { createPost } = useActions();
  let navigate = useNavigate();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview('');
    }

    return () => {
      setPreview('');
      setTitle('');
    };
  }, [image]);

  const handleClick = () => {
    token && image && createPost(token, image, title, navigate);
    !error && !loading && post && navigate(`/posts/${post._id}`);
  };

  const shareButton = (
    <button
      className="share"
      disabled={!image || !title || !token || loading}
      onClick={handleClick}
    >
      Share
    </button>
  );

  return (
    <div className="create-post">
      <div className="wrapper">
        <div className="top-bar">
          <span className="title">Create new post</span>
          {shareButton}
        </div>
        <div className="upload-container">
          <div className="img-box">
            {!image && (
              <input
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
            )}
            {preview && <img src={preview} alt="random's new post" />}
          </div>
          <div className="comment-box">
            <div className="profile">
              <img
                src="https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png"
                alt="my-profile"
              />
              <span>random</span>
            </div>
            <textarea
              placeholder="Write caption..."
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="share-container">{shareButton}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
