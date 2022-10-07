/**
 * Empty Checker
 * - Input Element 비어있는지 검사
 */
export const emptyChecker = (inputEl): boolean => {
  if (!inputEl) {
    return false;
  }
  if (inputEl.value === '') {
    return false;
  }
  return true;
};

export const emailChecker = (value: string) => {
  return !!value.match(
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};
