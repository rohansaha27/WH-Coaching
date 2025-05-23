document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    const resourcesForm = document.querySelector('.resources-form');
    
    if (resourcesForm) {
      console.log('Form found - adding event listener');
      
      resourcesForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Form submission prevented');
  
        // Get the submit button
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
  
        // ✅ Now use sendForm, NOT send
        emailjs.sendForm(
          'service_q9dg90w',   // your service ID
          'template_tp2wpnv',  // your template ID
          this                // pass the full form (this refers to form element)
        )
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          
          submitButton.textContent = 'Sent Successfully!';
          resourcesForm.reset();
  
          const successMessage = document.createElement('p');
          successMessage.className = 'success-message';
          successMessage.textContent = 'Check your email for your free resources!';
          resourcesForm.appendChild(successMessage);
  
          setTimeout(() => {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
          }, 3000);
        })
        .catch(function(error) {
          console.log('FAILED...', error);
          
          submitButton.textContent = 'Failed to Send';
          const errorMessage = document.createElement('p');
          errorMessage.className = 'error-message';
          errorMessage.textContent = 'Something went wrong. Please try again.';
          resourcesForm.appendChild(errorMessage);
  
          setTimeout(() => {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
          }, 3000);
        });
  
        return false;
      });
    } else {
      console.error('Form with class "resources-form" not found!');
    }
  });