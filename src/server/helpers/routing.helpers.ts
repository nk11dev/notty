import { NullableString } from '@/shared/types/nullable.types';
import { onlyUnique } from '@/shared/utils/array.utils';

function collectNestedRoutes(
  routes: [],
  parentPath: NullableString = null
) {
  const hasParentPath = (parentPath !== null);

  let arr: string[] = [];

  // collect routes paths
  for (let i = 0; i < routes.length; i += 1) {
    const item = routes[i];
    const { path, children } = item;

    if (path) {
      const currentPath = hasParentPath
        ? `${parentPath}/${path}`
        : path;

      arr.push(currentPath);
    }

    // check for child routes
    if (Array.isArray(children)) {

      const parentPathArg: NullableString = hasParentPath
        ? null
        : path;

      const subArr: string[] = collectNestedRoutes(children, parentPathArg);

      arr = arr.concat(subArr);
    }
  }

  return arr.filter(onlyUnique);
}

export default collectNestedRoutes;