import classNames from "classnames";
import { Link } from "react-router-dom";

const Breadcrumb = () => {
  return (
    <div
      className={classNames(
        "flex flex-row item-center gap-2",
        "[&>a]:bg-neutral-100 [&>a]:text-xs [&>a]:py-1 [&>a]:px-2",
        "[&>a]:flex [&>a]:flex-row [&>a]:item-center",
        "[&>a]:hover:bg-neutral-200"
      )}
    >
      <Link to=''>Home</Link>
      <Link to=''>Instruments</Link>
    </div>
  );
};

export default Breadcrumb;
