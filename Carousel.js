// import * as bootstrap from "bootstrap";
// import { favourite } from "./index.mjs";

window.createCarouselItem = function(imgSrc, imgAlt, imgId) {
  const template = document.querySelector("#carouselItemTemplate");
  const clone = template.content.firstElementChild.cloneNode(true);

  const img = clone.querySelector("img");
  img.src = imgSrc;
  img.alt = imgAlt;

  const favBtn = clone.querySelector(".favourite-button");
  favBtn.addEventListener("click", () => {
    favourite(imgId);
  });

  return clone;
}

window.clear = function() {
  const carousel = document.querySelector("#carouselInner");
  while (carousel.firstChild) {
    carousel.removeChild(carousel.firstChild);
  }
}

window.appendCarousel = function(element) {
  const carousel = document.querySelector("#carouselInner");
  const activeItem = document.querySelector(".carousel-item.active");
  if (!activeItem) element.classList.add("active");

  carousel.appendChild(element);
}

window.start = function() {
  const multipleCardCarousel = document.querySelector("#carouselExampleControls");
  
  if (window.matchMedia("(min-width: 768px)").matches) {
    const carousel = new bootstrap.Carousel(multipleCardCarousel, {
      interval: false // Disable auto cycling
    });
    
    const carouselInner = $("#carouselInner");
    const carouselWidth = carouselInner[0].scrollWidth;
    const cardWidth = $(".carousel-item").outerWidth(); // Use outerWidth for margins
    let scrollPosition = 0;

    // Next button event
    $("#carouselExampleControls .carousel-control-next").off("click").on("click", function () {
      if (scrollPosition < carouselWidth - cardWidth * 4) {
        scrollPosition += cardWidth;
        carouselInner.animate({ scrollLeft: scrollPosition }, 600);
      } else {
        // Optionally, loop back to the beginning
        scrollPosition = 0; // Reset to the start
        carouselInner.animate({ scrollLeft: scrollPosition }, 600);
      }
    });

    // Previous button event
    $("#carouselExampleControls .carousel-control-prev").off("click").on("click", function () {
      if (scrollPosition > 0) {
        scrollPosition -= cardWidth;
        carouselInner.animate({ scrollLeft: scrollPosition }, 600);
      } else {
        // Optionally, loop to the end
        scrollPosition = carouselWidth - cardWidth * 4; // Set to the end
        carouselInner.animate({ scrollLeft: scrollPosition }, 600);
      }
    });
  } else {
    $(multipleCardCarousel).addClass("slide");
  }
}
