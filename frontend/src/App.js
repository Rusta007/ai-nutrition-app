import React, { useState, useEffect } from "react";

import IntroPage from "./Component/AnimatedIntro";
import ChatBox from "./Component/ChatBox";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 5000); // intro animation duration
    return () => clearTimeout(timer);
  }, []);

  return <div>{showIntro ? <IntroPage /> : <ChatBox />}</div>;
}

export default App;





