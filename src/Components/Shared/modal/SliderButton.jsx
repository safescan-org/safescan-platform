import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react'
import { useSwiper } from 'swiper/react';

const SliderButton = ({total,activeIndex}) => {
    const swiper = useSwiper();
  return (
    <div className=" mt-3">
    <div className="w-full flex items-center justify-between">
      <button onClick={() => swiper.slidePrev()} className=" bg-[#EFF4FB] py-2 font-medium h-[38px] text-dark-gray flex items-center gap-1 rounded-[4px] text-[14px] px-5">
        <Icon icon="ic:sharp-arrow-back" /> Previous
      </button>
      {total ? (
        <>
          {" "}
          <h2 className=" text-[#68769F] font-bold text-[16px]">
            <span className=" text-dark-gray">
              {activeIndex + 1}
            </span>
            /{total?.length}
          </h2>
        </>
      ) : (
        <></>
      )}

      <button onClick={() => swiper.slideNext()} className=" bg-[#EFF4FB] font-medium py-2 h-[38px] text-dark-gray flex items-center gap-1 rounded-[4px] text-[14px] px-5">
        Next <Icon icon="gridicons:arrow-right" />
      </button>
    </div>
  </div>
  )
}

export default SliderButton