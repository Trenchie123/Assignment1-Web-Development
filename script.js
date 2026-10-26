// taking all elements from the HTML file to work with them
const form = document.getElementById('regform');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const genderSelect = document.getElementById('gender');
const dobInput = document.getElementById('dob');
const countryInput = document.getElementById('country');
const phoneInput = document.getElementById('phone');
const bioInput = document.getElementById('bio');

// error small tags
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmError = document.getElementById('confirmError');
const genderError = document.getElementById('genderError');
const dobError = document.getElementById('dobError');
const countryError = document.getElementById('countryError');
const phoneError = document.getElementById('phoneError');
const bioError = document.getElementById('bioError');

// other dynamic stuff
const successMsg = document.getElementById('successMsg');
const memberList = document.getElementById('memberList');
const countSpan = document.getElementById('count');
const emptyNote = document.getElementById('emptyNote');
const themeBtn = document.getElementById('theme');

const allInputs = [nameInput, emailInput, passwordInput, confirmPasswordInput, genderSelect, dobInput, countryInput, phoneInput, bioInput];

// Step 2: log everything to console to confirm they are found
console.log('Checking elements...');
console.log('Form:', form);
console.log('Inputs array:', allInputs);
console.log('Success box:', successMsg);
console.log('Member list:', memberList);
console.log('Counter:', countSpan);
console.log('Theme btn:', themeBtn);

// helper to show error
function setError(input, errorElement, message) {
    input.classList.add('invalid');
    errorElement.textContent = message;
}

// helper to clear error
function clearError(input, errorElement) {
    input.classList.remove('invalid');
    errorElement.textContent = '';
}

// Step 5: clear errors live as the user types/fixes them
allInputs.forEach(input => {
    const errorEl = document.getElementById(`${input.id}Error`) || document.getElementById('confirmError');
    input.addEventListener('input', () => clearError(input, errorEl));
    input.addEventListener('change', () => clearError(input, errorEl));
});

// Step 3 & 4: capture form submit and validate each field
form.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;

    // Check name
    if (!nameInput.value.trim()) {
        setError(nameInput, nameError, 'Full name is required.');
        isValid = false;
    }

    // Check email
    if (!emailInput.value.trim()) {
        setError(emailInput, emailError, 'Email is required.');
        isValid = false;
    } else if (!emailInput.value.includes('@')) {
        setError(emailInput, emailError, 'Email must include @');
        isValid = false;
    }

    // Check password length
    if (!passwordInput.value) {
        setError(passwordInput, passwordError, 'Password is required.');
        isValid = false;
    } else if (passwordInput.value.length < 6) {
        setError(passwordInput, passwordError, 'Must be at least 6 characters.');
        isValid = false;
    }

    // Check confirm password match
    if (!confirmPasswordInput.value) {
        setError(confirmPasswordInput, confirmError, 'Please confirm your password.');
        isValid = false;
    } else if (confirmPasswordInput.value !== passwordInput.value) {
        setError(confirmPasswordInput, confirmError, 'Passwords do not match.');
        isValid = false;
    }

    // Check gender dropdown
    if (!genderSelect.value) {
        setError(genderSelect, genderError, 'Select a gender.');
        isValid = false;
    }

    // Check DOB
    if (!dobInput.value) {
        setError(dobInput, dobError, 'Date of birth is required.');
        isValid = false;
    }

    // Check country
    if (!countryInput.value.trim()) {
        setError(countryInput, countryError, 'Country is required.');
        isValid = false;
    }

    // Check phone
    if (!phoneInput.value.trim()) {
        setError(phoneInput, phoneError, 'Phone number is required.');
        isValid = false;
    }

    // Stop if validation failed
    if (!isValid) return;

    // Step 6: Register the member (create DOM elements)
    if (emptyNote) {
        emptyNote.remove(); // get rid of the "no members yet" text
    }

    const li = document.createElement('li');
    li.className = 'member-item';

    li.innerHTML = `
        <div class="info">
            <strong>${escapeHTML(nameInput.value)}</strong>
            <span>${escapeHTML(emailInput.value)} &bull; ${escapeHTML(countryInput.value)}</span>
        </div>
        <button class="remove">Remove</button>
    `;

    // Step 9: Remove a member button functionality
    const removeBtn = li.querySelector('.remove');
    removeBtn.addEventListener('click', function () {
        li.remove();
        updateCount(-1);

        // Bring back empty note if list is completely empty
        if (memberList.children.length === 0) {
            memberList.innerHTML = `<li class="empty" id="emptyNote">No members yet. Register someone to begin.</li>`;
        }
    });

    memberList.appendChild(li);

    // Step 7: Update member counter
    updateCount(1);

    // Step 8: Show success message and reset form
    successMsg.textContent = 'Registered successfully!';
    successMsg.classList.remove('hidden');
    form.reset();

    // hide message after 3 seconds
    setTimeout(() => {
        successMsg.classList.add('hidden');
    }, 3000);
});

// helper function for counter
function updateCount(num) {
    let current = parseInt(countSpan.textContent) || 0;
    countSpan.textContent = current + num;
}

// security helper to sanitize text inputs
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// Step 10: Dark Mode toggle button
themeBtn.addEventListener('click', function () {
    document.body.classList.toggle('dark');
    
    if (document.body.classList.contains('dark')) {
        themeBtn.textContent = 'Light Mode';
    } else {
        themeBtn.textContent = 'Dark Mode';
    }
});