const addBlurEffect = (body) => {
  body.classList.add("blur-sm");
};

const removeBlurEffect = (body) => {
  body.classList.remove("blur-sm");
};

export const setupModalHover = (
  timerWindow,
  calculatorWindow,
  stopwatchWindow,
  body
) => {
  const onMouseEnterTimer = () => {
    removeBlurEffect(body);
    calculatorWindow.classList.add("blur-sm");
    stopwatchWindow.classList.add("blur-sm");
  };

  const onMouseEnterCalculator = () => {
    removeBlurEffect(body);
    timerWindow.classList.add("blur-sm");
    stopwatchWindow.classList.add("blur-sm");
  };

  const onMouseEnterStopwatch = () => {
    removeBlurEffect(body);
    timerWindow.classList.add("blur-sm");
    calculatorWindow.classList.add("blur-sm");
  };

  const onMouseLeaveTimer = () => {
    addBlurEffect(body);
    calculatorWindow.classList.remove("blur-sm");
    stopwatchWindow.classList.remove("blur-sm");
  };

  const onMouseLeaveCalculator = () => {
    addBlurEffect(body);
    timerWindow.classList.remove("blur-sm");
    stopwatchWindow.classList.remove("blur-sm");
  };

  const onMouseLeaveStopwatch = () => {
    addBlurEffect(body);
    timerWindow.classList.remove("blur-sm");
    calculatorWindow.classList.remove("blur-sm");
  };

  timerWindow.addEventListener("mouseenter", onMouseEnterTimer);
  calculatorWindow.addEventListener("mouseenter", onMouseEnterCalculator);
  stopwatchWindow.addEventListener("mouseenter", onMouseEnterStopwatch);

  timerWindow.addEventListener("mouseleave", onMouseLeaveTimer);
  calculatorWindow.addEventListener("mouseleave", onMouseLeaveCalculator);
  stopwatchWindow.addEventListener("mouseleave", onMouseLeaveStopwatch);

  const cleanupModalHover = () => {
    removeBlurEffect(body);

    timerWindow.classList.remove("blur-sm");
    calculatorWindow.classList.remove("blur-sm");
    stopwatchWindow.classList.remove("blur-sm");

    timerWindow.removeEventListener("mouseenter", onMouseEnterTimer);
    calculatorWindow.removeEventListener("mouseenter", onMouseEnterCalculator);
    stopwatchWindow.removeEventListener("mouseenter", onMouseEnterStopwatch);

    timerWindow.removeEventListener("mouseleave", onMouseLeaveTimer);
    calculatorWindow.removeEventListener("mouseleave", onMouseLeaveCalculator);
    stopwatchWindow.removeEventListener("mouseleave", onMouseLeaveStopwatch);
  };

  return cleanupModalHover;
};

// FOR TEST PURPOSES ONLY

export const setPosition = (windowElement, top = 0, left = 0) => {
  const originalPosition = windowElement.style.position;
  const originalTop = windowElement.style.top;
  const originalLeft = windowElement.style.left;

  windowElement.style.position = "absolute";
  windowElement.style.top = `${top}px`;
  windowElement.style.left = `${left}px`;

  const restorePosition = () => {
    windowElement.style.position = originalPosition;
    windowElement.style.top = originalTop;
    windowElement.style.left = originalLeft;
  };

  return {
    restorePosition,
  };
};
