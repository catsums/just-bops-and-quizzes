<form class="createQuestionForm h-80 w-100">
	<div class="card my-1 mx-5 questionCard quizCard h-100">
		<div class="card-header">
			<div class="card-img-top dropSite dropImage questionFormImage" style="background-image:url('./data/image/default.dat');">
				<div class="c0-bg p-2 opacity-75"><i class="fas fa-plus-square mx-2"></i><span>Drag and drop image or Click to select image</span></div>
				<button class="btn formBtn removeFileBtn" id="dropBtn">Remove</button>
			</div>
			<input type="file" name="dropImageFile" class="dropImageFile questionFormImageFile dontShow"/>
			
		</div>
		<textarea class="card-title my-1 px-4 questionName formTextarea w-100 h-10" placeholder="Question here" maxlength="100"></textarea>
		
		<hr>
		<div class="card-body my-1 mx-2 w-100">
			<div class="answerDivContainer w-100">
				<div class="row answerDiv w-80 mx-2">
					<input type="text" class="col answerName inputBox px-4" name="qAnswer" placeholder="Answer here" maxlength="100"/>
					<div class="col-1 mx-2 formRadioContainer">
						<input type="radio" class="formRadioBtn answerCorrect" name="qCorrent" id="qCorrent">
						<div class="formRadioBox"></div>
					</div>
					<button class="btn formBtn col-2 removeAnswerBtn"><i class="fas fa-minus-square mx-2 c2-txt"></i></button>
				</div>
				<div class="row answerDiv w-80 mx-2">
					<input type="text" class="col answerName inputBox px-4" name="qAnswer" placeholder="Answer here" maxlength="100"/>
					<div class="col-1 mx-2 formRadioContainer">
						<input type="radio" class="formRadioBtn answerCorrect" name="qCorrent" id="qCorrent">
						<div class="formRadioBox"></div>
					</div>
					<button class="btn formBtn col-2 removeAnswerBtn"><i class="fas fa-minus-square mx-2 c2-txt"></i></button>
				</div>
				<div class="row answerDiv w-80 mx-2">
					<input type="text" class="col answerName inputBox px-4" name="qAnswer" placeholder="Answer here" maxlength="100"/>
					<div class="col-1 mx-2 formRadioContainer">
						<input type="radio" class="formRadioBtn answerCorrect" name="qCorrent" id="qCorrent">
						<div class="formRadioBox"></div>
					</div>
					<button class="btn formBtn col-2 removeAnswerBtn"><i class="fas fa-minus-square mx-2 c2-txt"></i></button>
				</div>
			</div>
			<div class="row answerAddDiv w-80 mx-2">
				<div class="col-9 my-2 p-1 clickContainer answerAdd">
					<i class="fas fa-plus-circle mx-2"></i><span>Add Answer</span>
				</div>
			</div>
		</div>
		<hr>
	</div>
</form>

<div class="quizMenuControl my-2 mx-5 p-1 h-10">
	<div class="btn formBtn quizEditBtn mx-0 thiccBtn">
		<i class="fas fa-plus-circle mx-2"></i><span class="quizEditBtnText font-xs-100 font-md-0 thiccBtnText">Add Answer</span>
	</div>
	<div class="btn formBtn quizEditBtn mx-0 thiccBtn">
		<i class="fas fa-plus-square mx-2"></i><span class="quizEditBtnText font-xs-100 font-md-0 thiccBtnText">Add Question</span>
	</div>
	<div class="btn formBtn quizEditBtn mx-0 thiccBtn">
		<i class="fas fa-minus-square mx-2"></i><span class="quizEditBtnText font-xs-100 font-md-0 thiccBtnText">Remove Question</span>
	</div>
	<div class="btn formBtn quizEditBtn mx-0 thiccBtn">
		<i class="fas fa-window-close mx-2"></i><span class="quizEditBtnText font-xs-100 font-md-0 thiccBtnText">Cancel Quiz Creation</span>
	</div>
</div>