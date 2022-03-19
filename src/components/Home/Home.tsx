import React, { FC } from "react";

interface HomeProps {}

const Home: FC<HomeProps> = () => (
  <div className="sm:grid sm:grid-cols-6 sm:h-full sm:p-5">
    <div className="col-span-2 h-full">
      <div className="m-5 h-full bg-zinc-200 rounded-lg shadow-md">
        <h1 className="text-center p-3 sm:pt-5 text-xl">Languages / Frameworks</h1>
      </div>
    </div>
    <div className="col-span-4 h-full">
      <div className="m-5 h-full rounded-lg shadow-md bg-zinc-200">
        <h1 className="text-center p-3 sm:pt-5 text-xl">All JavaScript Snippets</h1>
      </div>
    </div>
  </div>
);

export default Home;
