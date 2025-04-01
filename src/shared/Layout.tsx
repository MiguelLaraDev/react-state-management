import Filter from "../components/Filter";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='w-full min-h-dvh flex flex-col'>
      <Header />

      <main className='w-full h-full flex flex-col gap-8 p-8 md:w-[1440px] md:mx-auto'>
        <h1 className='font-bold text-5xl'>Title</h1>

        <div className='w-full h-full flex flex-row gap-4'>
          <div className='w-80 h-full'>
            <Filter />
          </div>

          <div className='flex flex-grow flex-1 border border-green-500'>{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
