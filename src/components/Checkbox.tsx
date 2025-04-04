import classNames from "classnames";

interface CheckboxProps {
  label: string;
}

const Checkbox = ({ label }: CheckboxProps) => {
  return (
    <div className='flex flex-row gap-2 items-center'>
      <input
        type='checkbox'
        className={classNames(
          "relative peer shrink-0",
          "appearance-none w-6 h-6 border border-neutral-400 rounded-sm bg-white",
          "mt-1 cursor-pointer",
          "checked:bg-neutral-100",
          "focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-neutral-100",
          "disabled:border-steel-400 disabled:bg-steel-400 disabled:cursor-not-allowed"
        )}
      />
      <svg
        className='absolute w-4 h-4 mt-1 ml-1 hidden peer-checked:block pointer-events-none'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <polyline points='20 6 9 17 4 12'></polyline>
      </svg>
      <label className='font-thin'>{label}</label>
    </div>
  );
};
export default Checkbox;
