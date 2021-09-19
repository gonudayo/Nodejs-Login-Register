"use strict";

const id = document.querySelector("#id"),
	  psword = document.querySelector("#psword"),
	  confirmPsword = document.querySelector("#confirm-psword"),
	  email = document.querySelector("#email"),
	  registerBtn = document.querySelector("#button");

registerBtn.addEventListener("click", register);

function register() {
	if(!id.value) return alert("아이디를 입력해 주세요.");
	if(!psword.value) return alert("비밀번호를 입력해 주세요");
	if (psword.value !== confirmPsword.value) return alert("비밀번호가 일치하지 않습니다.");
	if(!email.value) return alert("이메일을 입력해 주세요.");
	const req = {
		id: id.value,
		psword: psword.value,
		email: email.value,
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
			alert("가입하신 이메일로 인증 메일이 발송 되었습니다.");
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
