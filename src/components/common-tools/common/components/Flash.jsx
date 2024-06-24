import useFlash from "../../hooks/useFlash";

const FlashComponent = () => {
  const { isShowFlash } = useFlash();

  if (isShowFlash)
    return (
      <div className="fixed inset-0 w-screen h-screen bg-white opacity-80 z-[70] pointer-events-none animate-flash" />
    );

  return null;
};

export default FlashComponent;
