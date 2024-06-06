import { ReactElement } from "react";
import MicroFrontend from "../components/frontend";

export async function getStaticProps() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const repo = await res.json()
  console.log("🚀 ~ getStaticProps ~ repo:", repo)
  return {
    props: { repo },
  };
}

export default function MicroFrontendPage(props: { repo: any }): ReactElement {
  return <MicroFrontend data={{ data: { language: 'english' } }} />;
}
