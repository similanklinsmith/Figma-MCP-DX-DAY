import React from 'react'

export default function Button({ className, variant = "primary", children = "Text Button", onClick }) {
  const isPrimary = variant === "primary"
  
  return (
    <div
      onClick={onClick}
      className={className || `${
        isPrimary
          ? "bg-[#f76513] px-4 py-3 rounded flex items-center hover:bg-[#e55b0c] transition-colors duration-300 cursor-pointer"
          : "px-0 py-0 cursor-pointer"
      }`}
      data-node-id={isPrimary ? "64:400" : "64:629"}
    >
      <p className={`font-sans whitespace-nowrap ${
        isPrimary
          ? "text-white text-[16px] leading-6"
          : "text-[#0e0e0e] text-[14px] leading-5"
      }`} data-node-id={isPrimary ? "64:392" : "64:630"}>
        {children}
      </p>
    </div>
  )
}