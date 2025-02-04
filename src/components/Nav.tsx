import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
  <>
    <div className="nav">
      <div className="nav-item">
        <div className="nav-link" onClick={() => navigate('/')}>
          Home
        </div>
      </div>
      <div className="nav-item">
        <div className="nav-link" onClick={() => navigate('/CandidateSearch')}>
          Candidate Search
        </div>
      </div>
      <div className="nav-item">
        <div className="nav-link" onClick={() => navigate('/SavedCandidates')}>
          Saved Candidates
        </div>
      </div>
    </div>
  </>
  );
};

export default Nav;
