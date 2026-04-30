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
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

const form = document.querySelector(".admission-form");
const submitBtn = document.getElementById("submitbtn");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.innerText = "Submitting...";

  const formData = new FormData(form);

  try {
    const response = await fetch("applications.php", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.status === "success") {

      Swal.fire({
        icon: "success",
        title: "Application Sent!",
        text: "Thank you. We’ll contact you shortly.",
        confirmButtonColor: "#2f9e95"
      });

      form.reset();

    } else {

      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: data.message || "Something went wrong.",
        confirmButtonColor: "#f4511c"
      });

    }

  } catch (error) {

    Swal.fire({
      icon: "error",
      title: "Network Error",
      text: "Please try again later.",
      confirmButtonColor: "#f4511c"
    });

  } finally {

    submitBtn.disabled = false;
    submitBtn.innerText = "Schedule a Visit";

  }
});
