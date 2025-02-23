import { useEffect, useState } from "react";

const SavedCandidates = () => {
  const [users,setUsers] = useState([] as any)
  function getStorage() {
    const storedUsers = localStorage.getItem("users")
    if (storedUsers) {
      return JSON.parse(storedUsers);
    }
    else {
      return [];
    }
  }
  useEffect(() => {
    const getUsers = async () => {
      const parsedUsers = await getStorage();
      setUsers(parsedUsers);
    }

    getUsers();
  }, [])

  return (
    <>
      <h1>Saved Candidates</h1>
      {/* <table></table> */}
      {users.length > 0 && users.map((element:any) => (<div>
        {element.login}
        <img src={element.avatar_url} alt="" />
        </div>))}
    </>
  );
};

export default SavedCandidates;
