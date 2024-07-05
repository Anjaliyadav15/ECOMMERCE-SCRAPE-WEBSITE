import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { FaUserCircle } from "react-icons/fa";


const ReviewCard = ({ reviews }) => {

  const [date, setDate] = useState("")
  useEffect(() => {

    const givenDate = new Date(reviews.date.slice(0, 24))
    const currentDate = new Date();
   // console.log(givenDate, currentDate)
    const timeDifference = currentDate - givenDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    setDate(daysDifference + " " + "days");

  }
  )
  //console.log(date)

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating)
    const halfStar = rating % 1 >= 0.5
    const emptyStars = 5 - filledStars - (halfStar ? 1 : 0)

    return (
      <>
        {[...Array(filledStars)].map((_, index) => (
          <StarIcon key={index} className="w-5 h-5 text-primary fill-current" />
        ))}
        {halfStar && <StarIconHalf key="half" className="w-5 h-5 text-primary fill-current" />}
        {[...Array(emptyStars)].map((_, index) => (
          <StarIcon key={filledStars + halfStar + index} className="w-5 h-5 text-muted fill-current" />
        ))}
      </>
    )
  }

  return (
    <>
      <div className="grid gap-4 border-[1px] border-gray-400 p-[1rem] rounded-[1rem] w-[40rem] my-[2rem]">

        <div className="flex gap-4">
          <FaUserCircle className='w-[2rem] h-[2rem]' />
          <div className="grid gap-4">
            <div className="flex gap-4 items-start">
              <div className="grid gap-0.5 text-sm">
                <h3 className="font-semibold">{reviews.reviewerName}</h3>
                <time className="text-sm text-muted-foreground">{date}</time>
              </div>
              <div className="flex items-center gap-0.5 ml-auto">
                {/* {renderStars(product.rating)} */}
              </div>
            </div>
            <div className="text-sm leading-loose text-muted-foreground">
              <p className='font-bold'>
                {reviews.comment}&apos;.
              </p>
            </div>
          </div>
        </div>


      </div>


    </>
  )
}


export default ReviewCard
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
