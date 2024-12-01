import Link from "next/link";

const MenuItem = ({
                      label,
                      isActive,
                      href,
                      onClick,
                      children,
                  }: {
    label: string;
    isActive: boolean;
    href?: string;
    onClick: () => void;
    children: React.ReactNode;
}) => {
    const activeClasses = "text-black font-bold  ml-7";
    const inactiveClasses = "text-gray-500 ml-7";
    const classes = isActive ? activeClasses : inactiveClasses;

    return href ? (
        <Link href={href} className={`relative flex items-center w-full text-left ${classes}`}
              onClick={onClick}>
            {isActive && <div className="absolute w-[6px] h-[40px] bg-[#1AA683] -left-7 rounded-r-lg"></div>}
            {children}
            <span className="ml-4">{label}</span>
        </Link>
    ) : (
        <button onClick={onClick} className={`relative flex items-center w-full text-left ${classes}`}>
            {isActive && <div className="absolute w-[6px] h-[40px] bg-[#1AA683] -left-7 rounded-r-lg"></div>}
            {children}
            <span className="ml-4">{label}</span>
        </button>
    );
};

export default MenuItem;