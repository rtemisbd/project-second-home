import React from 'react'
import { useState } from 'react';

function AddCardModal() {
    const [showModal, setShowModal] = useState(false);
    return (
      <>
        <button className='outline-none bg-[#00BBB4] border-none px-4 text-white'
                onClick={() => setShowModal(true)}   >
                <i class="fa-solid fa-circle-plus text-xl me-2"></i> 
                Add New Card
        </button>

        {showModal ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="w-[500px] border-0 rounded-lg shadow-lg relative flex flex-col bg-gray-300 outline-none focus:outline-none">
                  <div className="flex justify-end p-5 rounded-t ">
                    <button className="bg-transparent border-0 text-black float-right"
                            onClick={() => setShowModal(false)} >
                      <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-300 py-0 rounded-full"> x </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <form className="bg-gray-300 rounded px-8 pt-6 pb-8 w-full">
                      <label className="block text-black text-sm font-bold mb-1">
                        Card Holder Name
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black mt-2 mb-4 outline-none" />
                      <label className="block text-black text-sm font-bold mb-1">
                        Card Number
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black mt-2 mb-4 outline-none" />
                      <label className="block text-black text-sm font-bold mb-1">
                        Valid Till
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black mt-2 mb-4 outline-none" />

                    </form>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                            type="button" onClick={() => setShowModal(false)} >
                      Close
                    </button>
                    <button className="text-white bg-[#00BBB4] active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                            type="button" onClick={() => setShowModal(false)} >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </>
    );
  };

export default AddCardModal;