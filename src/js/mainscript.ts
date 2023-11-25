/*mainscript.js*/

import $ from 'jquery';
import anime from 'animejs';
import { Conductor } from '@catsums/conductorjs';
import {
	randomID, rndInt, isArray, isJSON, isObject, isString, randomString
} from '@catsums/my'; 

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

declare global {
	interface IResponse {
		success : boolean;
		message : string;
		data : any;
	}
	interface IUserDataPrefs {
		color : string;
		shape : string;
	}

	interface IPermissionData {
		create?: boolean;
		edit?: boolean;
		delete?: boolean;
	}
	interface IUserDataPerms {
		song?: IPermissionData;
		user?: IPermissionData;
		quiz?: IPermissionData;
	}

	interface IUserData {
		id : string;
		username : string;
		email : string;
		DOB : string | number | Date;
		firstname? : string;
		lastname? : string;
		description? : string;
		imageURL : string;
		preferences : IUserDataPrefs;
		friendlist? : string[];
		following? : string[];
		followers? : string[];
		score? : number;
		role? : string;
		permissions? : IUserDataPerms;
		apikey? : string;
	}

	interface IQuizAnswerData {
		answer : string;
		correct : boolean;
	}

	interface IQuizQuestionData {
		question : string;
		imageURL : string;
		type? : string;
		answers : IQuizAnswerData[];
	}

	interface IQuizData {
		id? : string;
		username? : string;
		userID : string;
		name : string;
		description : string;
		songID : string;
		imageURL : string;
		passingGrade : number;
		hashtags : string[];
		questions : IQuizQuestionData[];
	}

	interface IPlaylistData {
		id? : string;
		username? : string;
		userID : string;
		name : string;
		description : string;
		imageURL : string;
		quizzes : string[];
	}

	interface ISongData {
		id : string;
		bpm : number;
		measure : number;
		author : string;
		title : string;
		songURL : string;
	}

	interface IActivityDataDetail {
		quizID? : string; 
		friendID? : string;
		listID? : string; 
		songID? : string;
		score? : number;
	}

	interface IActivityData{
		id? : string; 
		userID : string;
		type : string; 
		info : string;
		details : IActivityDataDetail;
	}

	interface IMenuTrackerState {
		id? : string;
		index : number;
		content : JQuery | null;
		element? : JQuery | Element | null;
		prev : IMenuTrackerState | null;
		next : IMenuTrackerState | null;
		data : IObject;
		onChange : (d:IObject) => void;
	}
	
	interface IMenuTracker {
		id: string;
		current: () => IMenuTrackerState;
		container: JQuery;
		start: () => IMenuTrackerState;
		push: (d:Element|JQuery|string|{
			index?: number, data?: IObject, onChange?:(d:any) => void,
			element : JQuery | Element,
		}) => Promise<any|null>;
		pop: () => Promise<any|null>;
		goBack: () => Promise<any>;
		goNext: () => Promise<any>;
		goTo: (d:number) => Promise<any|null>;
		currentIndex: () => number;
		currentContent: () => (JQuery | null);
		goToStart: () => Promise<any>;
	}

	interface ISlidableContent{
		group: (Element|null)[];
		container: Element;
		leftButton: Element;
		rightButton: Element;
		indexButtons: ISlidableContentIndexButton[];
		setContentPositions: () => void;
		setContentIndex: (i:number) => void;
		moveContentBy: (i:number) => void;
		currentContent: () => (Element | null);
		getContentAtIndex: (i:number) => (Element | null);
		content: (i:number) => (Element | null);
		getCurrentContentIndex: () => number;
		currentContentIndex: () => number;
		addContent: (obj:Element|JQuery,position:number) => void;
		removeContent: (obj:number|Element|JQuery|string) => void;
		addIndexButton: (index:number, btn:Element|JQuery|string) => void;
	}

	interface ISlidableContentIndexButton{
		button: Element | JQuery | string;
		index: number;
	}

}

export function logg(txt){
	var k = "";
	if(document.querySelectorAll('.logg')){
		k = '.logg';
	}else if(document.querySelectorAll('.mess')){
		k = '.mess';
	}

	if(k!=""){
		var loggElems = document.querySelectorAll(k);
		for(var i=0;i<loggElems.length;i++){
			var loggElem = loggElems[i];
			loggElem.innerHTML = txt;
		}
	}else{
		console.log(txt);
	}
	
}

export function createMenuTracker({
	container = null, start = null, 
	onStart = () => {}, onEmpty = () => {}, onChange = () => {},
	transitionIn = async() => {},
	transitionOut = async() => {},
}:{
	container : Element | JQuery | string | null
	start?:  Element | JQuery | string | null,
	onStart?: (d?:any) => void,
	onEmpty?: (d?:any) => void,
	onChange?: (d?:any) => void,
	transitionIn?: (d?:any) => Promise<any>,
	transitionOut?: (d?:any) => Promise<any>,
}){

	var id = randomID('MenuTracker:','',4);

	let cont : JQuery, 
	_current : IMenuTrackerState, 
	_start : IMenuTrackerState;

	if(container instanceof $){
		cont = container as JQuery;
	}else if(container instanceof HTMLElement){
		cont = $(container);
	}else if(typeof container === 'string'){
		cont = $(container);
	}else{
		return null;
	}
	cont.attr('data-menuTracker-container',`${id}`);

	async function push(element : Element | JQuery | string | {
		index?: number, data?: IObject, onChange?:(d:any) => void,
		element? : JQuery | Element | string,
	}){
		let initElem; 
		let st : IMenuTrackerState;
		if(element instanceof $ || element instanceof HTMLElement || typeof element === 'string'){
			console.log('PUSHING TO NEW');
			
			if(typeof element === 'string'){
				initElem = $(element);
			}else{
				initElem = $(element);
			}
			
			st = {
				id: randomString(8),
				index: (_start!=null) ? _current?.index + 1 : 0,
				content: initElem,
				prev: _current||null,
				next: null,
				data: {},
				onChange: ()=>{},
			}
		}else if(element instanceof Object && ('element' in element)){
			let elem : JQuery | Element | string | null = (element as IObject).element ;
			if(elem instanceof $){
				initElem = elem;
			}else if(elem instanceof Element || typeof elem === 'string'){
				initElem = $(elem as any);
			}

			let data = element.data;
			let onChange = element.onChange;

			st = {
				id: randomString(8),
				index: (_start!=null) ? _current?.index + 1 : 0,
				content: initElem,
				prev: _current||null,
				next: null,
				data: data || {},
				onChange: onChange || ((data)=>{}),
			}
		}else{
			return null;
		}

		if(st.index==0){
			console.log('Start unnulled');
			_start = st;
		}
		if(_current){
			_current.next = st;
		}else{
			console.log('Current unnulled');
			_current = st;
		}
		return _changeMenu(st, (data)=>{
			console.log('PUSHed');
		});
		

	}
	async function goTo(_index : number){
		console.log('GOING TO '+_index);
		if(!_current || !_start) return;
		let chose : IMenuTrackerState | null = null;
		let ptr : IMenuTrackerState | null = _start;
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
			onChange(data);
		});
		
	}
	async function goToStart(){
		console.log('GOING TO START');
		if(!_current || !_start) return;
		return _changeMenu(_start,(data)=>{
			onStart(data);
		});
	}
	async function goBack(){
		console.log('GOING BACK');
		if(!_current) return;
		return _changeMenu(_current.prev,(data)=>{
			onChange(data);
		});
		
	}
	async function goNext(){
		console.log('GOING NEXT');
		if(!_current) return;
		return _changeMenu(_current.next,(data)=>{
			onChange(data);
		});
		
	}

	if(start instanceof $ || start instanceof HTMLElement || typeof start === 'string'){
		push(start);
	}

	function currentIndex(){
		return _current?.index;
	}
	function currentContent(){
		return _current?.content;
	}
	function Start(){
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
		return transitionIn().then(()=>{
			_current.content = _current.content?.detach() || null;
			_current = elem;
			cont.append(_current.content as JQuery);
			return transitionOut().then(()=>{
				_current.onChange(_current.data);
				callback(_current.data);
				// console.log('LIGMA');
				return Promise.resolve();
			});
		});
	}

	var menuTracker : IMenuTracker = {
		id: id,
		current: current,
		container: cont,
		start: Start,
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

export function setSlidableContent({
	group = [],
	container = null,
	leftButton = '.moveBtnLeft',
	rightButton = '.moveBtnRight',
	indexButtons = [],

	displayOther = false,
	forceCenter = false,
	positioning = 'absolute'
}:{
	group : string | JQuery | HTMLCollection | Element | (JQuery | Element)[];
	container : string | JQuery | Element | null;
	leftButton? : string | JQuery | Element;
	rightButton? : string | JQuery | Element;
	indexButtons? : (ISlidableContentIndexButton)[];

	displayOther? : boolean;
	forceCenter? : boolean;
	positioning? : string;
}, _cont : string | JQuery | Element | null = null ){
	if(!container){
		container = _cont;
	}
	
	var _groupElems : (Element|null)[] = [];
	var _container : JQuery<Element>;
	var mainContentAmt = 0;
	var currentContentIndex = 0;

	if(group instanceof $ || group instanceof Element){
		_groupElems = $(group as (JQuery | Element)).toArray();
	}else if(typeof group==='string'){ //typescript whyyyy
		_groupElems = $(group as string).toArray();
	}else if(group instanceof HTMLCollection || group instanceof Array){
		_groupElems = Array.from(group as (HTMLAllCollection | Array<Element>));
	}else{
		console.log('Group Elements were not valid');
		console.log(group);
		return null;
	}

	if(!container || container===''){
		_container = $(_groupElems[0]).parent();
	}else if(typeof container==='string'||container instanceof $ || container instanceof Element){
		
		if(typeof container==="string"){
			_container = $(container);
		}else{
			_container = $(container);
		}

		if(_container.length<1){
			let initCont = $('<div>',{class:`slider${randomString(3)}`}).appendTo(
				$(_groupElems[0]).parent() as JQuery<HTMLElement>
			);
			_container = $(initCont);
		}
	}else{
		console.log('Container Element was not valid');
		return null;
	}

	if(!leftButton || leftButton===''){
		return null;
	}else if(isString(leftButton) || leftButton instanceof $){
		leftButton = $(leftButton as HTMLElement);
	}else if(leftButton instanceof HTMLElement){
		leftButton = leftButton;
	}else{
		console.log('L Button was not valid');
		return null;
	}

	if(!rightButton || rightButton===''){
		return null;
	}else if(typeof rightButton==='string' || rightButton instanceof $){
		rightButton = $(rightButton as HTMLElement);
	}else if(rightButton instanceof HTMLElement){
		rightButton = rightButton;
	}else{
		console.log('R Button was not valid');
		return null;
	}

	for(let indButton of indexButtons){
		if(!indButton || !indButton.button || !indButton.index || isNaN(indButton.index)){
			continue;
		}else if(typeof indButton.button==='string'||indButton.button instanceof $||indButton.button instanceof Element){
			indexButtons.push({
				button:$(indButton.button as HTMLElement),
				index:Number(indButton.index)
			});
		}else{
			continue;
		}
	}

	/*if($(_container).css('position')!='absolute'){
		$(_container).css('position','relative');
	}*/

	for(let _groupElem of _groupElems){
		$(_groupElem).css({
			'position':`${positioning}`,
			'transition-timing-function':'ease-out-in',
			'transition':'all 0.5s',
			'transform-origin':'center',
			'z-index':'1500',
		}).appendTo($(_container as any));
	}
	// console.log($(_container));

	setContentPositions();

	$(leftButton).on('click',(event)=>{
		moveContentBy(-1);
	});
	$(rightButton).on('click',(event)=>{
		moveContentBy(1);
	});
	for(let i=0;i<indexButtons.length;i++){
		let indBtn = indexButtons[i];
		$(indBtn.button as HTMLElement).on('click',(event)=>{
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();

			setContentIndex(indBtn.index);
		}).css('display','flex');
	}

	function moveContentBy(count:number){
		setContentIndex(currentContentIndex + count);
	}

	function setContentIndex(index:number){
		currentContentIndex = index;
		if(currentContentIndex >= mainContentAmt-1) currentContentIndex = mainContentAmt-1;
		if(currentContentIndex <= 0) currentContentIndex = 0;
		setContentPositions();
	}

	function currentContent(){
		return _groupElems[currentContentIndex];
	}
	function getContentAtIndex(index:number){
		return _groupElems[index];
	}
	function getCurrentContentIndex(){
		return currentContentIndex;
	}

	function setContentPositions(){
		let properIndex=0;
		for(let index=0;index<_groupElems.length;index++){
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
				'transform':`scale(${1/(Math.abs(_diff)+1)}) ${(forceCenter) ? `translateX(50%)` : ``}`,
				'z-index': `${1500+_diff}`,
				'opacity':`${1/(Math.abs(_diff)+1)}`,
			});
			if(!displayOther){
				$(_groupElem).css('visibility','hidden');
			}
			properIndex ++;
		}
		$(currentContent()).css('visibility','visible');
		mainContentAmt = _groupElems.length;
	}
	function addContent(obj:Element|JQuery ,position=(_groupElems.length-1)){
		$(obj).css({
			'position':`${positioning}`,
			'transition-timing-function':'ease-out-in',
			'transition':'all 0.5s',
			'transform-origin':'center',
			'z-index':'1500',
		}).appendTo($(_container as any));

		_groupElems.splice(position, 0, $(obj)[0]);

		setContentPositions();
	}
	function removeContent(obj : number | Element | JQuery | string){
		if(typeof obj === 'number'){
			let _obj = _groupElems[obj];
			_groupElems[obj] = null;
			$(_obj).remove();
		}else{
			$(obj as Element).remove();
		}
		setContentPositions();
	}
	function addIndexButton(index : number, button : Element | JQuery | string){
		var indBtn = {
			index:index, button: $(button as Element)
		};
		$(indBtn.button).on('click',(event)=>{
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();

			setContentIndex(indBtn.index);
		}).css('display','flex');
	}
	var returnObject : ISlidableContent = {
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

export function displayPopUpBox({
	messageText = '',
	acceptText = null,
	cancelText = 'Close',
	onAccept = null,
	onCancel =  ()=>{
		console.log('Canceled');
	},
} : {
	messageText: string;
	acceptText?: string|null;
	cancelText?: string|null;

	onAccept?: ((d?:any) => void)|null;
	onCancel?: (d?:any) => void;
}){
	var popUpBox = $('<div>',{class:'popUpBox card cI-bg pt-5 px-5 pb-3 font-120'}).append([
		$('<div>',{class:'btn formBtn popUpBtnClose p-2 m-0 text-right cI-txt'}).html(`<i class="fas fa-window-close"></i>`),
		$('<div>',{class:'card-title'}),
		$('<div>',{class:'row card-body text-right'})
	]);
	var popUpElem = $('<div>',{class:'popUpArea container-fluid',id:randomID('popUp','',4)}).append([
		$('<div>',{class:'popUpOverlay opacity-60 h-100 w-100 c0-bg'}),popUpBox
	]);

	$(popUpBox).find('.card-title').text(messageText);

	$(popUpBox).find('.popUpBtnClose').on('click',function(event){
		console.log('Closed');
		closePopUpBox(popUpElem);
	});
	var popUpBoxBody = $(popUpBox).find('.card-body');
	if(acceptText && onAccept){
		$('<button>',{class:'col btn formBtn font-100 mx-3 popUpBtnYes cI-txt'})
		.on('click',function(event){
			onAccept();
			closePopUpBox(popUpElem);
		}).text(acceptText).appendTo(popUpBoxBody);
	}

	$('<button>',{class:'col btn formBtn font-100 mx-3 popUpBtnNo cI-txt'})
	.on('click',function(event){
		onCancel();
		closePopUpBox(popUpElem);
	}).text(cancelText).appendTo(popUpBoxBody);

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

export function deletePopUp({
	messageText = '',
	acceptText = null,
	cancelText = 'Close',
	onAccept = null,
	onCancel =  ()=>{
		console.log('Canceled');
	},
} : {
	messageText: string;
	acceptText?: string|null;
	cancelText?: string|null;

	onAccept?: ((d?:any) => void)|null;
	onCancel?: (d?:any) => void;
}){
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

	$(popUpBox).find('.card-title').text(messageText);

	$(popUpBox).find('.popUpBtnClose').on('click',(event)=>{
		console.log('Closed');
		onCancel();
		closePopUpBox(popUpElem);
	});
	var popUpBoxBody = $(popUpBox).find('.card-bodyB');
	if(acceptText && onAccept){
		$('<button>',{class:'col btn formBtn font-100 mx-3 popUpBtnYes cI-txt'})
		.on('click',(event)=>{
			let val = $(popUpBox).find('.inputBox').val();
			onAccept(val);
			closePopUpBox(popUpElem);
		}).text(acceptText).appendTo(popUpBoxBody);
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

export function transitionTo(fadingElem : Element | string | JQuery, onFadeIn=()=>{},onFadeOut=()=>{}){
	anime({
		targets: $(fadingElem as any)[0],
		opacity: ['1','0'],
		duration: 350,
		easing: 'easeInCubic',
		complete:(anim)=>{
			onFadeIn();
			anime({
				targets: $(fadingElem as any)[0],
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

export async function myAPI(_type : string, _subtype='', _data={}, _url='/api'){
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
export async function myHandler(
	{
		type = '', subType = '', data = {}, url = '/api'
	} : {
		type: string; subType?: string; data?:IObject; url?:string;
	}, onSuccess=(m:string, d?:JSONType)=>{}, onFail=(m:string, d?:JSONType)=>{}, onErr=(err?, d?)=>{}
){

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

	return myAPI(type, subType, data, url).then((data)=>{
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
					return Promise.resolve(_response(false,data.message,data.data));
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

export async function saveActivity({
	userID, type, info,
	details,
} : {
		id? : string; userID:string;
		type:string; info:string;
		details: {
			quizID?:string; friendID?:string;
			listID?:string; songID?:string;
			score?:string|number;
		}
	},
	onSuccess=(m:string, d?:JSONType)=>{}, onFail=(m:string, d?:JSONType)=>{}, onErr=(err?,d?)=>{}
){
	let opts = {
		id: randomString(8),
		userID: userID,
		type: type,
		info: info,
		details:{
			quizID:details.quizID||null,
			friendID:details.friendID||null,
			listID:details.listID||null,
			songID:details.songID||null,
			score:details.score||null,
		}
	};

	switch(type){
		case 'Created Quiz': case 'Played Quiz': case 'Completed Quiz': case 'Edited Quiz': case 'Deleted Quiz':
			if(!details.quizID){
				onFail('Invalid API Request');
				return Promise.resolve(_response(false,'Invalid API Request'));
			}
			break;
		case 'Created Playlist': case 'Edited Playlist': case 'Deleted Playlist': case 'Played Playlist':
			if(!details.listID){
				onFail('Invalid API Request');
				return Promise.resolve(_response(false,'Invalid API Request'));
			}
			break;
		case 'Added Song': case 'Edited Song': case 'Deleted Song':
			if(!details.songID){
				onFail('Invalid API Request');
				return Promise.resolve(_response(false,'Invalid API Request'));
			}
			break;
		case 'Added Friend': case 'Friend Request':
			if(!details.friendID){
				onFail('Invalid API Request');
				return Promise.resolve(_response(false,'Invalid API Request'));
			}
			break;
		case 'Created User':
			if(!details.friendID){
				onFail('Invalid API Request');
				return Promise.resolve(_response(false,'Invalid API Request'));
			}
			break;
		case 'Followed':
			if(!details.friendID){
				onFail('Invalid API Request');
				return Promise.resolve(_response(false,'Invalid API Request'));
			}
			break;
		case 'Maxed Score':
			if(!details.score || !details.quizID){
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
export async function getActivity(opts, onSuccess?, onFail?, onErr?){
	return myHandler({
		type: 'activity', subType:'get', data:opts,
	},onSuccess,onFail,onErr).then((res)=>{
		return Promise.resolve(res);
	});
}
export async function getFile(id:string){
	return fetch(`/file/${id}`).then(async(res)=>{
		let resData = await res.blob();

		return resData;
	}).catch((err)=>{
		console.log(err);
		return null;
	});
}
export function _response(success=false,message='',data:JSONType=null){
	return {
		success: success?true:false,
		message: String(message),
		data: data,
	};
}