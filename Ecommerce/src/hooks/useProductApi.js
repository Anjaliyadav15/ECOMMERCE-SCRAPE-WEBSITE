const useProductApi = () => {

    const getProduct =  async(query) => {
        const res = await fetch(`https://dummyjson.com/products/search?q=${query}&limit=1`)
        const data = await res.json()
        return data
    }

    const getRandomProduct =  async() => {
        const res = await fetch(`https://dummyjson.com/products/search?limit=1`)
        const data = await res.json()
        return data
    }

    return {
        getProduct,
        getRandomProduct
    }
}

export default useProductApi