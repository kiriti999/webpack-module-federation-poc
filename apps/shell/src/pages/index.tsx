import { NextPage } from "next";
import { useEffect } from "react";

declare global {
  interface Window {
    app1Url?: string;
    app2Url?: string;
  }
}

const Shell: NextPage = () => {
  useEffect(() => {
      // Client-side-only code
      window.app2Url = "http://127.0.0.1:3001" /*set the global variable for configuration*/
    
  }, [])

  return <h1>This is shell test</h1>;
};

export default Shell;
