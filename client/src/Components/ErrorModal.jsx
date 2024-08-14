import ExclamationIcon from "../assets/error.png";

const ErrorModal = () => {
  return (
    <div className="absolute top-0 right-0 bg-[#00000060] w-full h-full flex justify-center items-center">
      <div className="px-10 py-5 border bg-white flex justify-center items-center flex-col gap-4 rounded-lg">
        <div className="text-center">
          <div className="flex justify-center">
            <img src={ExclamationIcon} alt="" />
          </div>
          <p className="text-xl">Internal server error</p>
          <p className="text-xl">Please try again</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="border-2 px-4 py-2 rounded-lg hover:bg-blue-100 bg-white font-medium"
        >
          Reload
        </button>
      </div>
    </div>
  );
};
export default ErrorModal;
