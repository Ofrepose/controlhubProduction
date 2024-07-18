import React, { useState, useEffect } from 'react';
import GeneralDialogWithAcceptance from 'Systems/components/Dialogs/GeneralDialogWithAcceptance';
import { RiSave2Line } from "react-icons/ri";
import { GiTargetDummy } from "react-icons/gi";
import PopMessage from 'Systems/components/Dialogs/PopMessage';
import { useSystem } from 'contexts/Systems/SystemContext';


const ListControls = ({ runningProcesses, moduleInfo, getPM2Data }) => {
    const [showPopMessage, setShowPopMessage] = useState(false);
    const clickableStylingSave = `mr-2 text-2xl ${runningProcesses?.length ? 'text-white cursor-pointer hover:text-brand-400' : 'text-gray-700'}`
    const clickableStylingResurrect = `mr-2 text-2xl ${runningProcesses?.length === 1 ? 'text-white cursor-pointer hover:text-brand-400' : 'text-gray-700'}`
    const [action, setAction] = useState();
    const [activeId, setActiveId] = useState();

    const [formData, setFormData] = useState({ action: action, application_id: '' })
    const { PM2ServiceControl } = useSystem();



    return (
        <>
            <div className='pt-2 pb-4 flex flex-wrap justify-start w-full'>
                <RiSave2Line className={`${clickableStylingSave}`}
                    onClick={() => {
                        setShowPopMessage(true);
                        setAction('save');
                        setFormData({ ...formData, action: 'save' })
                    }}
                />
                <GiTargetDummy className={`${clickableStylingResurrect}`}
                    onClick={() => {
                        setShowPopMessage(true);
                        setAction('resurrect');
                        setFormData({ ...formData, action: 'resurrect' })
                    }}
                />
            </div>

            {showPopMessage ? (
                <PopMessage setShowPopMessage={setShowPopMessage}>
                    <GeneralDialogWithAcceptance
                        message={
                            <div className="w-full font-poppins">
                                <div className='w-full flex items-center'>
                                    {moduleInfo.componentInfoIcon}
                                    <p className='text-gray-400 uppercase ml-4 text-xl'> {moduleInfo?.name} -</p>
                                    <p className='text-brand-400 ml-2 text-xl'> {(action?.[0].toUpperCase() + action?.slice(1)) + ' Applications' || 'Please Wait'}</p>
                                </div>
                                <div className='w-full flex '>

                                    {/* <p className='text-gray-400'>{moduleInfo.docLink}</p> */}
                                </div>
                                <div className='w-full flex mt-2 flex-wrap'>
                                    {/* <p className='text-white mr-2'>Owner: </p> */}
                                    <p className='pb-4 text-gray-400 w-full'>{`${(action?.[0].toUpperCase() + action?.slice(1))} this current application list?`}</p>

                                </div>


                                <p className="text-red-400 mb-4"></p>
                            </div>
                        }
                        setShowPopMessage={setShowPopMessage}
                        acceptMessage={(action?.[0].toUpperCase() + action?.slice(1)) || 'Please Wait'}
                        handleAccept={async () => {
                            PM2ServiceControl(formData);
                            await getPM2Data();
                        }}
                        cancelMessage={'Cancel'}
                    />
                </PopMessage>
            ) : ''}
        </>
    )
}

export default ListControls;