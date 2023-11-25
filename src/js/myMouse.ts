/*myMouse.js*/

import anime from 'animejs';
import $ from 'jquery';
import {
	rad2deg, randomId, rndInt, randomID,
} from '@catsums/my';
import { Vector2 } from '@catsums/vector2';

(function(){
	var mouseStopTimer; 
	var isMouseMoving = false;
	var body = $('body')[0];

	var lastMousePos = new Vector2();
	var mousePos = new Vector2();
	var mouseDir = new Vector2();

	//for mouse particles
	var lastX, lastY;
	var particles : (Element | JQuery)[] = [];
	var particleAmt = 10;
	var spread = 8;
	var wX = $('#myMouse').css('width').slice(0,-2);
	var wY = $('#myMouse').css('height').slice(0,-2);

	$('body').on('ready',(e)=>{
		// $('#myMouse').css("top",event.pageY).css("left",event.pageX);
		$('body').css("cursor","none");
	}).on('mousemove',(e)=>{
		clearTimeout(mouseStopTimer);
		mousePos.x = e.pageX;
		mousePos.y = e.pageY;

		onMouseMove(e);
		lastMousePos.x = mousePos.x;
		lastMousePos.y = mousePos.y;
		mouseStopTimer = setTimeout(()=>{
			onMouseStop(e);
		},10);

	});

	$('*').click((e)=>{
		onMouseClick(e);
	});

	var anim_move, anim_stop;

	function onMouseMove(event){
		mouseDir = mousePos.lineTo(lastMousePos).normalized();
		var angK = `${rad2deg(mouseDir.angle())}deg`;

		// document.getElementById('myMouse').style.transform = 'scaleY(0.75) rotate('+angK+')';
		$('#myMouse').css('transform',`scaleY(0.75) scaleX(1.25) rotate(${angK})`);
		if(!isMouseMoving){
			isMouseMoving = true;
		}
		mouseParticles_Move(event);
	}
	function onMouseStop(event){
		isMouseMoving = false;
		mouseDir = mousePos.lineTo(lastMousePos).normalized();
		$('#myMouse').css('transform','rotate(0deg)');
		anim_stop = anime({
			targets: '#myMouse',
			scaleY: ['1','1.35','0.65','1.225','0.725','1.112','0.906','1'],
			scaleX: ['1','1.09','0.93','1.075','0.955','1.043','0.973','1'],
			duration: 800,
			easing: "easeInOutQuad",
			direction: 'normal',
		});
	}
	function onMouseClick(event){
		mouseParticles_Click(event);
	}
	function mouseParticles_Move(event){
		let posX = event.pageX - (Number(wX)/2);
		let posY = event.pageY - (Number(wY)/2);
		$('#myMouse').css("top",posY).css("left",posX);
		
		let x = posX+(rndInt(-spread,spread))+(Number(wX)/2);
		let y = posY+(rndInt(-spread,spread))+(Number(wY)/2);
		let rId = randomId('particle_');
		
		if(particleAmt<particles.length){
			particles.pop()?.remove();
			return;
		}
		$('body').append("<div id='"+rId+"' class='mouseParticle'>");
		particles.unshift($('#'+rId));

		let pv = new Vector2(
			$('#'+rId)?.width(), $('#'+rId)?.height()
		)

		let offsetX = Math.floor(x - pv.x/2);
		let offsetY = Math.floor(y - pv.y/2);
	
		let to = new Vector2(
			Math.floor(lastX), Math.floor(lastY), 
		)

		$('#'+rId).css("position", "absolute").css("top", offsetY).css("left", offsetX);
		$('#'+rId).fadeOut(500, function(){
			$('#'+rId).remove();
		});
		$('#'+rId).fadeOut({
			duration:500,
			complete:()=>{
				$('#'+rId).remove();
			}
		});
		$('#'+rId).css("top", to.y).css("left", to.x);
		lastX = x; lastY = y;
	}
	function mouseParticles_Click(event){
		let x = event.pageX-(Number(wX)/2);
		let y = event.pageY-(Number(wY)/2);
		let rId = randomId('click_');

		$('body').append("<div id='"+rId+"' class='mouseClickCircle'>");
		particles.unshift($('#'+rId));
		let pv = new Vector2(
			$('#'+rId)?.width(), $('#'+rId)?.height()
		);

		let offsetX = Math.floor(x - pv.x/2);
		let offsetY = Math.floor(y - pv.y/2);

		$('#'+rId).css("position", "absolute").css("top", offsetY).css("left", offsetX);
		let initScale
		$('#'+rId).fadeOut({
			duration: 500,
			easing: 'swing',
			progress: (anim,pprogress)=>{
				var sscale = 20*pprogress;
				$('#'+rId).css("transform", "scale("+sscale+")");
			},
			fail: ()=>{
				$('#'+rId).remove();
			},
			complete: ()=>{
				$('#'+rId).remove();
			}
		});
	}

	
})();

