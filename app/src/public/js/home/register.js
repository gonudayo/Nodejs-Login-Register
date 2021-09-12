"use strict";

const name = document.querySelector("#name"), 
	  id = document.querySelector("#id"),
	  psword = document.querySelector("#psword"),
	  confirmPsword = document.querySelector("#confirm-psword"),
	  securityCode = document.querySelector("#security-code"),
	  registerBtn = document.querySelector("#button");

registerBtn.addEventListener("click", register);

function register() {
	if(!name.value) return alert("이름을 입력해 주세요.");
	if(!id.value) return alert("아이디를 입력해 주세요.");
	if(!psword.value) return alert("비밀번호를 입력해 주세요");
	if (psword.value !== confirmPsword.value) return alert("비밀번호가 일치하지 않습니다.");
	if(!securityCode.value) return alert("보안 코드를 입력해 주세요.");
	if(securityCode.value !== '0119') return alert("보안 코드가 잘못 입력 되었습니다.")
	const req = {
		name: name.value,
		id: id.value,
		psword: psword.value,
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
			if (res.err) return alert(res.err);
			alert(res.msg);
		}
	})
	.catch((err) => {
		console.error(new Error("회원가입 중 에러 발생"));
	});
}
