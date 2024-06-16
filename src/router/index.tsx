import { createHashRouter, RouteObject, RouterProvider } from 'react-router-dom';

import { getRoute } from './util';

const routes: RouteObject[] = [
  getRoute('/', 'Home', {
    children: [getRoute('/about', 'About'), getRoute('/test', 'test/Text')],
  }),
];

const router = createHashRouter(routes);

export default function RouterView() {
  return <RouterProvider router={router} />;
}
