import classNames from "classnames";
import { Outlet } from "react-router-dom";

import Breadcrumb from "./Breadcrumb";
import Header from "./Header";
import MainTitle from "./MainTitle";
import FiltersWrapper from "./filters/FiltersWrapper";

const Layout = () => {
  return (
    <div className='relative w-full flex flex-col overflow-hidden'>
      <Header />

      <main
        className={classNames(
          "w-full h-full flex flex-col gap-4 p-4 mt-12 2xl:w-[1024px] 2xl:mx-auto",
          "md:gap-12 md:p-8",
          "lg:px-20 2xl:px-0"
        )}
      >
        <Breadcrumb />

        <MainTitle />

        <div className='w-full h-full flex flex-row gap-4'>
          <FiltersWrapper />

          <div className='w-full flex flex-grow flex-1'>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
