
import ch2 from 'assets/img/ch2.png';

const Connecting = ({ message, img }) => {
    return (
        <>
            <div>
                <div className="fixed inset-0 z-40 backdrop-blur-sm backdrop-opacity-70">
                </div>
            </div>
            <div className="absolute  
        top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 border-brand-400/80
        border-[0.05px]
        bg-gray-light py-5 rounded-lg px-20 shadow-lg text-white z-50 flex flex-wrap justify-center">
                <div className='flex items-end pb-2'>
                    <img
                        src={ch2}
                        alt="Logo"
                        className="md:h-14 h-6"
                        style={{ width: 'auto' }}
                    />
                    <span className='text-gray-500 md:leading-[60px] leading-[25px]  font-poppins md:text-4xl text-md'>ontrol<span className='font-medium text-brand-400'>h<span className=''></span>ub</span></span>

                </div>
                <span className='text-center w-full pb-2'>{message}</span>
                {img}

            </div>
        </>
    )
}

export default Connecting;