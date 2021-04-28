let userOnline = false;

$(document).ready(function () {
    localStorage.setItem("k","k");

	$("#registerForm").validate({
		rules: {
			userName: {
				required: true,
				availableUser: true
			},
			fullName: {
				lettersonly: true,
				required: true
			},
			email: {
				required: true,
				email: true
			},
			password: {
				required: true,
				goodPassword: true
			},
			birthday: {
				required: true
			}
		},
		messages: {
			userName: {
				required: 'required field',
				availableUser: 'username already exists',
			},
			fullName: {
				lettersonly: 'must contain letters only',
				required: "required field"
			},
			email: {
                email: "invalid email",
				required: "required field"
			},
			password: {
				required: "required field",
				goodPassword: "password must contain at least 6 characters with letters and numbers"
			},
			birthday: {
				required: "required field"
			}
		},
		submitHandler: function (form) {
			addUser()
		}
	});

/**
 * check validation of form
 */
	$("#loginForm").validate({
		rules: {
			uname: {
				required: true,
				legalUser: true
			},
			psw: {
				required: true,
				legalPass: true
			},
		},
		messages: {
			uname: {
				required: "required field",
				legalUser: "username does not exist"
			},
			psw: {
				required: "required field",
				legalPass: "incorrect password"
			}
		},
		submitHandler: function () {
			userOnline = true;
			loginUser();
		}
	});

	// make sure user is logged in when "start game" button is clicked
	$("#settingsForm").validate({
		submitHandler: function () {
			if (userOnline === true)
				startGame();
			else
				alert("you must log in before playing");
		}
	});

});


/**
 * check validation of form
 */
$(function () {

	//Password must contain at least 6 digit and contain at least one number and one char.
	$.validator.addMethod('goodPassword', function (value, element) {
		return this.optional(element) ||
			value.length >= 6 && /\d/.test(value) && /[a-z]/i.test(value);
	});

	$.validator.addMethod('availableUser', function (value) {
		return localStorage.getItem(value) == null && value !== '';
	});

	$.validator.addMethod('legalUser', function (value) {
		return localStorage.getItem(value) != null;
	});

	$.validator.addMethod('legalPass', function (value) {
		let key = document.getElementById("logUserName").value;
		return localStorage.getItem(key) === value;
	});

	$.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[a-z\sA-Z]+$/i.test(value);
	});

});

