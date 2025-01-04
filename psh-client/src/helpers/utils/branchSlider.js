export const branchSlider = (projects) => ({
  //   perPage: 1,
  perMove: 1,
  gap: "24px",
  pagination: false,
  // arrows: true,
  width: "100%",
  height: "auto",
  drag: true,
  breakpoints: {
    320: {
      perPage: 1,
      focus: "center",
      arrows: false,
      width: "100%",
      height: "auto",
    },
    375: {
      perPage: 1.1,
      focus: "center",
      arrows: false,

      width: "100%",
      height: "auto",
      gap: "0.5rem",
    },
    425: {
      perPage: 1.1,
      focus: "center",
      arrows: false,

      width: "100%",
      height: "auto",
    },
    640: {
      perPage: 1.1,
      arrows: false,
      focus: "center",

      width: "100%",
      height: "auto",
    },
    768: {
      perPage: 2.1,
      arrows: false,
    },
    1024: {
      perPage: 4,
      arrows: projects?.length > 4 ? true : false,
    },
    1280: {
      perPage: 4,
      arrows: projects?.length > 4 ? true : false,
    },
    1880: {
      perPage: 4,
      arrows: projects?.length > 4 ? true : false,
    },
    2560: {
      perPage: 4,
      arrows: projects?.length > 4 ? true : false,
    },
  },
});
