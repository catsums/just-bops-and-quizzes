//Conductor.js

/*import {
		hardPush, findItem, findItemIndex, isObject, shallowEqual, deepEqual, randomID, randomString
	} from './myHelperFunctions.js';*/
import * as myHelper from './myHelperFunctions.js';
Object.entries(myHelper).forEach(([name, exported]) => window[name] = exported);

export class ProcessingTarget extends EventTarget{
	FPS = 15;
	targetName = randomID('[ProcessingTarget:',']');
	connectId = randomID('ConnectID:');
	_processTimer; _physicsProcessTimer;
	_connectedObjects = [];
	_signals = {};
	_lastSysTime; _currSysTime; _deltaSysTime;
	_logs = false;

	constructor(){
		super();

		this._processTimer = setIntervalAsync(async(delta)=>{
			this._process(delta/1000);
			return Promise.resolve({
				update: true,
			});
		}, (1000/this.FPS));

		this._physicsProcessTimer = setIntervalAsync(async(delta)=>{
			this._physicsProcess(1/this.FPS);
			return Promise.resolve({
				update: false,
			});
		}, (1000/this.FPS));

		/*this._lastSysTime = window.performance.now();
		this._processTimer = setInterval(()=>{
			this._currSysTime = window.performance.now();
			this._deltaSysTime = (((this._currSysTime-this._lastSysTime)/1000)+(1/this.FPS))/2;
			this._process(this._deltaSysTime);
			this._lastSysTime = this._currSysTime;
		}, (1000*this._deltaSysTime));
		this._physicsProcessTimer = setInterval(()=>{
			this._physicsProcess(1/this.FPS);
		}, (1000/this.FPS));*/

		this._ready();
	}

	_notification(what){

	}

	_ready(){

	}

	_process(delta){

	}

	_physicsProcess(delta){

	}

	createSignal = (name, ...vars)=>{
		var varsObj = {};
		for(var vvar of vars)
			varsObj[vvar] = null;
		var event = new CustomEvent(name,{
			detail:varsObj
		});
		event.data = varsObj;
		this._signals[name]=event;
		if(this._logs) console.log('Signal '+name+' in '+this.targetName+' created');
	}

	removeSignal = (name)=>{
		if(this._signals.hasOwnProperty(name)){
			this._signals[name] = null;
			if(this._logs) console.log('Signal '+name+' in '+this.targetName+' removed');
		}
	}

	emitSignal = (name, vars={}) => {
		var event = null;
		if(!this._signals.hasOwnProperty(name)){
			var varKeys = Object.keys(vars);
			this.createSignal(name,...varKeys);
		}
		event = this._signals[name];

		for(var kkey of Object.keys(vars))
			event.data[kkey] = vars[kkey];
		for(var elem of this._connectedObjects){
			elem.dispatchEvent(event);
		}
	}

	connectElement = (element) => {
		if(element && element instanceof EventTarget){
			var identifier = '';
			if(!element.hasOwnProperty('connectId')){
				element.connectId = randomID('ConnectID:');
				if(element instanceof HTMLElement){
					element.dataset.connectId = element.connectId;
				}
			}
			if(element instanceof Element){
				if(String(element.id)){
					identifier+=' id('+element.id+')';
				}
				if(String(element.className)){
					identifier+=' class('+element.className+')';
				}
				if(String(element.localName)){
					identifier+=' tag('+element.localName+')';
				}
				else{
					identifier+=' tagName('+element.tagName+')';
				}
			}
			identifier += ' ('+element.connectId+')';
			
			if(!hardPush(this._connectedObjects,element,['connectId'])){
				if(this._logs) console.log('Element '+identifier+' is already connected');
				return false;
			}
			else{
				if(this._logs) console.log('Element '+identifier+' connected!');
				return true;
			}
		}
		else{
			if(this._logs) console.log('Element was not valid');
		}
		return false;
	}

	disconnectElement = (element) => {
		if(element && element instanceof EventTarget){
			var identifier = ''; var isDisconnected = false;
			for(var i=0;i < this._connectedObjects.length;i++){
				var elem = this._connectedObjects[i];
				if(elem.connectId===element.connectId){
					this._connectedObjects.splice(i,1);
					isDisconnected = true;
				}
			}
			if(element instanceof Element){
				if(String(element.id)){
					identifier+=' id: '+element.id;
				}
				if(String(element.className)){
					identifier+=' class: '+element.className;
				}
				if(String(element.localName)){
					identifier+=' tag: '+element.localName;
				}
				else{
					identifier+=' tagName:'+element.tagName;
				}
			}
			identifier += ' ('+element.connectId+')';
			
			if(!isDisconnected){
				if(this._logs) console.log('Element '+identifier+' was not connected/already disconnected');
				return false;
			}
			else{
				if(this._logs) console.log('Element '+identifier+' successfully disconnected!');
				return true;
			}
		}
		else{
			if(this._logs) console.log('Element was not valid');
		}
		return false;
	}

	disconnectAllElements = () =>{
		for(var el of this._connectedObjects){
			this.disconnectElement(el);
		}
	}

	connectElements = (elementArr) => {
		if(elementArr && elementArr instanceof Array){
			for(var el of elementArr){
				this.connectElement(el);
			}
		}
	}

	isConnectedToElement = (element) => {
		return findItem(this._connectedObjects,element);
	}
	logsOn = () =>{
		this._logs = true;
	}
	logsOff = () =>{
		this._logs = false;
	}
}

export class Conductor extends ProcessingTarget{
	targetName = randomID('[Conductor:',']');

	bpm = 100;
	measure = 4;
	audio = null;

	audioContext = null;
	source = null;
	analyser = null;
	volumeControl = null;

	musicContainer = null;

	crotchet;
	stepCrotchet;
	bps;

	currStep = 1;
	lastStep = 0;
	currBeat = 1;
	lastBeat = 0;

	totalSteps = 0;
	totalBeats = 0;

	timeElapsed = 0.0;
	songPos = 0.0;
	songLength = 0.0;

	constructor(bpm=100,measure=4,audioElement=null){
		super();

		this.connectElement(document.getElementsByTagName('body')[0]);
		this.audioContext = new (window.AudioContext||window.webkitAudioContext)({ latencyHint: 'interactive' });
		this.changeStats(bpm,measure);
		this.connectAudioObject(audioElement);
		this.connectMusicContainer(new MusicContainer());
	}

	_ready(){
		super._ready();
	}

	_process(delta){
		// console.log('tick - '+delta);
	}

	_physicsProcess(delta){
		if(this.audioIsConnected()){
			this.timeElapsed += delta;
			this.songPos = this.audio.currentTime;
			if(this.isPlaying()){
				
				var contextOutputTime = this.audioContext.getOutputTimestamp().contextTime;
				var contextProcessTime = this.audioContext.currentTime;
				this.songPos += (contextProcessTime - contextOutputTime);
				this.songPos -= (this.audioContext.baseLatency);
				this.currStep = Math.trunc(this.songPos/this.stepCrotchet);
				this.processStep();
			}
		}
	}

	//Process Functions
	processStep = () => {
		this.songLength = this.audio?.duration;
		if(this.currStep >= this.totalSteps){
			if(this.isPlaying()){
				this.stop();
				this.songEnd();
			}
		}
		if(this.currStep > this.lastStep){
			this.stepHit();
			this.currBeat = Math.trunc(this.currStep/this.measure);
			this.lastStep = this.currStep;
		}
		if(this.currBeat > this.lastBeat){
			this.beatHit();
			this.lastBeat = this.currBeat;
			if(this.currBeat%4 == 0)
				this.barHit();
		}

	}

	//Emitting/Event Functions
	stepHit = () => {
		let data = shuffleArray(Array.from(this.frequencyData()));
		let delay = this.stepDelay();

		this.emitSignal('stepHit',{
			step: this.currStep,
			crotchet: this.crotchet,
			stepCrotchet: this.stepCrotchet,
			semibreve: this.crotchet*4,
			frequencyData:data,
			bpm:this.bpm,
			measure:this.measure,
			delay:delay,
			volume:this.getVolume(),
		});

	}
	beatHit = () => {
		let data = shuffleArray(Array.from(this.frequencyData()));
		let delay = this.stepDelay();

		this.emitSignal('beatHit',{
			beat: this.currBeat,
			crotchet: this.crotchet,
			stepCrotchet: this.stepCrotchet,
			semibreve: this.crotchet*4,
			frequencyData:data,
			bpm:this.bpm,
			measure:this.measure,
			delay:delay,
			volume:this.getVolume(),
		});
	}
	barHit = () => {
		let data = shuffleArray(Array.from(this.frequencyData()));
		let delay = this.stepDelay();

		this.emitSignal('barHit',{
			bar: Math.trunc(this.currBeat/4),
			crotchet: this.crotchet,
			stepCrotchet: this.stepCrotchet,
			semibreve: this.crotchet*4,
			frequencyData:data,
			bpm:this.bpm,
			measure:this.measure,
			delay:delay,
			volume:this.getVolume(),
		});
	}
	songEnd = () =>{
		let data = shuffleArray(Array.from(this.frequencyData()));
		let delay = this.stepDelay();

		this.emitSignal('songEnd',{
			step: this.currStep,
			beat: this.currBeat,
			bar: Math.trunc(this.currBeat/4),
			crotchet: this.crotchet,
			stepCrotchet: this.stepCrotchet,
			semibreve: this.crotchet*4,
			frequencyData:data,
			bpm:this.bpm,
			measure:this.measure,
			delay:delay,
			volume:this.getVolume(),
		});
	}

	//Change and Connection Functions
	changeStats = (bpm,measure) => {
		if(bpm<1) bpm = 1;
		if(measure<1) measure = 1;
		this.bpm = Math.round(Number(bpm));
		this.measure = Math.round(Number(measure));

		this.crotchet = 60/this.bpm;
		this.stepCrotchet = this.crotchet/this.measure;
		this.bps = this.bpm/60;
		this.emitSignal('bpmChange',{
			bpm:this.bpm,
			measure:this.measure
		});
		this.connectAudioObject(this.audio);
	}

	connectMusicContainer=(container)=>{
		if(container instanceof MusicContainer){
			this.connectElement(container);
			this.musicContainer = container;
			container.conductor = this;
			if(this._logs) console.log('MusicContainer Connected');
			this.emitSignal('musicContainerConnect',{
				container:container.connectId,
			});
			container.addEventListener('barHit',container.onBarHit);
			container.addEventListener('stepHit',container.onStepHit);
			container.addEventListener('beatHit',container.onBeatHit);
			container.addEventListener('bpmChange',container.onBpmChange);
		}
	}

	connectAudioObject = (audioElement) => {
		if(audioElement && typeof audioElement === 'object' && audioElement instanceof Audio){
			if(audioElement!=this.audio){
				this.audio = audioElement;

				this.source = this.audioContext.createMediaElementSource(this.audio);
				this.analyser = this.audioContext.createAnalyser();
				this.volumeControl = this.audioContext.createGain();


				this.source.connect(this.volumeControl);
				this.volumeControl.connect(this.analyser);
				this.analyser.connect(this.audioContext.destination);
				
				if(this._logs) console.log('AudioElement Connected');
				this.emitSignal('audioConnect',{
					audioFile:this.audio.src
				});
			}
			this.audio = audioElement;
			this.songLength = this.audio.duration;
			this.totalSteps = Math.ceil(this.songLength * this.bps * this.measure);
			this.totalBeats = Math.ceil(this.totalSteps/this.measure);
			
			this.audio.onplay = () => {
				this.audioContext.resume();
			}
			this.audio.onpause = () => {
				this.audioContext.suspend();
			}
			this.audio.ontimeupdate = ()=>{
				
			};
			this.audio.ondurationchange = () =>{
				this.songLength = this.audio.duration;
				this.totalSteps = Math.ceil(this.songLength * this.bps * this.measure);
				this.totalBeats = Math.ceil(this.totalSteps/this.measure);
				this.resetConductor();
			};
			this.audio.onseeking = () => {

			}
			this.audio.onseeked = () => {

			}
			/*this.source = this.audioContext.createMediaElementSource(this.audio);
			this.source.connect(this.audioContext.destination);
			console.log('AudioElement Connected');
			this.emitSignal('audioConnect',{
				audioFile:this.audio.src
			});*/
		}
	}

	resetConductor = () => {
		this.currStep = 1;
		this.lastStep = 0;
		this.currBeat = 1;
		this.lastBeat = 0;
		this.timeElapsed = 0;
		this.songPos = 0;
	}

	resetBeat = () => {
		this.lastStep = 0;
		this.lastBeat = 0;
	}

	//Playing functions
	playOn = () => {
		this.playFromStep(this.currStep);
	}
	pause = () => {
		if(this.audioIsConnected()){
			this.audioContext.suspend();
			if(!this.audio.paused){
				this.audio.pause();
			}
		}
	}
	stop = () => {
		if(this.audioIsConnected())
			this.audio.currentTime = 0;
		this.pause();
		this.resetConductor();
	}
	setStep = (step) => {
		if(step<0 || isNaN(step)) step = 0;
		if(this.audioIsConnected()){
			this.audio.currentTime = (step * this.stepCrotchet);
		}
		this.currStep = step;
		this.currBeat = Math.trunc(this.currStep/this.measure);
		this.resetBeat();
		this.emitSignal('stepChange');
	}
	setBeat = (beat) => {
		this.setStep(beat*this.measure);
	}

	playFromStep = (step) => {
		if(this.audioIsConnected()){
			this.audioContext.resume();
			if(this.audio.paused){
				this.audio.play();
			}
		}
		this.setStep(step);
	}
	playFromBeat = (beat) => {
		this.playFromStep(beat*this.measure);
	}
	mute = () =>{
		if(this.volumeControl){
			this.volumeControl.gain.value = 0;
			// console.log(this.volumeControl.gain.value);
		}
	}
	unmute = () =>{
		if(this.volumeControl){
			this.volumeControl.gain.value = 1;
			// console.log(this.volumeControl.gain.value);
		}
	}
	isMuted = () =>{
		if(this.getVolume()<=0){
			return true;
		}
		return false;
	}
	setVolume = (val) =>{
		if(val<0 || isNaN(val)) return;
		if(this.volumeControl){
			this.volumeControl.gain.value = val;
		}
	}
	getVolume = () =>{
		if(this.volumeControl){
			return this.volumeControl.gain.value;
		}
	}
	//Checkers
	frequencyData = () =>{
		let data = new Uint8Array();
		if(this.analyser){
			data = new Uint8Array(this.analyser.frequencyBinCount);
			this.analyser.getByteFrequencyData(data);
		}
		return data;
	}
	stepDelay=()=>{
		return (this.audio.currentTime-(this.currStep*this.stepCrotchet));
	}
	audioIsConnected = () => {
		if(this.audio && typeof this.audio === 'object' && this.audio instanceof Audio)
			return true;
		return false;
	}
	isMuted = () => {
		if(this.volumeControl){
			if(this.volumeControl?.gain?.value>0){
				return false;
			}
			return true;
		}
		return false;
	}
	isPlaying = () => {
		if(!this.audio?.paused) return true;
		return false;
	}
};

export class MusicContainer extends ProcessingTarget{
	targetName = randomID('[MusicContainer:',']');
	steps = [];
	slots = {};
	bpm = null; measure = null;
	conductor = null;
	constructor(conductor,steps=[]){
		super();
		this.conductor = (conductor instanceof Conductor)?conductor:null;
		this.slots={};
		if(this.conductor){
			this.steps = new Array(conductor.totalSteps);
			if(steps instanceof Array && steps[0] instanceof Object){
				this.setSteps(steps)
			}
			this.syncConductor();
		}
		
	}
	setSteps=(steps)=>{
		if(this.conductor){
			if(steps instanceof Array && steps[0] instanceof Object){
				for(let coll of steps){
					if(!coll.step) continue;
					this.addSlot(coll);
				}
			}else if(steps instanceof Object){
				for(let collID of Object.keys(steps)){
					let coll = steps[collID];
					if(!coll.step) continue;
					this.addSlot(coll);
				}
			}
			this.updateSlots();
			this.syncConductor();
		}
	}
	getNotes=(index)=>{
		if(index<0||index>=this.conductor.totalSteps) return null;
		return this.steps[index];
	}
	getSlot=(id)=>{
		if(typeof id === 'string'){
			return this.slots[id]||null;
		}
		if(typeof id === 'number'){
			return (id>=0 && id<this.conductor.totalSteps)?this.steps[id]:null;
		}
	}
	getNote=(index,noteName)=>{
		let coll = this.getNotes(index);
		if(coll && coll instanceof MusicNoteCollection){
			return coll.getNote(noteName);
		}
		return null;
	}
	updateSlots(){
		for(let slotID of Object.keys(this.slots)){
			let coll = this.slots[slotID];
			if(!coll || !(coll instanceof MusicNoteCollection)){
				this.steps[coll.step] = null;
				delete this.slots[slotID];
				// console.log('No coll here');
				continue;
			}else{
				this.setNext(coll);
			}
		}
	}
	setNext(coll){
		if(!(coll instanceof MusicNoteCollection)){
			// console.log('Not valid MusicNoteCollection');
			return;
		}
		if(!this.slots[coll.id]){
			// console.log('Not available in Container');
			return;
		}
		let _next = null;
		for(let slotID of Object.keys(this.slots)){
			let initColl = this.slots[slotID];
			if(initColl && initColl.step > coll.step){
				if(!_next || _next.step > initColl.step){
					_next = initColl;
				}
			}
		}
		if(!_next){
			// console.log('No next available')
		}else{
			// console.log(`Next set: ${_next.id}`)
		}
		coll.next = _next;
	}
	addSlot=(coll)=>{
		if(coll instanceof MusicNoteCollection){
			this.steps[coll.step] = coll;
			this.slots[coll.id] = this.step[coll.step];
			this.updateSlots();
			// console.log('initSlot is MusicNoteCollection');
			return true;
		}else if(coll instanceof Object){
			let newColl = new MusicNoteCollection(coll);
			this.steps[newColl.step] = newColl;
			this.slots[newColl.id] = newColl;
			this.updateSlots();
			// console.log('initSlot is Object');
			return true;
		}else if(typeof coll === 'number'){
			if(coll<0||coll>=this.conductor.totalSteps) return false;
			let newColl= new MusicNoteCollection({
				step:coll, delay:0.0, notes:null, targets:[]
			});
			this.steps[newColl.step] = newColl;
			this.slots[newColl.id] = newColl;
			this.updateSlots();
			// console.log('initSlot is number');
			return true;
		}
		// console.log('initSlot INVALID');
		return false;
	}
	removeSlot=(coll)=>{
		if(coll instanceof MusicNoteCollection){
			let initColl = coll;
			if(initColl){
				this.steps[initColl.step] = null;
				delete this.slots[initColl.id];
				this.updateSlots();
				return true;
			}
		}else if(coll instanceof Object){
			let initColl = this.slot[coll.id];
			if(initColl){
				this.steps[initColl.step] = null;
				delete this.slots[initColl.id];
				this.updateSlots();
				return true;
			}
		}else if(typeof coll === 'number'){
			if(coll<0||coll>=this.conductor.totalSteps) return false;
			let initColl = this.steps[coll];
			if(initColl){
				this.steps[coll] = null;
				delete this.slots[initColl.id];
				this.updateSlots();
				return true;
			}
		}
		return false;
	}
	addNote=(index,note)=>{
		if(index<0||index>=this.conductor.totalSteps) return false;
		let _note;
		if(typeof note === 'string'){
			_note = new MusicNote({
				note:note, step:this.step,targets:this.targets,
				next:null, intensity:1,
			});
		}else if(note instanceof MusicNote){
			_note = note;
		}
		let coll = this.steps[index];
		if(!coll || !(coll instanceof MusicNoteCollection)){
			if(this.addSlot(index)){
				coll = this.steps[index];
			}
		}
		if(_note && coll){
			if(coll.addNote(_note)){
				this.updateSlots();
				// console.log('note is VALID');
				return true;
			}
			// console.log('note INVALID');
			return false;
		}
		// console.log('coll INVALID');
		return false;
	}
	removeNote=(index,note)=>{
		if(index<0||index>=this.conductor.totalSteps) return false;
		let _note;
		if(!(this.steps[index])) return false;
		let coll = this.steps[index];
		if(!coll) return false;
		if(typeof note === 'string'){
			_note = coll.notes[note];
		}else if(note instanceof MusicNote){
			_note = coll.notes[note.note];
		}
		if(_note && coll){
			if(coll.removeNote(_note)){
				if(!coll.notes || !Object.keys(coll.notes).length){
					this.removeSlot(coll);
					// console.log('No notes in coll');
				}
				this.updateSlots();
				return true;
			}
		}
		return false;
	}
	syncConductor=()=>{
		if(this.conductor){
			this.bpm = this.conductor.bpm;
			this.measure = this.conductor.measure;
		}
		
	}
	// EVENT FUNCTIONS
	onStepHit=(event)=>{
		let currStep = event.detail?.step||null;
		if(currStep===null) return;

		let coll = this.getSlot(currStep);
		if(!coll) return;
		coll.delay = event.detail.delay;
		coll.step = currStep;
		this.emitSignal(`noteHit`,{
			// notes: coll.asJSON(),
			notes: coll,
			step: currStep,
			crotchet: event.detail.crotchet,
			stepCrotchet: event.detail.stepCrotchet,
			semibreve: event.detail.semibreve,
			frequencyData:event.detail.data,
			bpm:event.detail.bpm,
			measure:event.detail.measure,
			delay:event.detail.delay,
		});
	}
	onBeatHit=(event)=>{
		let currBeat = event.detail?.beat||null;
		if(currBeat===null) return;
		let currStep = (currBeat*this.conductor.measure);
		let coll = this.getSlot(currStep);

		if(!coll) return;
		coll.delay = event.detail.delay;
		coll.step = currStep;
		this.emitSignal(`noteBeatHit`,{
			// notes: coll.asJSON(),
			notes: coll,
			step: currStep,
			beat: currBeat,
			crotchet: event.detail.crotchet,
			stepCrotchet: event.detail.stepCrotchet,
			semibreve: event.detail.semibreve,
			frequencyData:event.detail.data,
			bpm:event.detail.bpm,
			measure:event.detail.measure,
			delay:event.detail.delay,
		});
	}
	onBarHit=(event)=>{
		let currBar = event.detail?.bar||null;
		if(currBar===null) return;
		let currStep = (currBar*this.conductor.measure*4)

		let coll = this.getSlot(currStep);
		if(!coll) return;
		coll.delay = event.detail.delay;
		coll.step = currStep;
		this.emitSignal(`noteBarHit`,{
			// notes: coll.asJSON(),
			notes: coll,
			bar: currBar,
			step: currStep,
			crotchet: event.detail.crotchet,
			stepCrotchet: event.detail.stepCrotchet,
			semibreve: event.detail.semibreve,
			frequencyData:event.detail.data,
			bpm:event.detail.bpm,
			measure:event.detail.measure,
			delay:event.detail.delay,
		});
	}
	onBpmChange=(event)=>{
		let totalSteps = Math.ceil(this.conductor.songLength * this.conductor.bps * this.conductor.measure);
		let newSteps = [];
		let bpmRatio = (this.conductor.bpm/this.bpm);
		let measureRatio = (this.conductor.measure/this.measure);
		this.steps.forEach((item,index)=>{
			let newStep = Math.trunc(bpmRatio*measureRatio*index);
			newSteps[newStep] = item;
		});
		this.steps = newSteps;
		this.syncConductor();
	}
	//other
	asJSON=()=>{
		let obj = {
			name:this.targetName,
			slots:{},
		};
		for(let slotID of Object.keys(this.slots)){
			let coll = this.slots[slotID];
			obj.slots[slotID] = coll.asJSON();
		}
		return obj;
	}
};

export class MusicNoteCollection extends Object{
	id = '';
	step = 0;
	delay = 0.0;
	targets = [];
	notes = {};
	next = null;
	constructor(x){
		super();
		this.id = x.id||randomID('MNoteCollection-','',9);
		this.step = x.step||0;
		this.delay = x.delay||0.0;
		this.notes = {};
		this.targets = (x.targets instanceof Array)?x.targets:[];
		if(x.next instanceof MusicNoteCollection){
			this.next = x.next;
		}else if (typeof x.next === 'string') {
			this.next = x.next;
		}
		if(x.notes instanceof Object){
			for(let noteName of Object.keys(x.notes)){
				if(x.notes[noteName] instanceof MusicNote){
					this.addNote(x.notes[noteName]);
				}
				if(x.notes[noteName] instanceof Object){
					this.addNote(new MusicNote(x.notes[noteName]));
				}
			}
		}
	}
	addNote=(note)=>{
		if(typeof note === 'string'){
			let _note = new MusicNote({
				note:note, step:this.step, targets:this.targets,
				next:null, intensity:1,
			});
			this.notes[note] = _note;
			_note.step = this.step;
			// console.log('note is string');
			return true;
		}else if(note instanceof MusicNote){
			this.notes[note.note] = note;
			note.step = this.step;
			// console.log('note is MusicNote');
			return true;
		}
		// console.log('note WACK');
		return false;
	}
	removeNote=(note)=>{
		if(typeof note === 'string'){
			if(this.notes[note]){
				delete this.notes[note];
				return true;
			}
		}else if(note instanceof MusicNote){
			if(this.notes[note.note]){
				delete this.notes[note.note];
				return true;
			}
		}
		return false;
	}
	getNote=(noteName)=>{
		if(this.notes[noteName]){
			return this.notes[noteName];
		}
		return null;
	}

	toString=()=>{
		return JSON.stringify(this.asJSON());
	}

	asJSON=()=>{
		let obj = {
			id:this.id, step:this.step,
			delay:this.delay,targets:this.targets,
			next:(this.next?.id?this.next.id:((typeof this.next === 'string')?this.next:null)),
			notes:{}
		};
		for(let noteName of Object.keys(this.notes)){
			if(this.notes[noteName] instanceof MusicNote){
				obj.notes[noteName] = this.notes[noteName].asJSON();
			}
		}
		return obj;
	}
};

export class MusicNote extends Object{
	id = '';
	step = 0;
	next = null;
	note = 'beat';
	targets = [];
	intensity = 0.0;
	detail = {};

	constructor(x){
		super();
		this.id = x.id?x.id:randomID('MNote-','',9);
		this.step = x.step||0;
		this.note = x.note||'beat';
		this.targets = (x.targets instanceof Array)?x.targets:[];
		this.detail = (x.detail instanceof Object)?x.detail:{};
		this.intensity = x.intensity?x.intensity:0.0;
		if(x.next instanceof MusicNote){
			this.next = x.next;
		}else if (typeof x.next === 'string') {
			this.next = x.next;
		}
	}

	toString=()=>{
		return JSON.stringify(this.asJSON());
	}

	asJSON=()=>{
		let obj = {
			id:this.id, step:this.step,
			note:this.note, targets:this.targets,
			next:(this.next?.id?this.next.id:((typeof this.next === 'string')?this.next:null)),
			intensity:this.intensity,
			detail:JSON.parse(JSON.stringify(this.detail))
		};

		return obj;
	}

}

const setIntervalAsync = (func, time, ...args) => {
	var latency;
	setTimeout(()=>{
		let lastTime = window.performance.now();
		func(time,...args).then((res)=>{
			let currTime = window.performance.now();
			let tick = (currTime-lastTime);
			latency = tick-(time/1000);
			if(res.update){
				let newTime = (latency*1000/2)+time;
				setIntervalAsync(func, newTime, ...args);
			}
			else{
				setIntervalAsync(func, time, ...args);
			}
		},()=>{
			console.log('No Promise returned');
			//repeat with same time
			setIntervalAsync(func, time, ...args);
		}).catch((err)=>{
			console.log('Error in Inverval loop');
			//end interval
		});
	},time);
};