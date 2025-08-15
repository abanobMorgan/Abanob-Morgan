'use strict';

document.addEventListener("DOMContentLoaded", function () {
  // ===== Utility Functions =====
  const elementToggleFunc = (elem) => elem.classList.toggle("active");

  // ===== Sidebar Toggle =====
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");
  if (sidebar && sidebarBtn) {
    sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));
  }

  // ===== Testimonials Modal =====
  const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  const testimonialsModalFunc = () => {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  };

  testimonialsItem.forEach(item => {
    item.addEventListener("click", () => {
      modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = item.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = item.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    });
  });


// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

  // ===== Custom Select Filter =====
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-selecct-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter-item]");

  const filterFunc = (selectedValue) => {
    filterItems.forEach(item => {
      const matches = selectedValue === "all" || selectedValue === item.dataset.category;
      item.classList.toggle("active", matches);
    });
  };

  if (select) {
    select.addEventListener("click", () => elementToggleFunc(select));
  }

  selectItems.forEach(item => {
    item.addEventListener("click", () => {
      const selectedValue = item.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = item.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  });

  let lastClickedBtn = filterBtn[0];
  filterBtn.forEach(btn => {
    btn.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue);
      lastClickedBtn?.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });

  // ===== Contact Form Validation =====
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  if (form && formBtn) {
    formInputs.forEach(input => {
      input.addEventListener("input", () => {
        formBtn.disabled = !form.checkValidity();
      });
    });
  }
  // ===== EmailJS Setup =====
  if (typeof emailjs !== "undefined") {
    emailjs.init(EMAILJS_PUBLIC_KEY); // Replace with your EmailJS public key
  }

  const send_me_an_email = (event) => {
    event.preventDefault();

    const btn = document.querySelector('[data-form-btn]');
    if (!btn) return;

    btn.disabled = true;
    btn.querySelector('span').textContent = 'Sending...';

    const fullname = document.querySelector('input[name="fullName"]')?.value || "";
    const email = document.querySelector('input[name="email"]')?.value || "";
    const phone = document.querySelector('input[name="phone"]')?.value || "";
    const inquiryType = document.querySelector('input[name="inquiryType"]')?.value || "";
    const message = document.querySelector('textarea[name="message"]')?.value || "";

    const templateParams = {
      from_name: fullname,
      from_email: email,
      from_phone: phone,
      inquiry_type: inquiryType,
      message: message,
      to_name: "Abanob Morgan",
      to_email: "abanob.k.morgan@gmail.com"
    };

    emailjs.send("EMAILJS_SERVICE_ID", "EMAILJS_TEMPLATE_ID", templateParams)
      .then(() => {
        showNotification('✅ Message sent successfully!', 'success');
        form.reset();
        btn.querySelector('span').textContent = 'Send Message';
        btn.disabled = false;
      })
      .catch(error => {
        console.error("❌ Email sending failed:", error);
        showNotification('❌ Failed to send. Please try again.', 'error');
        btn.querySelector('span').textContent = 'Send Message';
        btn.disabled = false;
      });
  };

  // Bind form submission
  const contactForm = document.querySelector('.form');
  if (contactForm) {
    contactForm.addEventListener('submit', send_me_an_email);
  }

  // ===== Notification UI =====
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 15px 25px;
      border-radius: 4px;
      color: white;
      z-index: 1000;
      animation: slideIn 0.5s ease-out;
    `;

    notification.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.5s ease-out';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }

  // ===== Inject Notification CSS =====
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
});

