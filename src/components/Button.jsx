const Button = ({ children, bgColor = "bg-indigo-600", gradientColor = "", text = "text-white" }) => {
  return (
    <>
      <style>{`
        .button-wrapper::before {
          animation: spin-gradient 4s linear infinite;
          background: conic-gradient(
            from 0deg,
            ${gradientColor},
            ${gradientColor}30,
            ${gradientColor}
          );
        }

        @keyframes spin-gradient {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="relative inline-block p-1 rounded-full overflow-hidden
        hover:scale-105 transition duration-500 active:scale-100
        before:content-[''] before:absolute before:inset-0 before:z-0
        button-wrapper"
      >
        <button
          className={`relative z-10 ${bgColor} ${text} rounded-full px-5 py-2 font-medium text-sm cursor-pointer`}
        >
          {children}
        </button>
      </div>
    </>
  );
};

export default Button;
