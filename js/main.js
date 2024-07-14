const swiper = new Swiper(".swiper", {
  spaceBetween: 50,
  slidesPerView: 2,
  // loop: true,
  freeMode: true,
  grabCursor: true,

  navigation: {
    nextEl: "#arrow-right",
    prevEl: "#arrow-left",
  },

  pagination: {
    el: ".pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return (
        '<span class="' +
        className +
        '">' +
        `<button class="pagination__btn" type="button">
                      <span class="visually-hidden">${index + 1} slide</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.0099 2.05941L14 0L11.9604 7.0099L14 14L7.0099 11.9604L0 14L2.05941 7.0099L0 0L7.0099 2.05941Z"
                          fill="white"
                        />
                      </svg>
                    </button>` +
        "</span>"
      );
    },
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 50,
    },
  },
});

document.querySelectorAll(".process__accordion-header").forEach((element) =>
  element.addEventListener("click", (event) => {
    const detailsElement = event.target.parentElement;
    const contentElement = event.target.nextElementSibling;

    animateDetails(detailsElement, contentElement);
  })
);

document.querySelectorAll(".process__accordion-indicator").forEach((element) =>
  element.addEventListener("click", (event) => {
    const detailsElement = event.target.parentElement.parentElement;
    const contentElement = event.target.parentElement.nextElementSibling;

    animateDetails(detailsElement, contentElement);
  })
);

function animateDetails(detailsElement, contentElement) {
  // Chrome sometimes has a hiccup and gets stuck.
  if (contentElement.classList.contains("animation")) {
    // So we make sure to remove those classes manually,
    contentElement.classList.remove("animation", "collapsing");
    // ... enforce a reflow so that collapsing may be animated again,
    void element.offsetWidth;
    // ... and fallback to the default behaviour this time.
    return;
  }

  const onAnimationEnd = (cb) =>
    contentElement.addEventListener("animationend", cb, { once: true });

  // request an animation frame to force Safari 16 to actually perform the animation
  requestAnimationFrame(() => contentElement.classList.add("animation"));
  onAnimationEnd(() => contentElement.classList.remove("animation"));

  const isDetailsOpen = detailsElement.getAttribute("open") !== null;
  if (isDetailsOpen) {
    // prevent default collapsing and delay it until the animation has completed
    event.preventDefault();
    contentElement.classList.add("collapsing");
    onAnimationEnd(() => {
      detailsElement.removeAttribute("open");
      contentElement.classList.remove("collapsing");
    });
  }
}
