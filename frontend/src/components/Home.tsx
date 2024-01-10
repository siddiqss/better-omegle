import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [name, setName] = useState<string>();

  return (
    <div>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <Link to={`/room?name=${name}`} onClick={()=>{}}>Join</Link>
    </div>
  );
}

export default Home;
