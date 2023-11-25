//signup_script

import $ from "jquery";
import anime from 'animejs';

import { Conductor } from '@catsums/conductorjs';
import {
	docReady,  hardPush, defectAllFormSubmits,
	formDataToJSON, getFormData, 
	setCookie, getCookie, deleteCookie,
	parseURLParams, processAjaxData,
	isObject, isString, isInt, isJSON, 
} from '@catsums/my';
import {
	logg, myHandler, myAPI
} from './mainscript';

var urlParams = parseURLParams(window.location.href) as IJSON;

docReady(main);
function main(){
	console.log(urlParams)
	if(urlParams?.email){
		let _email = urlParams.email as string;

		let emailElem = $('input[name="email"]')[0] as HTMLInputElement;

		if(emailElem){
			emailElem.value = _email;
		}
	}

	$('#confirmPassword')[0].onchange = (event)=>{verifyPasswords(event)};
	$('#password')[0].onchange = (event)=>{verifyPasswords(event)};

	$('.signupRing').on('click',(event)=>{
		if(!checkIfPasswordsAreMatching()){
			return logg("Passwords don't match! Please check your password and confirm password section");
		}
		if((document.getElementsByName('username')[0] as HTMLInputElement).value==""){
			return logg("Username is empty!")
		}
		if((document.getElementsByName('fname')[0] as HTMLInputElement).value==""){
			return logg("First Name is empty!")
		}
		if((document.getElementsByName('sname')[0] as HTMLInputElement).value==""){
			return logg("Last Name is empty!")
		}
		if((document.getElementsByName('pass')[0] as HTMLInputElement).value==""){
			return logg("Password is empty!")
		}
		if((document.getElementsByName('email')[0] as HTMLInputElement).value==""){
			return logg("Email is empty!")
		}
		if((document.getElementsByName('dob')[0] as HTMLInputElement).value==""){
			return logg("DOB is not set!")
		}

		var initFormDat = formDataToJSON(getFormData('#loginForm')) as IUserData;
		initFormDat.preferences = {
			color: 'A',shape: 'A'
		};

		var formDat : IJSON = {
			type: 'signup',
			data: initFormDat
		};

		let opts = {
			method: 'POST',
			body: JSON.stringify(formDat),
			headers: {
				'Content-Type': 'application/json'
			}
		}

		fetch('/api',opts).then(async(res)=>{
			let resData = await res.text();
			if(!isJSON(resData)){
				logg(resData);
				console.log(resData);
			}

			let data = JSON.parse(resData);

			if(data && 'success' in data){
				if(data.success){
					var dat = data.data as IUserData;
					setCookie('JBQ_username',dat.username);
					setCookie('JBQ_userId',dat.id);
					setCookie('JBQ_apikey',dat.apikey);
					setCookie('JBQ_role',dat.role);
					setCookie('JBQ_permissions', JSON.stringify(dat.permissions));
					

					localStorage.setItem('JBQ_username', dat.username);
					localStorage.setItem('JBQ_userId', dat.id);
					localStorage.setItem('JBQ_apikey', dat.apikey);
					localStorage.setItem('JBQ_role', dat.role);
					localStorage.setItem('JBQ_permissions', JSON.stringify(dat.permissions));
					
					if(dat.preferences && isObject(dat.preferences)){
						var _pref = (dat.preferences);
						localStorage.setItem('JBQ_color', _pref.color);
						localStorage.setItem('JBQ_shape', _pref.shape);
						setCookie('JBQ_color', _pref.color);
						setCookie('JBQ_shape', _pref.shape);
					}else{
						localStorage.setItem('JBQ_color', 'A');
						localStorage.setItem('JBQ_shape', 'A');
						setCookie('JBQ_color', 'A');
						setCookie('JBQ_shape', 'A');
					}

					myHandler({
						type: 'activity', subType:'set', url:'/api',
						data:{
							userID: dat.id, type:'Created User',
							info: `${dat.username} joined Just Bops & Quizzes`,
							details:{ friendID: dat.id },
						}
					}).then((res)=>{
						if(!res.success){
							logg('Failed to save activity');
							return;
						}else{
							logg('Logging you in...');

							window.location.href = "/";
						}
					});

					// logg('User creation successful! Now <strong>leave</strong>.');
					console.log(data.message);
				}else{
					console.log('uh oh!');
					logg(data.message);
					throw data.message;
				}
			}

		}).catch((err)=>{
			console.log(err);
		});

	});

	function verifyPasswords(e){
		var passElem = $('#password')[0] as HTMLInputElement;
		var confirmPassElem = $('#confirmPassword')[0] as HTMLInputElement;
		
		if(passElem.value==""||confirmPassElem.value=="") return;
		if(!checkIfPasswordsAreMatching()){
			logg("Passwords do not match! Please retype your password in Confirm Password Section");
		}else{
			logg("");
		}
	}
	function checkIfPasswordsAreMatching(){
		var pass = ($('#password')[0] as HTMLInputElement).value;
		var confirmPass = ($('#confirmPassword')[0] as HTMLInputElement).value;
		if(confirmPass==pass) return true;
		return false;
	}
	defectAllFormSubmits();
}