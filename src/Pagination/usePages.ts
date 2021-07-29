const unique = (arr: number[]) => {
  return Array.from(new Set([...arr]));
};

export default function usePages(totalPage: number, curPage: number) {
  let pages = [];
  if (totalPage <= 7) {
    for (let i = 0; i < totalPage; i++) {
      pages.push(i + 1);
    }
  } else {
    if (curPage <= 7) {
      pages = unique([1, 2, 3, 4, 5, 6, 7, totalPage])
        .filter((x) => x >= 1 && x <= totalPage)
        .sort((a, b) => a - b)
        .reduce((prev: any[], cur, index, arr) => {
          if (arr[index + 1] && arr[index + 1] - arr[index] > 1) {
            prev.push(cur);
            prev.push('···');
          } else {
            prev.push(cur);
          }
          return prev;
        }, []);
    } else if (curPage >= totalPage - 7) {
      pages = unique([
        1,
        totalPage - 7,
        totalPage - 6,
        totalPage - 5,
        totalPage - 4,
        totalPage - 3,
        totalPage - 2,
        totalPage - 1,
        totalPage,
      ])
        .filter((x) => x >= 1 && x <= totalPage)
        .sort((a, b) => a - b)
        .reduce((prev: any[], cur, index, arr) => {
          if (arr[index + 1] && arr[index + 1] - arr[index] > 1) {
            prev.push(cur);
            prev.push('···');
          } else {
            prev.push(cur);
          }
          return prev;
        }, []);
    } else {
      pages = unique([
        1,
        totalPage,
        curPage,
        curPage + 1,
        curPage + 2,
        curPage - 1,
        curPage - 2,
      ])
        .filter((x) => x >= 1 && x <= totalPage)
        .sort((a, b) => a - b)
        .reduce((prev: any[], cur, index, arr) => {
          if (arr[index + 1] && arr[index + 1] - arr[index] > 1) {
            prev.push(cur);
            prev.push('···');
          } else {
            prev.push(cur);
          }
          return prev;
        }, []);
    }
  }
  return { pages };
}
