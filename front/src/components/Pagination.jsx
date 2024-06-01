export default function Pagination({
  totalPages,
  pageSize,
  currentPage,
  onPageChange,
}) {
  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPages / pageSize); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <div className="flex items-center gap-4">
        <p className="text-sm">
          Page {currentPage} of {totalPages}
        </p>
        <div className="join">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => onPageChange(number)}
              className={
                currentPage === number
                  ? "join-item btn active btn-primary btn-sm"
                  : "join-item btn btn-sm"
              }
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
