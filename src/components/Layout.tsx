import classNames from "classnames";
import { Outlet } from "react-router-dom";

import Breadcrumb from "@components/Breadcrumb";
import Header from "@components/Header";
import MainTitle from "@components/MainTitle";
import FiltersWrapper from "@components/filters/FiltersWrapper";

const Layout = () => {
  return (
    <div className="relative w-full flex flex-col overflow-hidden">
      <Header />

      <main
        className={classNames(
          "w-full h-full flex flex-col gap-4 p-4 mt-12",
          "md:gap-12 md:p-8",
          "lg:w-[1024px] lg:mx-auto lg:py-8 lg:px-0",
        )}
      >
        <Breadcrumb />

        <MainTitle />

        <div className="w-full h-full flex flex-row gap-4">
          <FiltersWrapper />

          <div className="w-full flex flex-grow flex-1">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
