const FreeCard = () => {
  return (
    <div className="relative mt-14 flex w-[256px] justify-center rounded-[20px] item-end content-end">


      <div className="flex-wrap flex font-poppins">
        <div className="mt-16 flex h-fit flex-col pr-2 w-full">
          <p className="text-lg text-left font-bold text-white">Development Product</p>
          <span className="mt-1 text-sm text-gray-400 text-left">
            This is a product in development <br />
            Some features may not work as expected<br />
          </span>
          <a
            target="blank"
            className="text-center mt-4 linear w-[110px] rounded-xl bg-brand-400 hover:bg-brand-600 active:bg-brand-700 py-[10px] text-sm text-white transition duration-200 "
            href="https://danielfpayne.com"
          >
            Find out more
          </a>
        </div>

      </div>
    </div>
  );
};

export default FreeCard;
