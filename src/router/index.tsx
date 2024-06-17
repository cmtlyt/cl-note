import { createHashRouter, RouteObject, RouterProvider, redirect } from 'react-router-dom';

import { getRoute } from './util';

import Layout from '@/layout';

const routes: RouteObject[] = [
  {
    Component: Layout,
    children: [
      { path: '/', loader: () => redirect('/list') },
      getRoute('/list', 'List'),
      getRoute('/edit', 'Edit'),
      getRoute('/user', 'User'),
    ],
  },
];

const router = createHashRouter(routes);

export default function RouterView() {
  return <RouterProvider router={router} />;
}
