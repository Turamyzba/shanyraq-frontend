"use client";

import { useState, useEffect } from "react";
import Filter from "@/components/filter";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const updateMatches = () => {
      setMatches(media.matches);
    };
    updateMatches();
    media.addEventListener("change", updateMatches);
    return () => {
      media.removeEventListener("change", updateMatches);
    };
  }, [query]);

  return matches;
}

interface FilterModalProps {
  onSubmit: (queryObject: any) => void;
  initialQuery: any;
}

export default function FilterModal({
  onSubmit,
  initialQuery,
}: FilterModalProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const handleFilterSubmit = (queryObject: any) => {
    onSubmit(queryObject);
    setOpen(false);
  };

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center gap-2 bg-white text-black border border-[#BFBFBF4D] hover:bg-gray-100 w-full md:w-auto px-4 py-2 "
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 21V14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 10V3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 21V12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 8V3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 21V16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 12V3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 14H7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 8H15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 16H23"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Filter
        </button>

        {open && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setOpen(false)}
            ></div>
            <div className="fixed bottom-0 z-50 rounded-t-[10px] max-h-full overflow-y-auto">
              <div className="">
                <Filter
                  onSubmit={handleFilterSubmit}
                  initialQuery={initialQuery}
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return <Filter onSubmit={onSubmit} initialQuery={initialQuery} />;
}
