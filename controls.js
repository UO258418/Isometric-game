function processKeys(event) {
	switch(event.key) {

		// camera
		case 'w': 
			camera.moveUp();
			break;
		case 'a': 
			camera.moveLeft();
			break;
		case 's': 
			camera.moveDown();
			break;
		case 'd': 
			camera.moveRight();
			break;
	}
	
}