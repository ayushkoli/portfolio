// EmailJS Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    emailjs.init('X5dUS7g6mIo0FUQR7'); // Replace with your actual public key
    
    const form = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.submit-btn');
    const originalButtonText = submitBtn.textContent;
    
    // Add event listener to form
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const templateParams = {
            user_name: formData.get('user_name'),
            user_email: formData.get('user_email'),
            message: formData.get('message'),
            to_email: 'ayushkoli0709@gmail.com' // <-- add your email here
        };
        
        // Validate form before sending
        if (!validateForm(templateParams)) {
            return;
        }
        
        // Show loading state
        showLoadingState();
        
        // Send email using EmailJS
        emailjs.send('service_02xkn13', 'template_a0hnpyp', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showSuccessMessage();
                resetForm();
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                showErrorMessage(error);
            })
            .finally(function() {
                resetButtonState();
            });
    });
    
    // Form validation function
    function validateForm(data) {
        let isValid = true;
        
        // Clear previous error messages
        clearErrorMessages();
        
        // Validate name
        if (!data.user_name || data.user_name.trim().length < 2) {
            showFieldError('user_name', 'Name must be at least 2 characters long');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.user_email || !emailRegex.test(data.user_email)) {
            showFieldError('user_email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
        if (!data.message || data.message.trim().length < 10) {
            showFieldError('message', 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Show field-specific error
    function showFieldError(fieldName, message) {
        const field = form.querySelector(`[name="${fieldName}"]`);
        const formGroup = field.closest('.form-group');
        
        // Create error element
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#ff6b6b';
        errorElement.style.fontSize = '0.9rem';
        errorElement.style.marginTop = '5px';
        
        // Add error styling to field
        field.style.borderColor = '#ff6b6b';
        field.style.backgroundColor = 'rgba(255, 107, 107, 0.1)';
        
        // Append error message
        formGroup.appendChild(errorElement);
    }
    
    // Clear all error messages
    function clearErrorMessages() {
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        const fields = form.querySelectorAll('input, textarea');
        fields.forEach(field => {
            field.style.borderColor = '';
            field.style.backgroundColor = '';
        });
    }
    
    // Show loading state
    function showLoadingState() {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span style="display: inline-block; width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-radius: 50%; border-top-color: white; animation: spin 1s linear infinite; margin-right: 8px;"></span>
            Sending...
        `;
        
        // Add CSS animation if not already present
        if (!document.querySelector('#spin-animation')) {
            const style = document.createElement('style');
            style.id = 'spin-animation';
            style.textContent = `
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Reset button state
    function resetButtonState() {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalButtonText;
    }
    
    // Show success message
    function showSuccessMessage() {
        // Remove any existing messages
        const existingMessages = document.querySelectorAll('.success-message, .error-message-global');
        existingMessages.forEach(msg => msg.remove());
        
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div style="
                background: var(--card-bg, #181818);
                color: var(--text, #fff);
                padding: 20px;
                border-radius: 12px;
                text-align: center;
                font-weight: 600;
                margin-top: 20px;
                border: 2px solid var(--accent, #6cc644);
                box-shadow: 0 0 16px var(--shadow, #fff3);
                animation: slideIn 0.3s ease-out;
            ">
                <h3 style="margin: 0 0 10px 0;">Message Sent Successfully!</h3>
                <p style="margin: 0;">Thank you for reaching out! I'll get back to you soon.</p>
            </div>
        `;
        
        form.insertAdjacentElement('afterend', successMessage);
        
        // Add animation CSS if not present
        if (!document.querySelector('#slideIn-animation')) {
            const style = document.createElement('style');
            style.id = 'slideIn-animation';
            style.textContent = `
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
            if (successMessage) {
                successMessage.style.animation = 'slideOut 0.3s ease-in forwards';
                setTimeout(() => successMessage.remove(), 300);
            }
        }, 5000);
        
        // Add slideOut animation
        if (!document.querySelector('#slideOut-animation')) {
            const style = document.createElement('style');
            style.id = 'slideOut-animation';
            style.textContent = `
                @keyframes slideOut {
                    from { opacity: 1; transform: translateY(0); }
                    to { opacity: 0; transform: translateY(-20px); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Show error message
    function showErrorMessage(error) {
        // Remove any existing messages
        const existingMessages = document.querySelectorAll('.success-message, .error-message-global');
        existingMessages.forEach(msg => msg.remove());
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message-global';
        errorMessage.innerHTML = `
            <div style="
                background: var(--card-bg, #181818);
                color: var(--text, #fff);
                padding: 20px;
                border-radius: 12px;
                text-align: center;
                font-weight: 600;
                margin-top: 20px;
                border: 2px solid #ff6b6b;
                box-shadow: 0 0 16px var(--shadow, #fff3);
                animation: slideIn 0.3s ease-out;
            ">
                <h3 style="margin: 0 0 10px 0;">Failed to Send Message</h3>
                <p style="margin: 0;">Please try again later or contact me directly.</p>
            </div>
        `;
        
        form.insertAdjacentElement('afterend', errorMessage);
        
        // Auto-hide error message after 7 seconds
        setTimeout(() => {
            if (errorMessage) {
                errorMessage.style.animation = 'slideOut 0.3s ease-in forwards';
                setTimeout(() => errorMessage.remove(), 300);
            }
        }, 7000);
    }
    
    // Reset form
    function resetForm() {
        form.reset();
        clearErrorMessages();
    }
    
    // Optional: Add real-time validation
    const fields = form.querySelectorAll('input, textarea');
    fields.forEach(field => {
        field.addEventListener('input', function() {
            // Clear error styling on input
            this.style.borderColor = '';
            this.style.backgroundColor = '';
            
            // Remove field-specific error message
            const formGroup = this.closest('.form-group');
            const errorMsg = formGroup.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
    });
});

// Alternative: If you want to use a more modern approach with async/await
/*
async function sendEmail(templateParams) {
    try {
        const response = await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
        console.log('SUCCESS!', response.status, response.text);
        return { success: true, response };
    } catch (error) {
        console.error('FAILED...', error);
        return { success: false, error };
    }
}
*/