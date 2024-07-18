import React, { useEffect, useState } from 'react';
import { connectHelpGeneral } from 'hooks/InfoAndMeta/useSystems';
import { useSystem } from 'contexts/Systems/SystemContext';
import InputField from 'components/fields/InputField';


const GeneralDialogWithAcceptance = ({ message, setShowPopMessage, handleAccept, acceptMessage, cancelMessage, connectGeneralArgs }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    const [errors, setErrors] = useState('');

    return (
        <div className='w-[90vw] md:w-[550px] md:px-10 md:py-5 p-4 overflow-hidden m-auto'>
            {/* help section */}
            <div className='w-full pb-1'>
                {connectGeneralArgs ? (
                    connectHelpGeneral(connectGeneralArgs)
                ) :
                    ('')}
            </div>
            <div className='w-full flex '>
                {/* <p className='text-white mr-2'>System name: </p> */}
                {/* <p className='text-gray-400'>Renaming "{fileName}"</p> */}
                {message}
            </div>

            <div className='flex flex-wrap justify-center md:justify-start'>

                <button
                    className={
                        `
                        mb-4 md:mb-auto linear md:w-[150px] w-full rounded-xl bg-brand-400 py-[12px] text-sm text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700  ${isLoading ? 'bg-gray-400' : 'bg-brand-400 hover:bg-brand-600 active:bg-brand-700'}
                    `
                    }
                    disabled={isLoading}
                    onClick={handleAccept}
                >
                    {acceptMessage}
                </button>

                {cancelMessage ? (
                    <button
                        className='md:ml-6 linear md:w-[150px] w-full rounded-xl bg-red-700 py-[12px] text-sm text-white transition duration-200 hover:bg-red-900 active:bg-brand-700'
                        disabled={isLoading}
                        onClick={() => setShowPopMessage(false)}
                    >
                        {cancelMessage}
                    </button>
                ) : ''}
            </div>


        </div>
    )
}

export default GeneralDialogWithAcceptance;