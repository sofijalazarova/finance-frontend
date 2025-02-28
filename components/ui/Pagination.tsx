import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

interface PaginationProps {
  count: number;
}

const PAGE_SIZE = 10;

function Pagination({ count }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const currentPage = Number(searchParams?.get("page")) || 1;

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function updatePage(page: number) {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", page.toString());

    router.push(`${pathName}?${newParams.toString()}`);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="w-full flex items-center justify-between p-4">
      <p className="text-base ml-2">
        Showing{" "}
        <span className="font-semibold">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span className="font-semibold">{count}</span> results
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => updatePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium border rounded-md transition-all 
            disabled:opacity-50 disabled:cursor-not-allowed 
            bg-gray-100 hover:bg-brand-600 hover:text-gray-500"
        >
          <HiChevronLeft />
          <span>Previous</span>
        </button>

        <button
          onClick={() => updatePage(currentPage + 1)}
          disabled={currentPage === pageCount}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium border rounded-md transition-all 
            disabled:opacity-50 disabled:cursor-not-allowed 
            bg-gray-100 hover:bg-brand-600 hover:text-gray-500"
        >
          <span>Next</span>
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
