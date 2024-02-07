import React from 'react'

const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className='py-24 flex flex-col md:flex-row-reverse justify-between items-center'>
        <div className='md:w-1/2'>
          <img src="/images/home/banner.png" alt="" />
          <div className='flex flex-col md:flex-row items-center justify-around -mt-16 gap-4'>
            <div className='bg-white px-3 py-2 rounded-2x1 flex items-center gap-3 shadow-sm w-64'>
              <img src="/images/home/gamepad.png" alt=""className='rounded-2x1 w-20' />
              <div className='space-y-1'>
                <h5>Game Pad</h5>
                <div className="rating">
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                </div>
                <div>
                  <p className='text-red'>499.00฿</p>
                </div>
              </div>
            </div>
            <div className='bg-white px-3 py-2 rounded-2x1 flex items-center gap-3 shadow-sm w-64'>
              <img src="/images/home/headphone.png" alt="" className='rounded-2x1 w-20'/>
              <div className='space-y-1'>
                <h5>Head phone</h5>
                <div className="rating rating-sm">
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                </div>
                <div>
                  <p className='text-red'>299.00฿</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='md:w:-1/2 space-y-7 px-4'>
          <h2 className='md:text-4xl text-4xl font-bold md:leading-snug leading-snug'>
            Discover Uniq <span className='text-red'>Software Swag</span> for Ever Coding Enthusiast!
          </h2>
          <p className='text-xl text-[#4A4A4A]'>
            Our mission: To merge fashion with functionality in the worl of Software Engineering
          </p>
          <button className='btn bg-red px-8 py-3 font-semibold text-white rounded-full'>
            Order Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner