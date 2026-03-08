import React from 'react'
import Option from './Option'
import Button from './Button'

const imgUnion = "http://localhost:3845/assets/bc665661c1e59f84278aa762ef97ca6fe57b1ab6.svg"
const imgUnion1 = "http://localhost:3845/assets/4dccf55c7f757076d0f153f543d7adf2466a9077.svg"
const imgLine2 = "http://localhost:3845/assets/39e583e8e4c04c394ae43c5d7cf8c9a46aef39af.svg"

export default function Menu({ 
  title = "Title", 
  currentQuestion = 1, 
  totalQuestions = 5,
  options = [
    { title: "OPTION 1", description: "Description" },
    { title: "OPTION 2", description: "Description" }
  ],
  onBack = () => {},
  onSelectOption = () => {}
}) {
  return (
    <div className="w-full max-w-[375px] mx-auto bg-[#fefefe] overflow-hidden" data-name="menu" data-node-id="64:638">
      {/* Top border */}
      <div className="h-[20px] relative w-full" data-name="border" data-node-id="64:593">
        <div className="absolute h-[20px] left-0 top-0 w-full" data-name="Union" data-node-id="64:594">
          <img alt="" className="w-full h-full block" src={imgUnion} />
        </div>
        <div className="absolute h-[20px] left-[0.5px] top-0" style={{ width: "calc(100% - 1px)" }} data-name="Union" data-node-id="64:595">
          <div className="absolute inset-[-5.58%_-0.13%_0_-0.13%]">
            <img alt="" className="block max-w-none w-full h-full" src={imgUnion1} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="border-l border-r border-[#ece8e5] bg-[#fefefe]" data-name="main" data-node-id="64:570">
        <div className="flex flex-col h-auto min-h-[812px]" data-name="container" data-node-id="64:572">
          
          {/* Header with counter */}
          <div className="flex flex-col items-center p-6 w-full" data-name="container" data-node-id="64:573">
            <p className="font-mono text-[14px] leading-5 text-[#0e0e0e] text-center" data-node-id="64:574">
              {currentQuestion}/{totalQuestions}
            </p>
          </div>

          {/* Main content area */}
          <div className="flex flex-1 flex-col gap-6 items-center justify-center pt-2 px-6 w-full" data-name="cotainer" data-node-id="64:575">
            {/* Title */}
            <p className="font-sans font-medium text-[18px] leading-7 text-[#0e0e0e] text-center w-full" data-node-id="64:576">
              {title}
            </p>

            {/* Options grid */}
            <div className="flex gap-6 items-start w-full justify-center flex-wrap" data-name="options" data-node-id="64:577">
              {options.map((option, idx) => (
                <div 
                  key={idx}
                  onClick={() => onSelectOption(idx)}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <Option 
                    className="flex flex-col gap-3 items-center w-[151.5px]"
                    title={option.title}
                    description={option.description}
                    imageUrl={option.imageUrl}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-6 items-center pb-6 px-6 w-full" data-name="container" data-node-id="64:590">
            {/* Divider line */}
            <div className="h-0 w-full relative" data-node-id="64:591">
              <div className="absolute inset-[-1px_0_0_0]">
                <img alt="" className="block max-w-none w-full" src={imgLine2} />
              </div>
            </div>

            {/* Back button */}
            <Button
              variant="plain"
              onClick={onBack}
              className="px-0 py-0"
            >
              ← ย้อนกลับ
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="h-[20px] relative w-full flex items-center justify-center" style={{ transform: "scaleY(-1)" }}>
        <div className="w-full">
          <div className="h-[20px] relative w-full" data-name="border" data-node-id="64:596">
            <div className="absolute h-[20px] left-0 top-0 w-full" data-name="Union" data-node-id="64:597">
              <img alt="" className="w-full h-full block" src={imgUnion} />
            </div>
            <div className="absolute h-[20px] left-[0.5px] top-0" style={{ width: "calc(100% - 1px)" }} data-name="Union" data-node-id="64:598">
              <div className="absolute inset-[-5.58%_-0.13%_0_-0.13%]">
                <img alt="" className="block max-w-none w-full h-full" src={imgUnion1} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}