<div class="row h-100 p-2 creationSectionContainer">
	<div class="col">
		<div class="row m-1">
			<div class="col alert formLog logg"> </div>
		</div>
		<div class="row m-1 h-75">
			<div class="col creationSection px-3">
				<div class="btn formBtn creationSectionBtn"><i class="fas fa-window-close"></i></div>
				<form method="POST" class=" createForm addSongForm">
					<div class="row my-1">
						<div class="col mr-2">
							<label class="inputLbl" for="songTitle">Song Title:</label>
						</div>
					</div>
					<div class="row my-1">
						<div class="col">
							<input type="text" id="songTitle" class="inputBox form-control" name="songTitle" maxlength="40">
						</div>
					</div>
					<div class="row my-1">
						<div class="col mr-2">
							<label class="inputLbl" for="songArtist">Song Artist:</label>
						</div>
					</div>
					<div class="row my-1">
						<div class="col">
							<input type="text" id="songArtist" class="inputBox  form-control" name="songArtist" maxlength="30">
						</div>
					</div>
					<div class="row my-1">
						<div class="col mr-2">
							<label class="inputLbl" for="bpm">BPM:</label>
						</div>
					</div>
					<div class="row my-1">
						<div class="col">
							<input type="number" id="bpm" class="inputBox inputNumBox form-control" name="bpm" max="9999" min="1" placeholder="100">
						</div>
					</div>
					<div class="row my-1">
						<div class="col mr-2">
							<label class="inputLbl" for="measure">Measure:</label>
						</div>
					</div>
					<div class="row my-1">
						<div class="col">
							<input type="number" id="measure" class="inputBox inputNumBox form-control" name="measure" max="16" min="1" placeholder="4">
						</div>
					</div>
					<div class="row my-1">
						<div class="col mr-2">
							<label class="inputLbl" for="url">Original Source URL:</label>
						</div>
					</div>
					<div class="row my-1">
						<div class="col">
							<input type="text" id="url" class="inputBox  form-control" name="url" maxlength="30">
						</div>
					</div>
					<!-- <div class="row my-1">
						<div class="col minitext">
							Use a Soundcloud or Youtube Link or Drag a song file
						</div>
					</div> -->
					<div class="row my-1">
						<div class="col dropSite w-100" id="dropArea">
							<input class="dropFile" id="dropFiles" type="file" name="images" accept="audio/*">
							<button class="btn formBtn removeFileBtn" id="dropBtn">Remove</button>
							<p>Drag the Audio file to this Drop Site</p>
							<!-- <p>...or Drag one Audio file to this Drop Site</p> -->
						</div>
						<div class="dropStatus">Status here!</div>
					</div>
					<div class="row my-3 mx-2">
						<div class="col btn formBtn" id="addSongBtn">
							Add
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>