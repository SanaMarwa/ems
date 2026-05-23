// const burger = document.getElementById('menuToggle');
// const nav = document.getElementById('navMenu');
// const overlay = document.getElementByClassName('overlay');

// burger.addEventListener('click', () => {
//   nav.classList.toggle('active')
//   burger.classList.toggle('toggle')
//   overlay.classList.toggle('overlay-active');
// })

const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("navMenu");
const links = nav.querySelectorAll("a");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  nav.classList.toggle("active");
  document.body.classList.toggle("menu-open");
});

links.forEach(link => {
  link.addEventListener("click", () => {
    toggle.classList.remove("active");
    nav.classList.remove("active");
    document.body.classList.remove("menu-open");
  });
});

// slideshow
// var slideIndex = 1;
// showSlides(slideIndex);

// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   var i;
//   var slides = document.getElementsByClassName("mySlides");
//   var dots = document.getElementsByClassName("dot");
//   if (n > slides.length) { slideIndex = 1 }
//   if (n < 1) { slideIndex = slides.length }
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex - 1].style.display = "block";
//   dots[slideIndex - 1].className += " active";
// }

// REPLACE your current JS completely with this
// Includes email validation + better UX

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".admission-form");
  const submitBtn = document.getElementById("submitbtn");
  const emailInput = document.getElementById("email");

  if (!form || !submitBtn) return;

  const defaultText = submitBtn.innerHTML;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    /* =========================
       FRONTEND EMAIL VALIDATION
    ========================= */
    const email = emailInput.value.trim();

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!emailPattern.test(email)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
        confirmButtonColor: "#2f9e8f"
      });

      emailInput.focus();
      return;
    }

    /* =========================
       LOADING STATE
    ========================= */
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span style="display:flex;align-items:center;justify-content:center;gap:10px;">
        <span class="mini-spinner"></span>
        Submitting...
      </span>
    `;

    try {
      const formData = new FormData(form);

      const response = await fetch(form.action, {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      // Restore button
      submitBtn.disabled = false;
      submitBtn.innerHTML = defaultText;

      if (data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Inquiry Sent!",
          text: "Thank you. Our admissions team will contact you shortly.",
          confirmButtonColor: "#2f9e8f",
          timer: 2600,
          showConfirmButton: false
        });

        form.reset();

      } else {
        Swal.fire({
          icon: "warning",
          title: "Please Check Your Details",
          text: data.message || "Some information needs attention.",
          confirmButtonColor: "#2f9e8f"
        });
      }

    } catch (error) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = defaultText;

      Swal.fire({
        icon: "error",
        title: "Connection Error",
        text: "Unable to submit right now. Please try again.",
        confirmButtonColor: "#2f9e8f"
      });
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {

  const track = document.querySelector(".gallery-track");
  const slides = document.querySelectorAll(".gallery-slide");
  const nextBtn = document.querySelector(".gallery-btn.next");
  const prevBtn = document.querySelector(".gallery-btn.prev");
  const dotsContainer = document.querySelector(".gallery-dots");

  let currentIndex = 0;

  // CREATE DOTS
  slides.forEach((_, index) => {

    const dot = document.createElement("button");

    dot.classList.add("gallery-dot");

    if (index === 0) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
    });

    dotsContainer.appendChild(dot);

  });

  const dots = document.querySelectorAll(".gallery-dot");

  // UPDATE
  function updateCarousel() {

    const slideWidth =
      slides[0].getBoundingClientRect().width + 24;

    track.style.transform =
      `translateX(-${currentIndex * slideWidth}px)`;

    dots.forEach(dot => dot.classList.remove("active"));

    if (dots[currentIndex]) {
      dots[currentIndex].classList.add("active");
    }

  }

  // NEXT
  nextBtn.addEventListener("click", () => {

    if (currentIndex < slides.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }

    updateCarousel();

  });

  // PREV
  prevBtn.addEventListener("click", () => {

    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = slides.length - 1;
    }

    updateCarousel();

  });

  // AUTO SLIDE
  let autoSlide = setInterval(() => {

    if (currentIndex < slides.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }

    updateCarousel();

  }, 4500);

  // PAUSE ON HOVER
  track.addEventListener("mouseenter", () => {
    clearInterval(autoSlide);
  });

  track.addEventListener("mouseleave", () => {

    autoSlide = setInterval(() => {

      if (currentIndex < slides.length - 1) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }

      updateCarousel();

    }, 4500);

  });

  // TOUCH SWIPE
  let startX = 0;

  track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", e => {

    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {

      if (currentIndex < slides.length - 1) {
        currentIndex++;
        updateCarousel();
      }

    }

    if (endX - startX > 50) {

      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }

    }

  });

});


document.addEventListener("DOMContentLoaded", () => {

  const images = document.querySelectorAll(".gallery-image");

  const lightbox = document.getElementById("lightbox");

  const lightboxImage =
    document.getElementById("lightboxImage");

  const closeBtn =
    document.querySelector(".lightbox-close");

  const prevBtn =
    document.querySelector(".lightbox-nav.prev");

  const nextBtn =
    document.querySelector(".lightbox-nav.next");

  let currentIndex = 0;

  // OPEN LIGHTBOX

  images.forEach((image, index) => {

    image.addEventListener("click", () => {

      currentIndex = index;

      showImage();

      lightbox.classList.add("active");

      document.body.style.overflow = "hidden";

    });

  });

  // SHOW IMAGE

  function showImage() {

    lightboxImage.src =
      images[currentIndex].src;

    lightboxImage.alt =
      images[currentIndex].alt;

  }

  // CLOSE

  function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

  }

  closeBtn.addEventListener("click", closeLightbox);

  // CLICK OUTSIDE TO CLOSE

  lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {
      closeLightbox();
    }

  });

  // NEXT

  nextBtn.addEventListener("click", () => {

    currentIndex =
      (currentIndex + 1) % images.length;

    showImage();

  });

  // PREV

  prevBtn.addEventListener("click", () => {

    currentIndex =
      (currentIndex - 1 + images.length)
      % images.length;

    showImage();

  });

  // KEYBOARD SUPPORT

  document.addEventListener("keydown", (e) => {

    if (!lightbox.classList.contains("active"))
      return;

    if (e.key === "Escape") {
      closeLightbox();
    }

    if (e.key === "ArrowRight") {

      currentIndex =
        (currentIndex + 1) % images.length;

      showImage();

    }

    if (e.key === "ArrowLeft") {

      currentIndex =
        (currentIndex - 1 + images.length)
        % images.length;

      showImage();

    }

  });

  // MOBILE SWIPE

  let startX = 0;

  lightbox.addEventListener("touchstart", e => {

    startX = e.touches[0].clientX;

  });

  lightbox.addEventListener("touchend", e => {

    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {

      currentIndex =
        (currentIndex + 1) % images.length;

      showImage();

    }

    if (endX - startX > 50) {

      currentIndex =
        (currentIndex - 1 + images.length)
        % images.length;

      showImage();

    }

  });

});
