function useIntersection<T>(arr1: Array<T>, arr2: Array<T>): Array<T> {
  let res: Array<T> = [];
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) >= 0) {
      res.push(arr1[i]);
    }
  }
  return res;
}

export { useIntersection };
