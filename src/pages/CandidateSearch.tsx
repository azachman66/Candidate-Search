import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from "../interfaces/Candidate.interface.tsx";

const CandidateSearch = () => {

  const gitHub = searchGithub();
  const githubUser = searchGithubUser(Candidate);

  return (<>
  <h1>Candidate Search</h1>
  <main>
    <p>Name: {Candidate.username}</p>
    <p>Location: {Candidate.location}</p>
    <p>Email: {Candidate.email}</p>
  </main>
  </>
  );
};

export default CandidateSearch;
