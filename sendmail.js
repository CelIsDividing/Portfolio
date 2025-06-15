document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const statusElement = document.getElementById('form-status');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = '[ SENDING... ]';
    statusElement.style.display = 'none';
    
    try {
        // Create FormData object
        const formData = new FormData(form);
        
        // Add Web3Forms required fields
        formData.append('subject', 'New Contact Form Submission');
        formData.append('from_name', form.name.value);
        formData.append('reply_to', form.email.value);
        formData.append('timestamp', new Date().toISOString());
        
        // Submit to Web3Forms
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            statusElement.textContent = '> MESSAGE SENT SUCCESSFULLY!';
            statusElement.style.color = '#38c533';
            form.reset();
        } else {
            const errorMsg = result.message || 'Form submission failed';
            statusElement.textContent = `> ERROR: ${errorMsg}`;
            statusElement.style.color = '#ff3333';
        }
    } catch (error) {
        console.error('Form submission error:', error);
        statusElement.textContent = '> NETWORK ERROR - PLEASE TRY AGAIN';
        statusElement.style.color = '#ff3333';
    } finally {
        statusElement.style.display = 'block';
        submitButton.disabled = false;
        submitButton.textContent = '[ SEND ]';
    }
});