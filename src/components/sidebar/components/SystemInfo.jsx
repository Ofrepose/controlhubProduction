import { useEffect, useState } from 'react';
import { useSystem } from "contexts/Systems/SystemContext";
import { BsCloudUpload, BsCloudDownload } from "react-icons/bs";

const SystemInfo = () => {
    const { GetSystemInfo, isLoading, activeSystem } = useSystem();
    const [systemInfoStats, setSystemInfoStats] = useState(null);

    const fetchSystemInfo = async () => {
        const info = await GetSystemInfo();
        setSystemInfoStats(info);
    };

    useEffect(() => {
        let timeoutId;
        timeoutId = setInterval(() => {
            fetchSystemInfo();
        }, 10000);

        return () => clearInterval(timeoutId);
    }, [isLoading]);

    useEffect(() => {
        fetchSystemInfo();
    }, [])

    return (
        <div className="px-4">


            <div className="flex-wrap flex font-poppins">
                <div className="mt-16 flex h-fit flex-col pr-2 w-full">
                    <p className="text-lg text-left font-bold text-white w-full">{activeSystem?.systemName || 'System'} Stats</p>
                    {systemInfoStats && systemInfoStats?.[0]?.result ? (
                        <span className="mt-1 text-sm text-gray-400 text-left">
                            CPU: {systemInfoStats?.[0]?.result} <br />
                            MEM: {systemInfoStats?.[1]?.result} <br />
                            {systemInfoStats?.[0]?.result ? (
                                <div className='flex wrap items-center'>
                                    NET:
                                    <BsCloudDownload className='mx-1' />
                                    {systemInfoStats?.[2]?.result.split('TX:')[0].split('RX:')[1]}
                                    <BsCloudUpload className='mx-1' />
                                    {systemInfoStats?.[2]?.result.split('TX:')[1]}
                                </div>
                            ) : (
                                ''
                            )}
                        </span>
                    ) :
                        (
                            <span className="mt-1 text-sm text-gray-400 text-left">
                                Loading...
                            </span>
                        )
                    }
                </div>

            </div>
        </div>
    );
}

export default SystemInfo;