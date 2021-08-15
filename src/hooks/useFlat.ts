interface RecursiveArray<T> extends Array<T | RecursiveArray<T>>{

}


function useFlat(arr: Array<any>): string[]{
  if(!arr) return []
  let temp: string[] = []
  arr.forEach(value => temp = temp.concat(Array.isArray(value) ? useFlat(value) : value))
  return temp
}

export {useFlat}
