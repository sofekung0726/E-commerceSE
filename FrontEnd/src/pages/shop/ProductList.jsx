import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import axios from 'axios'


const ProductList = () => {
  const [products, setProduct] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortOption, setSortOption] = useState("default")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemPerPage, setItemPerPage] = useState(8);
  const [categories, setCategories] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios("http://localhost:4000/products" , {})
        const data = await response.data
        setProduct(data)
        setFilteredItems(data)
        setCategories(["all", ...new Set(data.map((item) => item.category))])
      } catch (error) {
        console.error("Error Fetching data", error);
      }

    }
    fetchData();
  }, [])

  

  const filterItems = (category) => {
    const filtered = category === "all" ? products : products.filter((item) => item.category === category)
    // setFilteredItems(filtered)

    handleSortChange(sortOption, filtered)
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleSortChange = (option, products) => {
    setSortOption(option)
    let sortedItem = [...products];
    switch (option) {
      case "A-Z": sortedItem.sort((a, b) => a.name.localeCompare(b.name))

        break;
      case "Z-A": sortedItem.sort((b, a) => b.name.localeCompare(a.name))

        break;
      case "low-to-high": sortedItem.sort((a, b) => a.price - b.price)

        break;
      case "high-to-low": sortedItem.sort((b, a) => b.price - a.price)

        break;

      default:
        break;
    }
    setFilteredItems(sortedItem)
    setCurrentPage(1)
  };

  const indexOfLastItem = itemPerPage * currentPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem , indexOfLastItem) 
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  
  return (
    <div>
      {/** Product list Banner */}
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className='py-48 flex flex-col justify-center items-center'>
          <div className='text-center space-y-7 px-4'>
            <h2 className='md:text-4xl text-4xl font-bold md:leading-snug leading-snug'>
              Unleash Your Inner <span className='text-red'>Geek</span> <br />Shop Our Exclusive Tech-themed Merchandises!
            </h2>
            <p className='text-xl text-[#4A4A4A]'>
              We provide a curated selection of high-quality tech-inspired product backed by fast shipping and exceptional
              customer service. Our mission is to empower and inspire tech enthusiasts through our
              carefully chosen merchandise and community engagement initiatives
            </p>
            <button className='btn bg-red px-8 py-3 font-semibold text-white rounded-full'>
              Order Now
            </button>
          </div>
        </div>
      </div>
      {/**Product List Card */}
      <div className="section-container">
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          {/**  Filter */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            {categories.map((category, index) => {
              return (
                <button
                  key={index}
                  onClick={() => filterItems(category)}
                  className={`
                        ${
                          selectedCategory === category ? "active" : ""
                        } px-4 py-2 rounded-full`}
                >
                  <p className="capitalize">{category}</p>
                </button>
              );
            })}
          </div>
          {/**Sort Option */}
          <div className="flex justify-end mb-4 rounded-sm">
            <div className="bg-black p-2">
              <select
                id="sort"
                className="bg-black text-white px-2 rounded-sm"
                onChange={(e) => handleSortChange(e.target.value, filteredItems)}
                value={sortOption}
              >
                <option value={"default"}>Default</option>
                <option value={"A-Z"}>A-Z</option>
                <option value={"Z-A"}>Z-A</option>
                <option value={"low-to-high"}>Low to High</option>
                <option value={"high-to-low"}>High to Low</option>
              </select>
            </div>
          </div>
          {/**  Product Card */}
          <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-4">
            {currentItems.map((item, index) => (
              <Card key={index} item={item} />
            ))}
          </div>
        </div>
          <div className='flex justify-center my-8 flex-wrap gap-2'> 
              {
                Array.from({
                  length: Math.ceil(filteredItems.length/itemPerPage)
                }).map((_,index)=> {
                  return (
                    <button
                key={index}
                className={`my-1 px-3 py-1 rounded-full ${
                  currentPage === index + 1
                    ? "bg-red text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => {
                  paginate(index + 1);
                }}
              >
                {index + 1}
              </button>
                  )
                })
              }
          </div>
      </div>
      
    </div>
  )
}

export default ProductList