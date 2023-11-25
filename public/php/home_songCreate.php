<form class="createSongForm h-80">
	<div class="card my-1 mx-5 questionCard quizCard h-100">
		<div class="card-header m-5">
			<input type="text" class="card-title songName inputBox w-100 px-4 cI-bg" placeholder="Song Name here"/>
			<input type="text" class="card-subtitle songArtist inputBox w-100 px-4 text-right" placeholder="Artist Name here"/>
		</div>
		<hr>
		<div class="card-body my-1 w-100 h-xs-auto">
			<div class="dropSite dropAudio h-20">
				<div class="c0-bg opacity-75"><i class="fas fa-plus-square mx-2"></i><span>Drag and drop audio or Click to select audio</span></div>
				<button class="btn formBtn removeFileBtn" id="dropBtn">Remove</button>
				<input type="file" name="dropSongFile" class="dropSongFile songEditFile dontShow"/>
			</div>
			<div class="row playBar w-75">
				<div class="playBar-bar">
					<div class="playBar-progress" data-progress="0">
						<div class="playBar-node"></div>
					</div>
				</div>
			</div>
			<div class="testAudioPlayer text-center m-3">
				<button class="btn formBtn mx-2"><i class="fas fa-step-backward mx-0"></i></button>
				<button class="btn formBtn mx-2"><i class="fas fa-backward mx-0"></i></button>
				<button class="btn formBtn mx-2"><i class="fas fa-play mx-0"></i></button>
				<button class="btn formBtn mx-2"><i class="fas fa-forward mx-0"></i></button>
				<button class="btn formBtn mx-2"><i class="fas fa-step-forward mx-0"></i></button>
			</div>
			
		</div>
		<hr class="my-2"/>
		<div class="card-body my-1 w-100 h-xs-auto">
			<label for="songBPM" class="mx-2">BPM</label>
			<input type="number" class="songBPM inputBox inputNumBox w-15 px-2" id="songBPM" max="999" min="1" placeholder="100" />
			<label for="songMeasure" class="mx-2">Measure</label>
			<input type="number" class="songMeasure inputBox inputNumBox w-15 px-2" id="songMeasure" max="64" min="1" placeholder="4"/>
		</div>
		<hr>
	</div>
</form>

<div class="quizMenuControl my-4 mx-5 p-1 h-10">
	<div class="btn formBtn thiccBtn songEditBtn mx-0" id="songEditSave">
		<i class="fas fa-plus-circle mx-2"></i><span class="thiccBtnText font-xs-100 font-md-0">Save Song</span>
	</div>
	<div class="btn formBtn thiccBtn songEditBtn mx-0" id="songEditCancel">
		<i class="fas fa-window-close mx-2"></i><span class="thiccBtnText font-xs-100 font-md-0">Cancel Song Edit</span>
	</div>
</div>