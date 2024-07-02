import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useState } from "react"
import useProductApi from "../hooks/useProductApi.js"
import ReviewCard from "./ReviewCard.jsx"
import { Skeleton } from "./ui/skeleton.jsx"

import { Toaster, toast } from 'react-hot-toast';

export default function Website() {
  const { getProduct, getRandomProduct } = useProductApi()
  const [product, setProduct] = useState()
  const [query, setQuery] = useState("")
  const [images, setImages] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [search, setSearch] = useState(false)
  const [research, setResearch] = useState(false)

  const showToast = () => {
    setLoaded(false)
    setResearch(prev => !prev)
    toast.error(`${query} not found,please search for something like watch,bag`,{
      position: "top-center",
    });
  };

  console.log(research)

  const handleSearchProduct = async () => {
    try {
      setSearch(true)
      let data = await getProduct(query)
      setProduct(data)
      const images = [data.products[0].thumbnail, ...data.products[0].images]
      setImages(images)
    } catch (error) {
      showToast()
    } finally {
      setSearch(false)
    }

  }
   
  useEffect(() => {
    if (!loaded) {
      (async () => {
        setSearch(true)
        let data = await getRandomProduct()
        setProduct(data)
        const images = [data.products[0].thumbnail, ...data.products[0].images]
        setImages(images)
        setLoaded(true)
        setSearch(false)
        console.log("USEEffect chal rha nahi h!!!")
      })()
      
    }
  }, [research])



  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);
  
    return (
      <>
        {[...Array(filledStars)].map((_, index) => (
          <StarIcon key={`filled-${index}`} className="w-5 h-5 text-primary fill-current" />
        ))}
        {halfStar && <StarIconHalf key="half" className="w-5 h-5 text-primary fill-current" />}
        {[...Array(emptyStars)].map((_, index) => (
          <StarIcon key={`empty-${index}`} className="w-5 h-5 text-muted fill-current" />
        ))}
      </>
    );
  };
  



  return (
    <>
      {search ? (
        <div>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
            <div className="grid gap-4 md:gap-10 md:items-start justify-center">
              <div className="grid gap-4">
                <Skeleton className="h-[30rem] w-[25rem] bg-gray-300 rounded-xl" />
              </div>
            </div>

            <div
              className="grid gap-4 md:gap-10 items-start border-[1px] p-[2rem] rounded-[2rem] border-gray-800"
            >
              <div className="grid gap-4">
                <Skeleton className="h-4 w-[250px] bg-gray-300" />
                <div>
                  <Skeleton className="h-4 w-[200px] bg-gray-300" />
                </div>
                <Skeleton className="h-4 w-[150px] bg-gray-300" />
              </div>
              <div className="font-semibold text-[1.5rem]">
                <Skeleton className="h-4 w-[50px] bg-gray-300" />
              </div>
              <div className="flex flex-col gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton className="h-4 w-[50px] bg-gray-300" key={index} />
                ))}
              </div>
              <div></div>
              <div className="grid gap-4 text-sm leading-loose">
                <Skeleton className="h-4 w-[10px] bg-gray-300" />
                <p>
                  <Skeleton className="w-[30rem] h-[15rem] bg-gray-300" />
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
         
          <div className="flex justify-center mt-[1.5rem] items-center gap-2">
            <input
              type="text"
              placeholder="Search watch, bag, book"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-gray-200 py-3 px-4 w-[25rem] outline-none rounded-[2rem]"
            />
            <button
              className="bg-black rounded-[.7rem] text-white font-medium cursor-pointer w-[6rem] h-[2.6rem]"
              onClick={handleSearchProduct}
            >
              Search
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
            <div className="grid gap-4 md:gap-10 md:items-start justify-center">
              <div className="grid gap-4">
                <Carousel className="w-full max-w-xs">
                  <CarouselContent>
                    {images?.map((image, index) => (
                      <CarouselItem key={index}>
                        <img
                          src={image}
                          alt="Product Image"
                          width={600}
                          height={900}
                          className="aspect-[2/3] object-cover border w-full rounded-lg overflow-hidden"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>

            {product?.products.map((product) => (
              <div
                className="grid gap-4 md:gap-10 items-start border-[1px] p-[2rem] rounded-[2rem] border-gray-800"
                key={product.id}
              >
                <div className="grid gap-4">
                  <h1 className="font-bold text-3xl lg:text-4xl">{product.title}</h1>
                  <div>
                    <p>{product.brand}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-0.5">
                      {renderStars(product.rating)}
                      <span className="text-sm text-muted-foreground">
                        {product.rating} reviews
                      </span>
                    </div>
                  </div>
                  <div className="text-4xl font-bold">${product.price}</div>
                </div>
                <div className="font-semibold text-[1.5rem]">
                  Discount: {product.discountPercentage}%
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-[1.2rem]">
                    <span className="font-semibold">Warranty: </span>
                    {product.warrantyInformation}
                  </p>
                  <p className="text-[1.2rem]">
                    <span className="font-semibold">Shipping: </span>
                    {product.shippingInformation}
                  </p>
                  <p className="text-[1.2rem]">
                    <span className="font-semibold">Availability: </span>
                    {product.availabilityStatus}
                  </p>
                  <p className="text-[1.2rem]">
                    <span className="font-semibold">Return Policy: </span>
                    {product.returnPolicy}
                  </p>
                  <p className="text-[1.2rem]">
                    <span className="font-semibold">Min. Order Quantity: </span>
                    {product.minimumOrderQuantity}
                  </p>
                </div>
                <div></div>
                <div className="grid gap-4 text-sm leading-loose">
                  <h2 className="text-2xl font-bold">Product Description</h2>
                  <p>
                    <span className="text-[1.1rem] leading-normal">
                      {product.description}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        <h2 className="text-2xl font-bold text-center">Review</h2>
        <div className="flex gap-[2rem] flex-wrap justify-center">
          {product?.products[0]?.reviews?.map((review, index) => (
            <ReviewCard reviews={review} key={index} />
          ))}
        </div>
      </div>
    </>
  )
};

  



function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function StarIconHalf(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <defs>
        <linearGradient id="half-fill" x1="0" x2="1" y1="0" y2="0">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="none" stopOpacity="1" />
        </linearGradient>
      </defs>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#half-fill)" />
    </svg>
  )
}
