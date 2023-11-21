/*mainscript.js*/

let myMods = [];
import * as mod_conductor from './conductor.js'; myMods.push(mod_conductor);
import * as mod_helper from './myHelperFunctions.js'; myMods.push(mod_helper);

for(let mod of myMods){
	Object.entries(mod).forEach(([name, exported]) => window[name] = exported);
}

export function loadUserPreferences(){
	if((!localStorage.getItem('JBQ_color'))&&(!localStorage.getItem('JBQ_shape'))){
		console.log('DEFAULTING')
		localStorage.setItem('JBQ_color','A');
		localStorage.setItem('JBQ_shape','A');
	}
	/*console.log(`color: ${localStorage.getItem('JBQ_color')}`);
	console.log(`color: ${localStorage.getItem('JBQ_shape')}`);*/
	var cI = `var(--c${localStorage.getItem('JBQ_color')})`;
	var pI = `var(--p${localStorage.getItem('JBQ_color')})`;
	var sI = `var(--s${localStorage.getItem('JBQ_shape')})`;
	var ssI = `var(--ss${localStorage.getItem('JBQ_shape')})`;
	$("body").get(0).style.setProperty("--cI", cI);
	$("body").get(0).style.setProperty("--pI", pI);
	$("body").get(0).style.setProperty("--sI", sI);
	$("body").get(0).style.setProperty("--ssI", ssI);
	return;
}

export function createMenuTracker(_opts){
	let opts = {
		container: _opts.container||null,
		onStart: _opts.onStart?_opts.onStart:()=>{},
		transitionIn: _opts.transitionIn?_opts.transitionIn:async()=>{},
		transitionOut: _opts.transitionOut?_opts.transitionOut:async()=>{},
		onEmpty: _opts.onEmpty?_opts.onEmpty:()=>{},
		onChange:_opts.onChange?_opts.onChange:()=>{},
		start:_opts.start?_opts.start:()=>{},
	};

	var id = randomID('MenuTracker:','',4);

	var container = null, _current = null, _start = null;

	if(opts.container instanceof jQuery){
		container = opts.container;
	}else if(opts.container instanceof HTMLElement || typeof opts.container === 'string'){
		container = $(opts.container);
	}else{
		return null;
	}
	container.attr('data-menuTracker-container',`${id}`);

	async function push(element){
		let initElem; var elem;
		if(element instanceof jQuery || element instanceof HTMLElement || typeof element === 'string'){
			console.log('PUSHING TO NEW');
			if(element instanceof jQuery){
				initElem = element;
			}else{
				initElem = $(element);
			}
			elem = {
				id: randomString(8),
				index: (_start!=null)? _current.index+1 : 0,
				content: initElem,
				prev: _current||null,
				next: null,
				data: {},
				onChange: ()=>{},
			}
		}else if(element instanceof Object && element.element){
			if(element.element instanceof jQuery){
				initElem = element.element;
			}else{
				initElem = $(element.element);
			}
			elem = {
				id: randomString(8),
				index: (_start!=null)? _current.index+1 : 0,
				content: initElem,
				prev: _current||null,
				next: null,
				data: (element.data)?element.data:{},
				onChange: (element.onChange)?element.onChange:(data)=>{},
			}
		}else{
			return null;
		}
		if(elem.index==0){
			console.log('Start unnulled');
			_start = elem;
		}
		if(_current){
			_current.next = elem;
		}else{
			console.log('Current unnulled');
			_current = elem;
		}
		return _changeMenu(elem,(data)=>{
			console.log('PUSHed');
		});
		

	}
	async function goTo(_index){
		console.log('GOING TO '+_index);
		if(!_current || !_start) return;
		let chose = null, ptr = _start;
		/*if(!ptr) console.log('_non');
		else{
			console.log(ptr);
		}*/
		while(ptr){
			if(ptr.index===_index){
				chose = ptr;
				break;
			}
			ptr = ptr.next;
		}
		if(!chose){
			console.log('non');
			return;
		}
		return _changeMenu(chose,(data)=>{
			opts.onChange(data);
		});
		
	}
	async function goToStart(){
		console.log('GOING TO START');
		if(!_current || !_start) return;
		return _changeMenu(_start,(data)=>{
			opts.onStart(data);
		});
	}
	async function goBack(){
		console.log('GOING BACK');
		if(!_current) return;
		return _changeMenu(_current.prev,(data)=>{
			opts.onChange(data);
		});
		
	}
	async function goNext(){
		console.log('GOING NEXT');
		if(!_current) return;
		return _changeMenu(_current.next,(data)=>{
			opts.onChange(data);
		});
		
	}

	if(opts.start instanceof jQuery || opts.start instanceof HTMLElement || typeof opts.start === 'string'){
		push(opts.start);
	}

	function currentIndex(){
		return _current?.index;
	}
	function currentContent(){
		return _current?.content;
	}
	function start(){
		return _start;
	}
	function current(){
		return _current;
	}

	async function _changeMenu(elem,callback){
		if(!elem || !elem.content){
			console.log('Yn');
			return;
		}
		return opts.transitionIn().then(()=>{
			_current.content = _current.content.detach();
			_current = elem;
			container.append(_current.content);
			return opts.transitionOut().then(()=>{
				_current.onChange(_current.data);
				callback(_current.data);
				// console.log('LIGMA');
				return Promise.resolve();
			});
		});
	}

	var menuTracker = {
		id: id,
		current: current,
		_current:_current,
		_start:_start,
		container:container,
		start: start,
		push: push,
		pop: goBack,
		goBack: goBack,
		goNext: goNext,
		goTo: goTo,
		currentIndex: currentIndex,
		currentContent: currentContent,
		goToStart: goToStart,
	}
	return menuTracker;
}

export function setSlidableContent(_options,_cont){
	var options = {
		group: (_options.group?_options.group:_options),
		container: (_options.container?_options.container:_cont),
		leftButton: (_options.leftButton?_options.leftButton:'.moveBtnLeft'),
		rightButton: (_options.rightButton?_options.rightButton:'.moveBtnRight'),
		displayOther: (_options.displayOther?_options.displayOther:false),
		forceCenter: (_options.forceCenter?_options.forceCenter:false),
		positioning: (_options.positioning)?_options.positioning:'absolute',
		//indexButtons: [
		//	{button:'',index:''}
		//]
		indexButtons: (_options.indexButtons?_options.indexButtons:[]),
	};
	var _groupElems = []; var _container = null; var mainContentAmt = 0;
	var currentContentIndex = 0;
	var leftButton = null, rightButton = null, indexButtons = [];
	if(typeof options.group==='string' || options.group instanceof jQuery){
		_groupElems = $(options.group).toArray();
	}else if(options.group instanceof HTMLCollection || options.group instanceof Array){
		_groupElems = Array.from(options.group);
	}else if(options.group instanceof HTMLElement){
		_groupElems = [options.group];
	}else{
		console.log('Group Elements were not valid');
		console.log(options.group);
		return;
	}

	if(!options.container || options.container===''){
		_container = $(_groupElems[0]).parent();
	}else if(typeof options.container==='string'||options.container instanceof jQuery){
		_container = $(options.container);
		if(_container.length<1){
			var initCont = $('<div>',{class:`slider${randomString(3)}`}).appendTo(
				$(_groupElems[0]).parent()
			);
			_container = $(initCont);
		}
	}else if(options.container instanceof HTMLElement){
		_container = options.container;
	}else{
		console.log('Container Element was not valid');
		return;
	}

	if(!options.leftButton || options.leftButton===''){
		return
	}else if(typeof options.leftButton==='string'||options.leftButton instanceof jQuery){
		leftButton = $(options.leftButton);
	}else if(options.leftButton instanceof HTMLElement){
		leftButton = options.leftButton;
	}else{
		console.log('L Button was not valid');
		return;
	}

	if(!options.rightButton || options.rightButton===''){
		return
	}else if(typeof options.rightButton==='string'||options.rightButton instanceof jQuery){
		rightButton = $(options.rightButton);
	}else if(options.rightButton instanceof HTMLElement){
		rightButton = options.rightButton;
	}else{
		console.log('R Button was not valid');
		return;
	}

	for(var indButton of options.indexButtons){
		if(!indButton || indButton==='' || !indButton.button || !indButton.index || isNaN(indButton.index)){
			continue;
		}else if(typeof indButton.button==='string'||indButton.button instanceof jQuery){
			indexButtons.push({button:$(indButton.button),index:Number(indButton.index)});
		}else if(indButton.button instanceof HTMLElement){
			indexButtons.push({button:indButton.button,index:indButton.index});
		}else{
			continue;
		}
	}

	/*if($(_container).css('position')!='absolute'){
		$(_container).css('position','relative');
	}*/

	for(var _groupElem of _groupElems){
		$(_groupElem).css({
			'position':`${options.positioning}`,
			'transition-timing-function':'ease-out-in',
			'transition':'all 0.5s',
			'transform-origin':'center',
			'z-index':'1500',
		}).appendTo($(_container));
	}
	// console.log($(_container));

	setContentPositions();

	$(leftButton).on('click',(event)=>{
		moveContentBy(-1);
	});
	$(rightButton).on('click',(event)=>{
		moveContentBy(1);
	});
	for(var i=0;i<indexButtons.length;i++){
		var indBtn = indexButtons[i];
		$(indBtn.button).on('click',(event)=>{
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();
			setContentIndex(indBtn.index);
		}).css('display','flex');
	}

	function moveContentBy(count){
		setContentIndex(currentContentIndex+count);
	}

	function setContentIndex(index){
		currentContentIndex = index;
		if(currentContentIndex>= mainContentAmt-1) currentContentIndex = mainContentAmt-1;
		if(currentContentIndex<= 0) currentContentIndex = 0;
		setContentPositions();
	}

	function currentContent(){
		return _groupElems[currentContentIndex];
	}
	function getContentAtIndex(index){
		return _groupElems[index];
	}
	function getCurrentContentIndex(){
		return currentContentIndex;
	}

	function setContentPositions(){
		var properIndex=0;
		for(var index=0;index<_groupElems.length;index++){
			var _groupElem = _groupElems[index];
			if(!_groupElem){
				_groupElems.splice(index,1);
				console.log(`removed ${index}`)
				continue;
			}
			var _diff= properIndex-currentContentIndex;
			if(!$(_groupElem).attr('data-sliderID')){
				$(_groupElem).attr('data-sliderID',randomID('SliderContent','',4))
			}
			$(_groupElem).css({
				'left':`${(_diff)*100}%`,
				'transform':`scale(${1/(Math.abs(_diff)+1)}) ${(options.forceCenter)?`translateX(50%)`:``}`,
				'z-index': `${1500+_diff}`,
				'opacity':`${1/(Math.abs(_diff)+1)}`,
			});
			if(!_options.displayOther){
				$(_groupElem).css('visibility','hidden');
			}
			properIndex++;
		}
		$(currentContent()).css('visibility','visible');
		mainContentAmt = _groupElems.length;
	}
	function addContent(obj,position=(_groupElems.length-1)){
		$(obj).css({
			'position':`${options.positioning}`,
			'transition-timing-function':'ease-out-in',
			'transition':'all 0.5s',
			'transform-origin':'center',
			'z-index':'1500',
		}).appendTo($(_container));
		_groupElems.splice(position,0,$(obj));
		setContentPositions();
	}
	function removeContent(obj){
		if(typeof obj === 'number'){
			let _obj = _groupElems[obj];
			_groupElems[obj] = null;
			$(_obj).remove();
		}else{
			$(obj).remove();
		}
		setContentPositions();
	}
	function addIndexButton(index,button){
		var indBtn = {
			index:index, button: $(button)
		};
		$(indBtn.button).on('click',(event)=>{
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();
			setContentIndex(indBtn.index);
		}).css('display','flex');
	}
	var returnObject = {
		group: _groupElems,
		container: $(_container)[0],
		leftButton: $(leftButton)[0],
		rightButton: $(rightButton)[0],
		indexButtons: indexButtons,
		setContentPositions: setContentPositions,
		setContentIndex: setContentIndex,
		moveContentBy: moveContentBy,
		currentContent: currentContent,
		getContentAtIndex: getContentAtIndex,
		content: getContentAtIndex,
		getCurrentContentIndex: getCurrentContentIndex, 
		currentContentIndex: getCurrentContentIndex, 
		addContent: addContent,
		removeContent: removeContent,
		addIndexButton: addIndexButton,
	};
	
	// console.log('Return Object:');
	// console.log(returnObject);
	return returnObject;
}

export function displayPopUpBox(_text,_options){
	var popUpBox = $('<div>',{class:'popUpBox card cI-bg pt-5 px-5 pb-3 font-120'}).append([
		$('<div>',{class:'btn formBtn popUpBtnClose p-2 m-0 text-right cI-txt'}).html(`<i class="fas fa-window-close"></i>`),
		$('<div>',{class:'card-title'}),
		$('<div>',{class:'row card-body text-right'})
	]);
	var popUpElem = $('<div>',{class:'popUpArea container-fluid',id:randomID('popUp','',4)}).append([
		$('<div>',{class:'popUpOverlay opacity-60 h-100 w-100 c0-bg'}),popUpBox
	]);
	if(!_options){
		_options = _text;
	}
	var options = {
		messageText: (typeof _text==='string')?_text:(_options.messageText?_options.messageText:''),
		acceptText: _options.acceptText?_options.acceptText:null,
		cancelText: _options.cancelText?_options.cancelText:'Close',
		onAccept: _options.onAccept?_options.onAccept:null,
		onCancel:  _options.onCancel?_options.onCancel:()=>{
			console.log('Canceled');
		},
	};
	$(popUpBox).find('.card-title').text(options.messageText);

	$(popUpBox).find('.popUpBtnClose').on('click',function(event){
		console.log('Closed');
		closePopUpBox(popUpElem);
	});
	var popUpBoxBody = $(popUpBox).find('.card-body');
	if(options.acceptText&&options.onAccept){
		$('<button>',{class:'col btn formBtn font-100 mx-3 popUpBtnYes cI-txt'})
		.on('click',function(event){
			options.onAccept();
			closePopUpBox(popUpElem);
		}).text(options.acceptText).appendTo(popUpBoxBody);
	}

	$('<button>',{class:'col btn formBtn font-100 mx-3 popUpBtnNo cI-txt'})
	.on('click',function(event){
		options.onCancel();
		closePopUpBox(popUpElem);
	}).text(options.cancelText).appendTo(popUpBoxBody);

	$(popUpElem).css('display','flex').appendTo('body');
	anime({
		targets: $(popUpBox)[0],
		opacity: ['0','1'],
		top: ['-100px','0px'],
		duration: 400,
		easing: "easeOutQuad",
		direction: 'normal',
	});
}
export function closePopUpBox(popUpElem){
	anime({
		targets: $(popUpElem).find('.popUpBox')[0],
		opacity: ['0','1'],
		top: ['-100px','0px'],
		duration: 200,
		easing: "easeOutQuad",
		direction: 'reverse',
		complete: ()=>{
			$(popUpElem).css('display','none');
			$(popUpElem).remove();
		}
	});
}
export function easyPopUpBox(_text){
	displayPopUpBox({
		messageText:String(_text),
		cancelText:'Okay',
	});
}

export function deletePopUp(_text,_options){
	var popUpBox = $('<div>',{class:'popUpBox card cI-bg pt-5 px-5 pb-3 font-120'}).append([
		$('<div>',{class:'btn formBtn popUpBtnClose p-2 m-0 text-right cI-txt'}).html(`<i class="fas fa-window-close"></i>`),
		$('<div>',{class:'card-title'}),
		$('<div>',{class:'row card-body card-bodyA text-right centerFlexCont'}).append([
			$('<input>',{class:'col inputBox'}).attr({'placeholder':`Type prompt here`}),
		]),
		$('<div>',{class:'row card-body card-bodyB text-right'}),
	]);
	var popUpElem = $('<div>',{class:'popUpArea container-fluid',id:randomID('popUp','',4)}).append([
		$('<div>',{class:'popUpOverlay opacity-60 h-100 w-100 c0-bg'}),popUpBox
	]);
	if(!_options){
		_options = _text;
	}
	var options = {
		messageText: (typeof _text==='string')?_text:(_options.messageText?_options.messageText:''),
		acceptText: _options.acceptText?_options.acceptText:null,
		// cancelText: _options.cancelText?_options.cancelText:'Close',
		onAccept: _options.onAccept?_options.onAccept:null,
		onCancel:  _options.onCancel?_options.onCancel:()=>{
			console.log('Canceled');
		},
	};
	$(popUpBox).find('.card-title').text(options.messageText);

	$(popUpBox).find('.popUpBtnClose').on('click',(event)=>{
		console.log('Closed');
		options.onCancel();
		closePopUpBox(popUpElem);
	});
	var popUpBoxBody = $(popUpBox).find('.card-bodyB');
	if(options.acceptText&&options.onAccept){
		$('<button>',{class:'col btn formBtn font-100 mx-3 popUpBtnYes cI-txt'})
		.on('click',(event)=>{
			let val = $(popUpBox).find('.inputBox').val();
			options.onAccept(val);
			closePopUpBox(popUpElem);
		}).text(options.acceptText).appendTo(popUpBoxBody);
	}

	$(popUpElem).css('display','flex').appendTo('body');
	anime({
		targets: $(popUpBox)[0],
		opacity: ['0','1'],
		top: ['-100px','0px'],
		duration: 400,
		easing: "easeOutQuad",
		direction: 'normal',
	});
}

export function transitionTo(fadingElem,onFadeIn=()=>{},onFadeOut=()=>{}){
	anime({
		targets: $(fadingElem)[0],
		opacity: ['1','0'],
		duration: 350,
		easing: 'easeInCubic',
		complete:(anim)=>{
			onFadeIn();
			anime({
				targets: $(fadingElem)[0],
				opacity: ['0','1'],
				duration: 350,
				easing: 'easeInCubic',
				complete:(anim)=>{
					onFadeOut();
				}
			});
		}
	});
}

export async function myAPI(_type,_subtype='',_data={},_url='/api'){
	var username = localStorage.getItem('JBQ_username');
	var userID = localStorage.getItem('JBQ_userId');
	var apikey = localStorage.getItem('JBQ_apikey');

	if(!username || !apikey || !userID){
		window.location.href = "/";
		console.log('No API/Userdata in system');
		return;
	}
	switch(_type){
		case 'signup':
			break;
		case 'login':
		case 'logout':
			break;
		case 'playlist':
			break;
		case 'user':
		case 'quiz':
		case 'song':
		case 'list':
			if(!_subtype){
				return Promise.reject(_response(false,'Subtype is missing from request'));
			}
		case 'verify':
		case 'search':
		case 'connect':
		case 'activity':
			if(!username || !apikey || !userID){
				// window.location.href = "./index.php";
				console.log('No API/Userdata in system');
				return Promise.reject(_response(false,'Login is not verified'));
			}
			break;
		default:
			return Promise.reject(_response(false,'Invalid API request'));
			break;
	}

	var formDat = {
		key: apikey,
		type: _type,
		subType: _subtype,
		id: userID,
		data: _data
	};

	/*let ajaxCall = $.ajax({
		url: './php/api.php',
		type: 'POST',
		data: formDat,
	}).done(function(res,status){
		
	}).fail(function(xhr,status){
		
	});*/

	// let ajaxCall = fetch(_url,{
	// 	method:'POST', headers: { 'Content-Type': 'application/json' },
	// 	body: JSON.stringify(formDat)
	// }).then((res)=>{

	// })

	let ajaxCall = fetch(_url,{
		method:'POST', headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(formDat),
	}).then(async(res)=>{
		let resData = await res.text();
		if(isJSON(resData)){
			return JSON.parse(resData);
		}
		return resData;
	}).then(async(res)=>{
		console.log('success');
		return Promise.resolve(res);
	},(res)=>{
		console.log('unsuccess');
		return Promise.resolve(res);
	}).catch((err)=>{
		console.log('error');
		return Promise.reject(_response(false,'An error occured in the request'));
	});

	// let ajaxCall = myAjax(_url,'POST',formDat).then((res)=>{
	// 	console.log("success");
	// 	return Promise.resolve(res);
	// },(res)=>{
	// 	console.log("unsuccess");
	// 	return Promise.resolve(res);
	// }).catch((err)=>{
	// 	console.log("error");
	// 	return Promise.reject(_response(false,'An error occured in the request'));
	// });
	
	
	return await ajaxCall;

	
}
export async function myHandler(opts,onSuccess=()=>{},onFail=()=>{},onErr=()=>{}){
	var options = {
		type: opts.type?opts.type:'',
		subType: opts.subType?opts.subType:'',
		data: opts.data?opts.data:{},
		url: opts.url?opts.url:'/api',
	}

	// return fetch(options.url,{
	// 	method:'POST', body: JSON.stringify(options),headers: { 'Content-Type': 'application/json' } 
	// }).then((res)=>{
	// 	return res.text();
	// }).then((res)=>{
	// 	if(!isJSON(res)){
	// 		onErr('Data is not a response object');
	// 		return Promise.resolve(_response(false,'Data is not a response object'));
	// 	}

	// 	let data = JSON.parse(res);
	// 	if(data && 'success' in data){
	// 		if(data.success){
	// 			onSuccess(data.message,data.data);
	// 			return Promise.resolve(_response(true,data.message,data.data));
	// 		}else{
	// 			onFail(data.message,data.data);
	// 			return Promise.resolve(_response(true,data.message,data.data));
	// 		}
	// 	}else{
	// 		onErr('Invalid Data from server',data);
	// 		return Promise.resolve(_response(false,'Invalid Data from server',data));
	// 	}

	// },(res)=>{
	// 	onErr('Error in server request',res);
	// 	return Promise.resolve(_response(false,'Error in server request',res));
	// }).catch((err)=>{
	// 	onErr('Error in request handler',err);
	// 	return Promise.resolve(_response(false,'Error in request handler',err));
	// });

	return myAPI(options.type,options.subType,options.data,options.url).then((data)=>{
		if(!isObject(data)){
			onErr('Data is not a response object');
			return Promise.resolve(_response(false,'Data is not a response object'));
		}else{
			// console.log(data);
			if(data && 'success' in data){
				if(data.success){
					onSuccess(data.message,data.data);
					return Promise.resolve(_response(true,data.message,data.data));
				}else{
					onFail(data.message,data.data);
					return Promise.resolve(_response(true,data.message,data.data));
				}
			}else{
				onErr('Invalid Data from server',data);
				return Promise.resolve(_response(false,'Invalid Data from server',data));
			}
		}
	}, (res)=>{
		onErr('Error in server request',res);
		return Promise.resolve(_response(false,'Error in server request',res));
	}).catch((err)=>{
		onErr('Error in request handler',err);
		return Promise.resolve(_response(false,'Error in request handler',err));
	});	
}

export async function saveActivity(_opts,onSuccess=()=>{},onFail=()=>{},onErr=()=>{}){
	let opts = {
		id: randomString(8),
		userID: _opts.userID,
		type: _opts.type,
		info: _opts.info,
		details:{
			quizID:_opts.details.quizID||null,
			friendID:_opts.details.friendID||null,
			listID:_opts.details.listID||null,
			songID:_opts.details.songID||null,
			score:_opts.details.score||null,
		}
	};

	switch(opts.type){
		case 'Created Quiz': case 'Played Quiz': case 'Completed Quiz': case 'Edited Quiz': case 'Deleted Quiz':
			if(!_opts.details.quizID){
				onFail('Invalid API Request');
				return Promise.resolve(_response(false,'Invalid API Request'));
			}
			break;
		case 'Created Playlist': case 'Edited Playlist': case 'Deleted Playlist': case 'Played Playlist':
			if(!_opts.details.listID){
				onFail('Invalid API Request');
				return Promise.resolve(_response(false,'Invalid API Request'));
			}
			break;
		case 'Added Song': case 'Edited Song': case 'Deleted Song':
			if(!_opts.details.songID){
				onFail('Invalid API Request');
				return Promise.resolve(_response(false,'Invalid API Request'));
			}
			break;
		case 'Added Friend': case 'Friend Request':
			if(!_opts.details.friendID){
				onFail('Invalid API Request');
				return Promise.resolve(_response(false,'Invalid API Request'));
			}
			break;
		case 'Created User':
			if(!_opts.details.friendID){
				onFail('Invalid API Request');
				return Promise.resolve(_response(false,'Invalid API Request'));
			}
			break;
		case 'Followed':
			if(!_opts.details.friendID){
				onFail('Invalid API Request');
				return Promise.resolve(_response(false,'Invalid API Request'));
			}
			break;
		case 'Maxed Score':
			if(!_opts.details.score || !_opts.details.quizID){
				onFail('Invalid API Request');
				return Promise.resolve(_response(false,'Invalid API Request'));
			}
			break;
		default:
			onFail('Invalid API Request');
			return Promise.resolve(_response(false,'Invalid API Request'));
			break;
	}

	// console.log("ACTIVITY:")
	// console.log(opts);

	return myHandler({
		type: 'activity', subType:'set', data:opts,
	},onSuccess,onFail,onErr).then((res)=>{
		return Promise.resolve(res);
	});
}
export async function getActivity(opts,onSuccess,onFail,onErr){
	return myHandler({
		type: 'activity', subType:'get', data:opts,
	},onSuccess,onFail,onErr).then((res)=>{
		return Promise.resolve(res);
	});
}
export async function getFile(id){
	return fetch(`/file/${id}`).then(async(res)=>{
		let resData = await res.blob();

		return resData;
	}).catch((err)=>{
		console.log(err);
		return null;
	});
}
export function _response(success=false,message='',data=null){
	return {
		success: success?true:false,
		message: String(message),
		data: data,
	};
}