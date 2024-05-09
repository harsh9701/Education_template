const slider = document.querySelector('.slider');
let count = 0;

function nextSlide() {
  count++;
  if (count >= slider.children.length) {
    count = 0;
  }
  slider.style.transform = `translateX(-${count * 100}%)`;
}

setInterval(nextSlide, 3000); // Change slide every 3 seconds


document.addEventListener("DOMContentLoaded", function() {
  console.log("DOMContentLoaded event fired");
  const openModalBtn = document.getElementById("openModalBtn");
  const modal = document.getElementById("myModal");
  const closeModalBtn = modal.querySelector(".close");

  console.log(openModalBtn, modal, closeModalBtn);

  openModalBtn.addEventListener("click", function() {
      console.log("Open modal button clicked");
      modal.style.display = "block";
  });

  closeModalBtn.addEventListener("click", function() {
      console.log("Close modal button clicked");
      modal.style.display = "none";
  });

  window.addEventListener("click", function(event) {
      if (event.target === modal) {
          console.log("Clicked outside modal");
          modal.style.display = "none";
      }
  });

  // Prevent form submission and handle it as needed
  const modalForm = document.getElementById("modalForm");
  modalForm.addEventListener("submit", function(event) {
      event.preventDefault();
      console.log("Form submitted");
      // You can add your form submission logic here
  });
});

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()