import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import ExploreIcon from '@mui/icons-material/Explore';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { useSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

import './Header.scss';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Header: React.FC = () => {
  useLocation(); //function is here to rerender comp on url change
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [searching, setSearching] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const { profiles, error, loading } = useSelector((state) => state.profiles);
  const { searchProfiles, searchProfilesStart, searchProfilesReset } =
    useActions();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (searchTerm === '') {
      searchProfilesReset();
    }

    if (searchTerm !== '') {
      const timer = setTimeout(async () => {
        setDebouncedTerm(searchTerm);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [searchTerm, searchProfilesReset]);

  useEffect(() => {
    if (debouncedTerm !== '') {
      searchProfiles(debouncedTerm);
    }
  }, [debouncedTerm, searchProfiles]);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }

      setSearching(false);
    };
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  return (
    <div className="header">
      <div className="content">
        <div className="logo">
          <Link to="/">mySocial</Link>
        </div>
        {currentUser && (
          <div className="search-bar">
            <input
              placeholder="Search"
              type="text"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                searchProfilesStart();
              }}
              onClick={() => setSearching(true)}
            />
            {searching && (
              <>
                <div className="dropdown" ref={ref}>
                  <div className="search-results">
                    <span>Search Results</span>
                    {profiles.length > 0 &&
                      searchTerm !== '' &&
                      profiles.map((profile) => (
                        <Link
                          to={`/profiles/${profile._id}`}
                          onClick={() => setSearching(false)}
                        >
                          <div className="result" key={profile._id}>
                            <img
                              src={profile.pic}
                              alt={`${profile.name}-profile`}
                            />
                            <span>{profile.name}</span>
                          </div>
                        </Link>
                      ))}

                    {profiles.length === 0 && !loading && searchTerm !== '' && (
                      <div className="no-results">No results found.</div>
                    )}
                    {loading && (
                      <div className="loading-wrapper">
                        <LoadingSpinner />
                      </div>
                    )}
                    {error && (
                      <div className="no-results" style={{ color: 'red' }}>
                        {error}
                      </div>
                    )}
                    {searchTerm === '' && (
                      <div className="no-results">
                        Please enter searchterm to find profile
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        {currentUser && (
          <nav>
            <Link to="/">
              {window.location.pathname === '/' ? (
                <HomeIcon className="icon" />
              ) : (
                <HomeOutlinedIcon className="icon" />
              )}
            </Link>
            <Link to="/explore">
              {window.location.pathname === '/explore' ? (
                <ExploreIcon className="icon" />
              ) : (
                <ExploreOutlinedIcon className="icon" />
              )}
            </Link>
            <Link to="/createpost">
              {window.location.pathname === '/createpost' ? (
                <AddBoxIcon className="icon" />
              ) : (
                <AddBoxOutlinedIcon className="icon" />
              )}
            </Link>
            <Link to={`profiles/${currentUser?.user._id}`}>
              <img
                src={currentUser?.user.pic}
                alt={`${currentUser?.user.name}'s avatar`}
              />
            </Link>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Header;
