type VirtualKeyboard = {
  hide: () => void,
};

export const useVirtualKeyboard = () => {

  const hide = (callback: () => void, timeout: number) => {
    if ('virtualKeyboard' in navigator) {
      (navigator.virtualKeyboard as VirtualKeyboard).hide();
    }
    setTimeout(function () {
      callback();
    }, timeout);
  }

  return [
    hide
  ];
};