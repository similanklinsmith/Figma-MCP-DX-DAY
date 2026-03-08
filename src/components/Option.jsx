import React from 'react'
import { images } from '../assets/images'

export default function Option({ className, title = "TITLE", description = "Description", image }) {
  const imageUrl = images[image]

  return (
    <div className={className || "flex flex-col gap-3 items-center"} data-name="option">
      {/* Image area */}
      <div className="w-[151px] h-[151px] rounded flex items-center justify-center w-full" data-name="img">
        {imageUrl
          ? <img src={imageUrl} alt={title} className="w-[151px] h-[151px]" />
          : <p className="font-sans font-medium text-[18px] text-black text-center">Image</p>
        }
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 items-center w-full text-center" data-name="content">
        <p className="font-mono text-[16px] text-[#0e0e0e] uppercase w-full">
          {title}
        </p>
        <p className="font-sans text-[14px] text-[#454545] w-full">
          {description}
        </p>
      </div>
    </div>
  )
}
