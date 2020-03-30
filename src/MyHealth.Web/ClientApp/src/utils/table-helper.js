export const getCurrentPaginatedItems = (currentPage, itemsPerPage, data) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
}

export const filterByKeys = (obj, keys = []) => {
    const filtered = {}
    keys.forEach(key => {
        if (obj.hasOwnProperty(key)) {
            filtered[key] = obj[key]
        }
    })
    return filtered
}
