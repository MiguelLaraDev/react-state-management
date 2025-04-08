import { Outlet } from "react-router-dom";

import classNames from "classnames";
import Filter from "./Filter";
import Header from "./Header";

const Layout = () => {
  const title = "TODO: Use a second outlet for the title";

  return (
    <div className='relative w-full flex flex-col overflow-hidden'>
      <Header />

      <main
        className={classNames(
          "w-full h-full flex flex-col gap-4 p-4 mt-12 2xl:w-[1412px] 2xl:mx-auto",
          "md:gap-12 md:p-8"
        )}
      >
        <h1 className='font-bold text-2xl md:text-5xl'>
          {title}
          {/* <Outlet /> */}
        </h1>

        <div className='w-full h-full flex flex-row gap-4'>
          <div
            className={classNames(
              "absolute top-0 left-0 right-0 bottom-0 z-50 pointer-events-none",
              "md:relative md:w-1/4"
            )}
          >
            <Filter />
          </div>

          <div className='w-full flex flex-grow flex-1'>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
