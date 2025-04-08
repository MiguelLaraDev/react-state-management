import classNames from "classnames";
import { Outlet } from "react-router-dom";

import Filter from "../components/Filter";
import Header from "./Header";

const Layout = () => {
  const title = "TODO: Use a second outlet for the title";

  return (
    <div className={classNames("relative", "w-full flex flex-col")}>
      <Header />

      <main className='w-full h-full flex flex-col gap-12 p-8  mt-12 2xl:w-[1412px] 2xl:mx-auto'>
        <h1 className='font-bold text-5xl'>
          {title}
          {/* <Outlet /> */}
        </h1>

        <div className='w-full h-full flex flex-row gap-4'>
          <div className='relative w-1/4 h-full'>
            <Filter />
          </div>

          <div className='flex flex-grow flex-1'>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
