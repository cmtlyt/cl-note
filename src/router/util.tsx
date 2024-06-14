import { ComponentType } from 'react';
import { ActionFunction, LoaderFunction, RouteObject } from 'react-router-dom';

interface PageExports {
  default: ComponentType;
  loader?: LoaderFunction;
  action?: ActionFunction;
}

const pageMap = Object.entries(import.meta.glob<PageExports>('@/pages/**/*.tsx')).reduce<
  Record<string, () => Promise<PageExports>>
>((pre, [path, comp]) => {
  const [, pageName] = /\/src\/pages\/(.*?)\./.exec(path)!;
  pre[pageName] = comp;
  return pre;
}, {});

export function getRoute(
  path: string | undefined,
  pageName: keyof typeof pageMap,
  routeObject: RouteObject = {},
): RouteObject {
  return {
    path,
    lazy: async () => {
      const { default: Component, loader, action } = await pageMap[pageName]();
      return { Component, loader, action };
    },
    ...routeObject,
  };
}
