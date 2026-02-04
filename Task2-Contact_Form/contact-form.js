const form = document.querySelector('.contact-us-form').querySelector('form');

document.querySelector('#message').addEventListener('input', function() {
    const characterCount = this.value.length;
    const characterCountDisplay = document.querySelector('.character-count');
    characterCountDisplay.textContent = `${characterCount}/500`;
    if (characterCount > 499) {
        characterCountDisplay.style.color = 'red';
        this.value = this.value.substring(0, 499);
    }
    else {
        characterCountDisplay.style.color = 'var(--text-muted)';
    }
});
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const errorMessage = document.querySelector('.contact-us-error');
    const Fname = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const subject = form.querySelector('#subject').value.trim();
    const message = form.querySelector('#message').value.trim();
    if (Fname === '' || email === '' || subject === '' || message === '') {
        errorMessage.textContent = 'Please fill in all fields.';
        return;
    }

    if(Fname.length < 3){
        errorMessage.textContent = 'Name must be at least 3 characters long.';
        return;
    }
    const noNumbersNoSpecialChars = /^[A-Za-z\s]+$/;
    if (!noNumbersNoSpecialChars.test(Fname)) {
        errorMessage.textContent = 'Name can only contain letters and spaces.';
        return;
    }

    if(subject.length < 5){
        errorMessage.textContent = 'Subject must be at least 5 characters long.';
        return;
    }
    if(message.length < 10){
        errorMessage.textContent = 'Message must be at least 10 characters long.';
        return;
    }

    if(message.length > 500){
        errorMessage.textContent = 'Message cannot exceed 500 characters.';
        return;
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        return;
    }
    
    errorMessage.style.color = '#39ad2c';
    errorMessage.textContent = 'Form Submitted Successfully!';
    setTimeout(() => {
        errorMessage.textContent = '';
        errorMessage.style.color = '#f63838';
        form.reset();
    }, 3000);


});