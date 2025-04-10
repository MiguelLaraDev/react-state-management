import classNames from "classnames";
import { Outlet } from "react-router-dom";

import Filter from "./Filter";
import Header from "./Header";
import MainTitle from "./MainTitle";

const Layout = () => {
  return (
    <div className='relative w-full flex flex-col overflow-hidden'>
      <Header />

      <main
        className={classNames(
          "w-full h-full flex flex-col gap-4 p-4 mt-12 2xl:w-[1024px] 2xl:mx-auto",
          "md:gap-12 md:px-0 md:pt-8"
        )}
      >
        {/* TODO: Add breascrumb here... */}

        <MainTitle />

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
