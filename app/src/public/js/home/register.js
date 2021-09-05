"use strict";

const securityCode = document.querySelector("#security-code"),
      name = document.querySelector("#name"), 
	  id = document.querySelector("#id"),
	  psword = document.querySelector("#psword"),
	  confirmPsword = document.querySelector("#confirm-psword"),
	  registerBtn = document.querySelector("#button");

registerBtn.addEventListener("click", register);

function register() {
	const req = {
		securityCode: securityCode.value,
		name: name.value,
		id: id.value,
		psword: psword.value,
		confirmPsword: confirmPsword.value,
	};

	fetch("/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(req),
	})
		.then((res) => res.json())
		.then((res) => {
		if(res.success) {
			location.href = "/login";
		} else {
			alert(res.msg);
		}
	})
	.catch((err) => {
		console.error(new Error("회원가입 중 에러 발생"));
	});
}
