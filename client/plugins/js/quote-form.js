const form = document.querySelector('.ed-contact__form-main');
const submitBtn = document.querySelector('.quote-submit-btn');
const fullName = document.querySelector('#name');
const phone = document.querySelector('#phone');
const email = document.querySelector('#email');
const vehicleRegistration = document.querySelector('#vehicleRegistration');
const damageDescription = document.querySelector('#message');
const fileInput = document.querySelector('#images');
const uploadImages = document.querySelector('.upload-images');
const msg = document.querySelector('.msg')
let images = [];
const inputResetIcon = document.querySelector('.image-input-reset');
let id;

// Change backend url after testing
const backendUrl = window.env.BACKEND_DOMAIN;

inputResetIcon.addEventListener('click', () => {
    document.querySelector('.images-count').innerText = 0;
    document.querySelector('#images').value = '';
    images = [];
})

uploadImages.addEventListener('click', () => {
    fileInput.click();
})

fileInput.addEventListener('change', (e) => {
    images = e.target.files;
    document.querySelector('.images-count').innerText = images.length;
})

form.addEventListener('submit', async (e) => {
    id && clearTimeout(id);
    e.preventDefault();
    // Enable Spinner, Disable Button
    submitBtn.children[0].classList.add('hidden');
    submitBtn.children[1].classList.remove('hidden');
    submitBtn.disabled = true;
    try {
        if (!fullName.value || !phone.value || !email.value || !vehicleRegistration.value || !damageDescription.value) {
            throw new Error('Please fill in all fields before submitting the form');
        }
        if (images.length < 1) throw new Error('Please upload an image of the damage');
        if (images.length > 5) throw new Error('Maximum of 5 images allowed');
        const largeImages = Array.from(images).filter(image => {
            if (image.size > (30 * 1048576)) return true
        })
        if (largeImages.length > 0) throw new Error('Oops! Each image cannot be larger than 30 MB');
        const invalidImages = Array.from(images).filter(image => {
            if (!image.type.includes('image/')) return true;
        })
        if (invalidImages.length > 0) throw new Error('Invalid file mime type');
        const formData = new FormData();
        formData.append('fullName', fullName.value);
        formData.append('phone', phone.value);
        formData.append('email', email.value),
            formData.append('vehicleRegistration', vehicleRegistration.value),
            formData.append('damageDescription', damageDescription.value),

            Array.from(images).forEach(image => formData.append('images', image));

        // Fetch...
        const response = await fetch(backendUrl + '/quote', {
            method: 'POST',
            body: formData
        })

        const data = await response.json();

        if (!data.success) throw new Error(data.errorMessage)

        msg.innerText = 'Thank you! We’ve received your quote request and will get back to you as soon as possible';
        msg.classList.remove('error-color');
        msg.classList.add('success-color');
        form.reset();
        inputResetIcon.click();

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