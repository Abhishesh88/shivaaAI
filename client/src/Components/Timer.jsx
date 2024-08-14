import PropTypes from "prop-types";

function Timer({ secondsRemaining }) {
  return (
    <div className="flex justify-center items-center ml-2 text-red-600 absolute bottom-0 right-2 ">
      <p className="font-bold text-xl">
        {secondsRemaining < 10 ? "0" + secondsRemaining : secondsRemaining}
      </p>
    </div>
  );
}

Timer.propTypes = {
  secondsRemaining: PropTypes.number,
};

export default Timer;
