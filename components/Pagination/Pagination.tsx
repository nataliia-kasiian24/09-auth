import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className={css.paginationContainer}>
      <ReactPaginate
        
        previousLabel={'←'}
        nextLabel={'→'}
        breakLabel={'...'}
        
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={({ selected }) => onPageChange(selected + 1)}
        forcePage={currentPage - 1} 
        
        containerClassName={css.pagination}
        activeClassName={css.active}
        pageClassName={css.pageItem}
        pageLinkClassName={css.pageLink}
        previousClassName={css.pageItem}
        previousLinkClassName={css.pageLink}
        nextClassName={css.pageItem}
        nextLinkClassName={css.pageLink}
        breakClassName={css.pageItem}
        breakLinkClassName={css.pageLink}
        disabledClassName={css.disabled}
      />
    </div>
  );
};