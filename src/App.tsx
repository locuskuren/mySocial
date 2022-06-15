import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from './hooks/useTypedSelector';

import Auth from './pages/Auth/Auth';
import Header from './components/Header/Header';
import HomeExplore from './pages/HomeExplore/HomeExplore';
import Post from './pages/Post/Post';
import Profile from './pages/Profile/Profile';
import CreatePost from './pages/CreatePost/CreatePost';

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Router>
      {currentUser && <Header />}
      {window.location.pathname !== '/' && !currentUser && <Header />}
      <Routes>
        {!currentUser && <Route index element={<Auth />} />}
        {currentUser && <Route index element={<HomeExplore />} />}
        {currentUser && <Route path="/explore" element={<HomeExplore />} />}
        <Route path="/profiles/:id" element={<Profile />} />
        <Route path="/posts/:id" element={<Post />} />
        {currentUser && <Route path="/createpost" element={<CreatePost />} />}
        <Route
          path="*"
          element={
            <main style={{ textAlign: 'center', marginTop: '100px' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
