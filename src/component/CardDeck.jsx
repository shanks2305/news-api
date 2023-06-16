import React from 'react';

const Card = React.lazy(() => import('./Card'))


export default function CardDeck({ data, handlePagination, currentPage, hidePost }) {

  return (
    <>
      <div className="grid grid-cols-12 gap-8 justify-center">
        {data?.map((item) => (
          <div key={item.title} className="col-span-12 md:col-span-6 lg:col-span-4">
            <Card data={item} hidePost={hidePost} />
          </div>
        ))}
      </div>

      <div className='my-6 flex justify-center items-baseline' >

        <nav>
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <span className="cursor-pointer block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 "
                onClick={() => handlePagination('dec')}
              >
                <span className="sr-only">Previous</span>
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              </span>
            </li>
            <li>
              <span className="px-3 py-2 leading-tight  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">{currentPage}</span>
            </li>
            <li>
              <span className="cursor-pointer block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 "
                onClick={() => handlePagination('inc')}>
                <span className="sr-only">Next</span>
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
              </span>
            </li>
          </ul>
        </nav>


      </div>
    </>
  );
}
