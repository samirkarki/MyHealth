export const addKeyValue = (obj, key, data) => {
    return obj[key] = data;
}

export const deleteKeyValue = (arr, key) => {
    for(var i=0; i < arr.length; i++){
      delete arr[i][key]
    }
    return arr
};