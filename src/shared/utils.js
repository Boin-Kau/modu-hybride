//input autoFocusing
export const handleNextFocus = (e, next) => {
  const { value, maxLength } = e.target;
  if (value.length === maxLength) {
    if (next) {
      const nextRef = document.getElementById(next);
      if (nextRef) {
        nextRef.focus();
      }
    }
  }
};
