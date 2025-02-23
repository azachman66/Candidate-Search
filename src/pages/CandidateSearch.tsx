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
  const [candidate, setCandidates] = useState<Candidate | null>(null);
    const [users, setUsers] = useState([] as any);
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response: User[] = await searchGithub();
                setUsers(response);
                const userInfo = response[0];
                console.log(userInfo);
                const data = await searchGithubUser(userInfo.login);
                setCandidates(data);
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        fetchCandidates();
    }, []);

useEffect(() => {
 if (currentIndex === 0) {
  return
 }
 const fetchCandidates = async () => {
 const data = await searchGithubUser(users[currentIndex].login);
  setCandidates(data);
 }
 fetchCandidates();
}, [currentIndex])
 
function addUser() {
  setCurrentIndex(currentIndex + 1);
  const parsedUsers = getStorage();
  parsedUsers.push(candidate);
  localStorage.setItem("users", JSON.stringify(parsedUsers));
}
function nextUser() {
  setCurrentIndex(currentIndex + 1);
}

function getStorage() {
  const storedUsers = localStorage.getItem("users")
  if (storedUsers) {
    return JSON.parse(storedUsers);
  }
  else {
    return [];
  }
}

return (<>
  <h1>Candidate Search</h1>
  <main>
  {candidate ? (
          <>
            <img src={candidate.avatar_url} alt={`${candidate.username}'s avatar`} />
            <h2>{candidate.username}</h2> <i>{candidate.name}</i>
            <p>Location: {candidate.location}</p>
            <p>Email: {candidate.email}</p>
            <a href={candidate.html_url}>Profile</a>
            <p>Company: {candidate.company}</p>
            <button onClick={addUser}>+</button> <button onClick={nextUser}>-</button>
          </>
        ) : (
          <p>Loading candidate data...</p>
        )}
  </main>
  </>
  );
}



export default CandidateSearch;
