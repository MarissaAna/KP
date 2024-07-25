import React from "react";

const Toggle = ({ children, ...props }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer" {...props} />
      <div className="relative w-11 h-6 backdrop-blur-xl peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-primary-50 peer-focus:ring-transparent"></div>
      <span className="ms-3 text-sm font-medium text-gray-900">{children}</span>
    </label>
  );
};

export default Toggle;
