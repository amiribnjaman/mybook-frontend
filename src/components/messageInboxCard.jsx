import React from 'react'

export default function MessageInboxCard() {
  return (
    <div className="relative w-full h-[300px]">
      message inbox
      <div className="absolute bottom-0 right-0">
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <input type="text" className='border w-full py-[3px]' />
          </div>
          <button className="bg-green-700 text-white px-3 col-span-1 py-1">
            send
          </button>
        </div>
      </div>
    </div>
  );
}
