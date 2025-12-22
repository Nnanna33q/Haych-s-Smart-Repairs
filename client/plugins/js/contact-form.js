const form = document.querySelector('.ed-contact__form-main');
const submitBtn = document.querySelector('.contact-submit-btn');
const fullName = document.querySelector('#name');
const phone = document.querySelector('#phone');
const email = document.querySelector('#email');
const message = document.querySelector('#message');
const msg = document.querySelector('.msg')
let id;

// Change backend url after testing
const backendUrl = window.env.BACKEND_DOMAIN;

form.addEventListener('submit', async (e) => {
    id && clearTimeout(id);
    e.preventDefault();
    // Enable Spinner, Disable Button
    submitBtn.children[0].classList.add('hidden');
    submitBtn.children[1].classList.remove('hidden');
    submitBtn.disabled = true;
    try {
        if (!fullName.value || !phone.value || !email.value || !message.value) {
            throw new Error('Please fill in all fields before submitting the form');
        }

        // Fetch...
        const response = await fetch(backendUrl + '/contact', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fullName: fullName.value,
                phone: phone.value,
                email: email.value,
                message: message.value
            })
        })

        const data = await response.json();

        if (!data.success) throw new Error(data.errorMessage)

        console.log(data);

        msg.innerText = 'Thank you! We’ve received your contact request and will get back to you as soon as possible';
        msg.classList.remove('error-color');
        msg.classList.add('success-color');
        form.reset();

        // Clear msg's text content and remove error and success color classes after 5 seconds
        id = setTimeout(() => {
            msg.innerHTML = '';
            msg.classList.remove('error-color');
            msg.classList.remove('success-color');
        }, 5000)

    } catch (error) {
        if (error instanceof Error) {
            msg.innerText = error.message;
        } else msg.innerText = 'An unexpected error occurred';
        console.error(error);
        msg.classList.remove('success-color');
        msg.classList.add('error-color');
    }
    // Disable Spinner, Enable Button
    submitBtn.children[0].classList.remove('hidden');
    submitBtn.children[1].classList.add('hidden');
    submitBtn.disabled = false;
})