import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />

      <main>
        <h1>Title</h1>

        {children}
      </main>
    </div>
  );
};

export default Layout;
