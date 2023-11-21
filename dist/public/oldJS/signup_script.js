//signup_script

let myMods = [];
import * as mod_conductor from './conductor.js'; myMods.push(mod_conductor);
import * as mod_helper from './myHelperFunctions.js'; myMods.push(mod_helper);
import * as mod_main from './mainscript.js'; myMods.push(mod_main);
import * as mod_myMouse from './myMouse.js'; myMods.push(mod_myMouse);

for(let mod of myMods){
	Object.entries(mod).forEach(([name, exported]) => window[name] = exported);
}

var urlParams = parseURLParams(window.location.href);

docReady(main);
function main(){
	console.log(urlParams)
	if(urlParams?.email){
		let _email = urlParams.email;

		let emailElem = $('input[name="email"]')[0];

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
		if(document.getElementsByName('username')[0].value==""){
			return logg("Username is empty!")
		}
		if(document.getElementsByName('fname')[0].value==""){
			return logg("First Name is empty!")
		}
		if(document.getElementsByName('sname')[0].value==""){
			return logg("Last Name is empty!")
		}
		if(document.getElementsByName('pass')[0].value==""){
			return logg("Password is empty!")
		}
		if(document.getElementsByName('email')[0].value==""){
			return logg("Email is empty!")
		}
		if(document.getElementsByName('dob')[0].value==""){
			return logg("DOB is not set!")
		}

		var initFormDat = formDataToJSON(getFormData('#loginForm'));
		initFormDat.preferences = {
			color: 'A',shape: 'A'
		};

		var formDat = {
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
				logg(data);
				console.log(data);
			}

			let data = JSON.parse(resData);

			if(data && 'success' in data){
				if(data.success){
					var dat = data.data;
					setCookie('JBQ_username',dat.username);
					setCookie('JBQ_userId',dat.id);
					setCookie('JBQ_apikey',dat.apikey);
					setCookie('JBQ_role',dat.role);
					setCookie('JBQ_permissions',dat.permissions);
					

					localStorage.setItem('JBQ_username', dat.username);
					localStorage.setItem('JBQ_userId', dat.id);
					localStorage.setItem('JBQ_apikey', dat.apikey);
					localStorage.setItem('JBQ_role', dat.role);
					localStorage.setItem('JBQ_permissions', dat.permissions);
					
					if(dat.preferences && isJSON(dat.preferences)){
						var _pref = JSON.parse(dat.preferences);
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
		var passElem = $('#password')[0];
		var confirmPassElem = $('#confirmPassword')[0];
		if(passElem.value==""||confirmPassElem.value=="") return;
		if(!checkIfPasswordsAreMatching()){
			logg("Passwords do not match! Please retype your password in Confirm Password Section");
		}else{
			logg("");
		}
	}
	function checkIfPasswordsAreMatching(){
		var pass = $('#password')[0].value;
		var confirmPass = $('#confirmPassword')[0].value;
		if(confirmPass==pass) return true;
		return false;
	}
	defectAllFormSubmits();
}