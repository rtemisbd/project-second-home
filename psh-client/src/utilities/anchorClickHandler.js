export const anchorClickHandler = (e) => {
  e.preventDefault();
  const hash = e.target.getAttribute("href").split("#")[1];
  if (hash === "") return false;

  const targetElement = document.getElementById(hash);
  if (targetElement) {
    const navbarHeight = document.querySelector(".navbar_sticky").offsetHeight;
    const targetOffsetTop =
      targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

    window.scrollTo({
      top: targetOffsetTop,
      behavior: "smooth",
    });
  }
};
