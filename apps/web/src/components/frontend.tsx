import React from 'react';

type FrontendProps = {
  data: any;
}

export default function Frontend({ data }: FrontendProps) {
  console.log("🚀 ~ Frontend ~ data:", data)
  return (
    <>
      <h1>This is Frontend web app</h1>
      <h1>Data from getStaticProps</h1>
    </>
  );
}
