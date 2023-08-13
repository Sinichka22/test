const form = document.getElementById("form");
const firstNameInput = document.getElementById("firstname");
const lastNameInput = document.getElementById("lastname");
const nationalityInput = document.getElementById("nationality");
const emailInput = document.getElementById("email");
const dateInput = document.getElementById("date");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const genderInputs = document.querySelectorAll('input[name="gender-group"]');
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm");
const button = document.getElementById("form-button");
const formItems = document.querySelectorAll(".form-item");
const formItemGender = document.querySelector(".form__gender-item");

// Button shaking on form submission failure
function shakeButton() {
	button.classList.add("shake");
	setTimeout(function () {
		button.classList.remove("shake");
	}, 500);
}

// Form submission logic
form.addEventListener("submit", function (event) {
	event.preventDefault();

	// Form field validation
	const firstName = firstNameInput.value;
	const lastName = lastNameInput.value;
	const nationality = nationalityInput.value;
	const email = emailInput.value;
	const date = dateInput.value;
	const month = monthInput.value;
	const year = yearInput.value;
	const gender = getSelectedGender();
	const password = passwordInput.value;
	const confirm = confirmInput.value;

	let isError = false;
	
	if (firstName === "") {
		showError(firstNameInput, "Please enter your first name");
		isError = true;
	} else if (!validName(firstName)) {
		showError(firstNameInput, "First name should contain only letters");
		isError = true;
	} else {
		hideError(firstNameInput);
	}

	if (lastName === "") {
		showError(lastNameInput, "Please enter your last name");
		isError = true;
	} else if (!validName(lastName)) {
		showError(lastNameInput, "Last name should contain only letters");
		isError = true;
	} else {
		hideError(lastNameInput);
	}

	if (nationality === "") {
		showError(nationalityInput, "Please select your nationality");
		isError = true;
	} else {
		hideError(nationalityInput);
	}

	if (email === "") {
		showError(emailInput, "Please enter your email");
		isError = true;
	} else if (!validEmail(email)) {
		showError(emailInput, "Please enter a valid email address");
		isError = true;
	} else {
		hideError(emailInput);
	}

	if (date === "" || month === "" || year === "") {
		showError(dateInput, "Please select your date of birth");
		isError = true;
	} else {
		hideError(dateInput);
	}

	if (!gender) {
		showError(formItemGender, "Please select your gender");
		isError = true;
	} else {
		hideError(gender);
	}

	if (password === "") {
		showError(passwordInput, "Please enter a password");
		isError = true;
	} else if (!validPassword(password)) {
		showError(passwordInput, "Password should be at least 8 characters long");
		isError = true;
	} else {
		hideError(passwordInput);
	}

	if (confirm === "") {
		showError(confirmInput, "Please confirm your password");
		isError = true;
	} else if (confirm !== password) {
		showError(confirmInput, "Passwords do not match");
		isError = true;
	} else {
		hideError(confirmInput);
	}

	if (isError) {
		// Causes button shaking
		shakeButton();
		return;
	}

	// Object with data to send
	const formData = {
		firstName: firstName,
		lastName: lastName,
		nationality: nationality,
		email: email,
		date: date,
		month: month,
		year: year,
		gender: gender.value,
		password: password,
		confirm: confirm,
	};
	
	
	fetch("./server-ok.json", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	})
		.then((response) => response.json())
		.then((json) => {
			console.log(json);
			// If the validation is successful, you can submit the form
			alert("Form submitted successfully " + JSON.stringify(formData));
			// Resets the entered form data
			form.reset();
		})

		.catch((error) => {
			alert("Error submitting the form. Please try again later.");
		});
});

// Function to display error
function showError(inputElement, errorMessage) {
	if (!inputElement) {
		return;
	}
	const parentElement = inputElement.closest(".form-item");
	const errorField = parentElement.querySelector(".form__error-message");
	errorField.textContent = errorMessage;
	parentElement.classList.add("error");
}
// Function to hide error
function hideError(inputElement) {
	const parentElement = inputElement.closest(".form-item");
	const errorField = parentElement.querySelector(".form__error-message");
	errorField.textContent = "";
	parentElement.classList.remove("error");
}

// Function to get the selected gender
function getSelectedGender() {
	for (const genderInput of genderInputs) {
		if (genderInput.checked) {
			return genderInput;
		}
	}
	return null;
}

// Function for checking the validity of the first and last name
function validName(value) {
	const nameRegex = /^[a-zA-Z\s]*$/;
	return nameRegex.test(value);
}

// Function to check email validity
function validEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

//Function for checking the validity of a password
function validPassword(password) {
	const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
	return passwordPattern.test(password);
}

//Set the index of the currently displayed field
let currentIndex = 0;

//Function for field appearance
function showField(index) {
	for (let i = 0; i < formItems.length; i++) {
		hideError(formItems[i]);
		if (i <= index) {
			formItems[i].style.display = "block";
		} else {
			formItems[i].style.display = "none";
		}
	}
}

//Displaying the first field on page load
showField(currentIndex);

//Add change and blur event handlers for fields
for (let i = 0; i < formItems.length; i++) {
	const inputsArr = formItems[i].querySelectorAll(".content");
	//
	for (let j = 0; j < inputsArr.length; j++) {
		const choiceOfBehavior =
			inputsArr[j].name == "gender-group" ? "change" : "blur";

		inputsArr[j].addEventListener(choiceOfBehavior, function (e) {
			const parentElement = e.target.closest(".form-item");
			let content = true;
			const contentArray = parentElement.querySelectorAll(".content");
			for (let n = 0; n < contentArray.length; n++) {
				//const contentElEmpty = contentArray.some(contentEmpty);
				content = content && contentArray[n].value.trim() !== "";
			}
			//If the current field is filled, show the next field
			if (content && parentElement.dataset.next > currentIndex) {
				currentIndex = parentElement.dataset.next;
				showField(currentIndex);
			}
		});
	}
}
