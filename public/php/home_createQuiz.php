<div class="row h-100 p-2 creationSectionContainer">
	<div class="col">
		<div class="row m-1">
			<div class="col alert formLog logg"> </div>
		</div>
		<div class="row m-1 h-75">
			<div class="col creationSection px-3">
				<div class="btn formBtn creationSectionBtn"><i class="fas fa-window-close"></i></div>
				<form method="POST" class="createForm createQuizForm">
					<div class="row my-1">
						<div class="col mr-2">
							<label class="inputLbl" for="qname">Quiz Name:</label>
						</div>
					</div>
					<div class="row my-1">
						<div class="col">
							<input type="text" id="qname" class="inputBox  form-control" name="qname" maxlength="20">
						</div>
					</div>
					<div class="row my-1">
						<div class="col mr-2">
							<label class="inputLbl" for="desc">Description:</label>
						</div>
					</div>
					<div class="row my-1">
						<textarea class="col formTextarea form-control w-100" id="desc" name="desc" rows="5"></textarea>
					</div>
					<div class="row my-1">
						<div class="col mr-2">
							<label class="inputLbl" for="images[]">Images File(s):</label>
						</div>
					</div>
					<div class="row my-1">
						<div class="col dropSite w-100" id="dropArea">
							<!-- <input class="dropFile" id="dropFiles" type="file" name="images[]" accept="image/*" multiple="multiple"> -->
							<button class="btn formBtn removeFileBtn" id="dropBtn">Remove</button>
							<p>Drag one or more files to this Drop Site ...</p>
						</div>
						<div class="dropStatus">Status here!</div>
					</div>
					<div class="row my-1">
						<div class="col">
							<label class="inputLbl" for="hashtags">Hashtags:</label>
						</div>
					</div>
					<div class="row my-1">
						<div contenteditable="true" class="col formTextarea hashtagArea form-control w-100" id="hashtags" name="hashtags"></div>
					</div>
					<div class="row my-1">
						<div class="col">
							<p class="minitext">Use a comma (,) to seperate hashtags. They will be added automatically.</p>
						</div>
					</div>
					<div class="row my-3 mx-2">
						<div class="col btn formBtn" id="createQuizBtn">
							Create
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>