export const Button = ({ children, onClick }) => {
  return (
    <div onClick={onClick}>
      <button className="p-2 bg-button rounded-md mb-2 text-white border-2">
        {children}
      </button>
    </div>
  );
};
