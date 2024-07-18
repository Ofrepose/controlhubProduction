import React, { useState, useEffect } from 'react';
import { useSystem } from 'contexts/Systems/SystemContext';
import Directories from './components/Directories';
import TopDashboard from './components/TopDashboard';
import Terminal from './components/Terminal';
import { connectHelpGeneral } from 'hooks/InfoAndMeta/useSystems';

import { pm2Help } from 'Systems/helpText/pm2help';
import Modules from './components/Modules/Modules';
import { modules } from './components/Modules/Module/Index';


const ConnectedDashboard = ({ activeSystem, disconnectFromSystem, userState, setUserState }) => {
    const tips = [
        '👍  Tip: Terminal sessions start at your current directory',
        '📝  Tip: Directory locations are saved between sessions',
        '⌚  Tip: Create, Rename, Delete are coming soon',
        '⚠️  Warning: All changes effect your remote machine.'
    ]
    const [showHelp, setShowHelp] = useState(false);
    const handleUserState = () => {
        switch (userState) {
            case 'modules':
                return (
                    <>
                        <Modules />
                        <div className='flex flex-wrap w-full'>
                            <p className='flex items-center w-full text-gray-400 text-xs mt-2'>
                                {tips[[Math.floor(Math.random() * tips.length)]]}
                            </p>
                            {connectHelpGeneral({
                                showHelp,
                                setShowHelp,
                                codeLanguage: 'markdown',
                                code: '',
                                CallOut: 'Feature List',
                                orientation: 'bottom',
                                extra: 'w-full',
                                extraCallOut: '!mt-0 pt-0',
                            })}



                        </div>
                    </>
                )
            case 'directories':
                return (
                    <>
                        <Directories activeSystem={activeSystem} />
                        <div className='flex flex-wrap w-full'>
                            <p className='flex items-center w-full text-gray-400 text-xs mt-2'>
                                {tips[[Math.floor(Math.random() * tips.length)]]}
                            </p>
                            {connectHelpGeneral({
                                showHelp,
                                setShowHelp,
                                codeLanguage: 'markdown',
                                code: '',
                                CallOut: 'Feature List',
                                orientation: 'bottom',
                                extra: 'w-full',
                                extraCallOut: '!mt-0 pt-0',
                            })}



                        </div>
                    </>
                )
            case 'terminal':
                return (
                    <>
                        <Terminal activeSystem={activeSystem} />
                        <div className='flex flex-wrap w-full'>
                            <p className='flex items-center w-full text-gray-400 text-xs mt-2'>
                                👍  We recommend using pm2 to handle server processes remotely
                            </p>
                            {connectHelpGeneral({
                                showHelp,
                                setShowHelp,
                                codeLanguage: 'markdown',
                                code: pm2Help,
                                CallOut: 'Help & Tips',
                                orientation: 'bottom',
                                extra: 'w-full',
                                extraCallOut: '!mt-0 pt-0'
                            })}



                        </div>
                    </>
                )
            default:
                return (
                    <>
                        {modules.filter((item) => item.name.toLowerCase() === userState )?.[0].component}
                        <div className='flex flex-wrap w-full'>
                            <p className='flex items-center w-full text-gray-400 text-xs mt-2'>
                                
                            </p>
                            {connectHelpGeneral({
                                showHelp,
                                setShowHelp,
                                codeLanguage: 'markdown',
                                code: '',
                                CallOut: 'Feature List',
                                orientation: 'bottom',
                                extra: 'w-full',
                                extraCallOut: '!mt-0 pt-0',
                            })}



                        </div>
                    </>
                )
        }
    }

    return (
        <div className='
        flex flex-wrap m-auto content-start items-start h-full w-[100%] max-w-[100vw] md:w-[100%] px-1 md:max-w-[100vw] xl:w-[800px] xl:max-w-[100%]  2xl:w-[2200px] 2xl:max-w-[calc(80vw-100px)]  '>
            {/* w-[100%] w-[100vw]  md:w-[100vw]  md:w-[500px] md:max-w-[100%] lg:max-w-[900px] xl:w-[800px] xl:max-w-[100%]  2xl:w-[2200px] 2xl:max-w-[calc(80vw-100px)]   */}
            <TopDashboard activeSystem={activeSystem} userState={userState} setUserState={setUserState} />
            {handleUserState()}
        </div>
    )
}

export default ConnectedDashboard;