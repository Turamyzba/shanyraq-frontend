const MenuItem = ({
  label,
  isactive,
  onClick,
  children,
}: {
  label: string;
  isactive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  const activeClasses =
    "text-black font-bold ml-0 md:ml-7 border-b border-b-[3.5px] rounded-b-sm border-[#1132F5] md:border-none";
  const inactiveClasses = "text-gray-500 ml-0 md:ml-7";
  const classes = isactive ? activeClasses : inactiveClasses;

  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col md:flex-row items-center w-full md:w-auto text-center md:text-left py-2 md:py-0 px-2 md:px-0 ${classes}`}
    >
      {isactive && (
        <>
          <div className="hidden md:block absolute w-[6px] h-[40px] bg-[#1132F5] -left-7 rounded-r-lg"></div>
        </>
      )}
      {children}
      <span className="ml-0 md:ml-4 mt-1 md:mt-0 text-[14px] lg:text-[16px]">
        {label}
      </span>
    </button>
  );
};
export default MenuItem;
