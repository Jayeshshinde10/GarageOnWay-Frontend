import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

const EmailConfirmationMessage = ({isCreated}) => {
  const [showMessage, setShowMessage] = useState(true);

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Transition
        show={showMessage}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 00-2 0v5a1 1 0 002 0V5z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              {isCreated ?<><p className="text-sm leading-5 font-medium">
                Your Account has been created successfull !
                <br></br>
                <p>
                 Account Activation Link is Been sent on Your Gmail 
                </p>
              </p>
              </> :<><p className='text-red'> An Error occured While Creating Your Account</p> </>
            }            </div>
            <div className="pl-3 ml-auto">
              <div className="-mx-1.5 -my-1.5">
                <button
                  onClick={() => setShowMessage(false)}
                  className="inline-flex rounded-md p-1.5 text-green-500 hover:bg-green-200 focus:outline-none focus:bg-green-200 transition duration-150 ease-in-out"
                >
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 6.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default EmailConfirmationMessage;
