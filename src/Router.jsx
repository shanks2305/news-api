import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { Suspense } from 'react';
import Spinner from './component/Spinner';

const Home = React.lazy(() => import('./pages/Home'))


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/:category',
    element: <Home />,
  },
]);

function Router() {
  return <>
    <Suspense fallback={
      <div className='flex w-screen h-screen justify-center items-center' >
        <Spinner />
      </div>
    }>
      <RouterProvider router={router} />
    </Suspense>
  </>;
}

export default Router;
