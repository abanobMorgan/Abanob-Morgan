(function() {
    // Initialize EmailJS
    emailjs.init("YOUR_PUBLIC_KEY");

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();

        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
            .then(function() {
                console.log('SUCCESS!');
                alert('Message sent successfully!');
                document.getElementById('contactForm').reset();
            }, function(error) {
                console.log('FAILED...', error);
                alert('Failed to send message. Please try again.');
            });
    });
})();

