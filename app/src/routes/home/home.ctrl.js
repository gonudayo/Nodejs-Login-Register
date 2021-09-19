"use strict";

const logger = require("../../config/logger");
const User = require("../../models/User");
const mailer = require('./mail');

const output = {
	home: (req, res) => {
		logger.info(`GET / 304 "홈 화면으로 이동"`);
		res.render("home/index");
	},
	
	login: (req, res) => {
		logger.info(`GET /login 304 "로그인 화면으로 이동"`);
		res.render("home/login");
	},
	
	register: (req, res) => {
		logger.info(`GET /register 304 "회원가입 화면으로 이동"`);
		res.render("home/register");
	},
};


const process = {
	login: async (req, res) => {
		const user = new User(req.body);
		const response = await user.login();
		
		const url = {
			method: "POST",
			path: "/login",
			status: response.err ? 400 : 200,
		}
		
		log(response, url);
		return res.status(url.status).json(response);
	},
	register: async (req, res) => {
		const user = new User(req.body);
		const response = await user.register();
		
		let emailParam = {
			toEmail: req.body.email,
			subject: '안녕하세요. 위드 밀리터리 입니다!',
			text: `아래 링크에 접속하여 이메일 인증을 완료해주세요.`
		};
		await mailer.sendGmail(emailParam);
		
		const url = {
			method: "POST",
			path: "/register",
			status: response.err ? 409 : 201,
		}
		
		log(response, url);
		return res.status(url.status).json(response);
	}
};

module.exports = {
	output,
	process,
};

const log = (response, url) => {
	if (response.err) {
		logger.error(
			`${url.method} ${url.path} ${url.status} Response: ${response.success}, ${response.err}}`
		);
	} else {
		logger.info(
			`${url.method} ${url.path} ${url.status} Response: ${response.success}, ${response.msg || ""}`
		);
	};
}
