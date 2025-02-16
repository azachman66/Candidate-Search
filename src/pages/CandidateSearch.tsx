import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from "../interfaces/Candidate.interface.tsx";

interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
};

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                // Replace with your API call
                const response: User[] = await searchGithub();
                const userInfo = response[0];
                const data = await searchGithubUser(userInfo.login);
                setCandidates(data);
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        fetchCandidates();
    }, []);

    const CandidateCard: React.FC<{ candidate: Candidate }> = ({ candidate }) => {
      return (
          <div>
              <img src={candidate.avatar} alt={`${candidate.name}'s avatar`} />
              <h2>{candidate.name}</h2>
              <p>{candidate.username}</p>
              <p>{candidate.location}</p>
              <p>{candidate.email}</p>
              <a href={candidate.html_url}>Profile</a>
              <p>{candidate.company}</p>
          </div>
      );
  };

  return (<>
  <h1>Candidate Search</h1>
  <main>
  {candidates.map(candidate => (
            <CandidateCard key={candidate.username} candidate={candidate} />
        ))}
  </main>
  </>
  );
};


export default CandidateSearch;
