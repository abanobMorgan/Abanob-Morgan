console.warn("⚠️ loading contact.js");
console.log(window.APP_ENV);

(function () {
  const {
    EMAILJS_PUBLIC_KEY,
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID
  } = window.APP_ENV || {};

  if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
    console.error("❌ Missing EmailJS env variables");
    return;
  }

  emailjs.init(EMAILJS_PUBLIC_KEY);

  function bindFormIfFound() {
    const form = document.getElementById("contact-form");
    if (!form || form.dataset.bound === "true") return;

    console.log("✅ Found and binding #contact-form");
    form.dataset.bound = "true";

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitButton = form.querySelector("button[type='submit']");
      const templateParams = {
        from_name: form.querySelector('input[name="fullName"]').value,
        from_email: form.querySelector('input[name="email"]').value,
        phone: form.querySelector('input[name="phone"]').value,
        inquiry_type: form.querySelector('input[name="inquiryType"]').value,
        message: form.querySelector('textarea[name="message"]').value,
      };

      console.log("📤 Sending email with params:", templateParams);
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.querySelector("span").textContent = "Sending...";
      }

      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
        .then(() => {
          alert("✅ Email sent!");
          form.reset();
        })
        .catch((err) => {
          console.error("❌ Email sending failed:", err);
          alert("❌ Failed to send. Please try again.");
        })
        .finally(() => {
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.querySelector("span").textContent = "Send Message";
          }
        });
    });
  }

  // Try to bind immediately
  bindFormIfFound();

  // Also observe DOM for dynamic injection
  const observer = new MutationObserver(() => {
    bindFormIfFound();
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
