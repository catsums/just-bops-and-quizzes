<form class="createPlaylist h-90">
	<div class="card my-1 mx-5 quizCard h-100">
		<div class="card-header">
			<div class="card-img-top dropSite dropImage listFormImage" style="background-image:url('./data/image/default.dat');">
				<div class="c0-bg p-2 opacity-75"><i class="fas fa-plus-square mx-2"></i><span>Drag and drop image or Click to select image</span></div>
				<button class="btn formBtn removeFileBtn" id="dropBtn">Remove</button>
			</div>
			<input type="file" name="dropImageFile" class="dropImageFile listFormImageFile dontShow"/>
			
		</div>
		<input type="text" class="card-title listName inputBox w-100 px-4 cI-bg" placeholder="Playlist Name here"/>
		<div class="card-body my-1 mx-3">
			<textarea class="listDesc formTextarea w-100 h-80" placeholder="Playlist Description here"></textarea>
		</div>
		<div class="card-body my-1 mx-3">
			<div class="playListQuizzes list-group">
				<li class="row list-group-item playListQuiz">
					<div class="col-1 cI-bg playListItemColor"></div>
					<div class="col playListItemName">Quiz Name</div>
					<div class="col-4 playListItemUser cI-txt">by User Name</div>
					<button class="btn formBtn col-2 justify-content-center removeItemBtn"><i class="fas fa-minus-square mx-2 c2-txt"></i></button>
				</li>
			</div>
			<div class="clickContainer mx-5 my-2 playlistAddQuiz">
				<i class="fas fa-plus-square mx-2"></i><span>Add Quiz</span>
			</div>
		</div>
	</div>
</form>

<div class="quizMenuControl my-2 mx-5 p-1 h-5">
	<div class="btn formBtn listEditBtn mx-0 thiccBtn" id="listEditBtnAddQuiz">
		<i class="fas fa-plus-square mx-2"></i><span class="listEditBtnText font-xs-100 font-md-0 thiccBtnText">Add Quiz</span>
	</div>
	<div class="btn formBtn listEditBtn mx-0 thiccBtn" id="listEditBtnClearPlaylist">
		<i class="fas fa-minus-square mx-2"></i><span class="listEditBtnText font-xs-100 font-md-0 thiccBtnText">Clear Playlist</span>
	</div>
	<div class="btn formBtn listEditBtn mx-0 thiccBtn">
		<i class="fas fa-window-close mx-2"></i><span class="listEditBtnText font-xs-100 font-md-0 thiccBtnText">Cancel Playlist Creation</span>
	</div>
</div>
					