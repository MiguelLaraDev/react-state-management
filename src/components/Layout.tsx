import classNames from "classnames";
import Filter from "../components/Filter";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div
      className={classNames(
        "relative",
        "w-full flex flex-col"
        // "border-4 border-red-500"
        // "max-h-[100vh] overflow-hidden"
      )}
    >
      <Header />

      <main className='w-full h-full flex flex-col gap-12 p-8  mt-12 2xl:w-[1412px] 2xl:mx-auto'>
        <h1 className='font-bold text-5xl'>{title}</h1>

        <div className='w-full h-full flex flex-row gap-4'>
          <div className='relative w-1/4 h-full'>
            <Filter />
          </div>

          <div className='flex flex-grow flex-1'>{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
