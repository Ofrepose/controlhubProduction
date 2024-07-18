import React, { useEffect, useState } from 'react';
import { useSystem } from 'contexts/Systems/SystemContext';

//active terminals option

import TerminalConnect from './TerminalConnect';
import TerminalSelect from './TerminalSelect';
import WebSocketComponent from './socket/WebSocket';




const Terminal = () => {
    const [activeTerminal, setActiveTerminal] = useState(null);
    const { messageTerminal, createNewTerminal, activeSystem } = useSystem();
    const [showHelp, setShowHelp] = useState(false);


    return (
        <div className='w-full h-[60vh] max-h-[60vh] bg-gray-light shadow-lg'>

            <div className='p-4 h-full'>


                <WebSocketComponent
                    activeSystem={activeSystem}
                />

            </div>

            {/* {activeTerminal ? (
                <div className='p-4 h-full'>


                    <WebSocketComponent
                        activeSystem={activeSystem}
                    />
                    
                </div>
            ) :
                (
                    <div className='flex flex-wrap h-full m-auto'>
                        <div className='w-1/2 items-center justify-center align-center flex flex-wrap'>
                            <TerminalSelect
                                activeTerminal={activeTerminal}
                                setActiveTerminal={setActiveTerminal}
                            />
                        </div>

                        <div className='w-1/2 items-center justify-center align-center flex flex-wrap'>
                            <TerminalConnect />
                        </div>

                    </div>

                )} */}

        </div>
    )
}

export default Terminal;