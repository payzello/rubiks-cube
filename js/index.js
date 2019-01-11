var interval;

function checkSolved() {
  interval = setInterval(() => {
    if (cube.isSolved()) {
      console.log('Hurray, cube is solved!');
      $('#cubeControls').css('display', 'none');
      $('#container').css('display', 'none');
      
      $('.solved').css('display', 'block');
    }
  }, 1000);
}

var cube = null;
function initCube3d() {
	var useLockedControls = true,
		controls = useLockedControls ? ERNO.Locked : ERNO.Freeform;
  
	var ua = navigator.userAgent,
		isIe = ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1;

	window.cube = new ERNO.Cube({
		hideInvisibleFaces: true,
		controls: controls,
		renderer: isIe ? ERNO.renderers.IeCSS3D : null
	});
  cube = window.cube;

	var container = document.getElementById( 'container' );
	container.appendChild( cube.domElement );

	if( controls === ERNO.Locked ){
		var fixedOrientation = new THREE.Euler(  Math.PI * 0.1, Math.PI * -0.25, 0 );
		cube.object3D.lookAt( cube.camera.position );
		cube.rotation.x += fixedOrientation.x;
		cube.rotation.y += fixedOrientation.y;
		cube.rotation.z += fixedOrientation.z;
	}	
}
$(document).ready( function(){ 
	initCube3d();
	$('#readLink').addClass('active');
	cube.shuffle(10);
	
	setTimeout(checkSolved, 3000);
  
  $('.retry').on('click', () => {
    clearInterval(interval);
    cube.shuffle(10);
    
    $('#container').css('display', 'block');
    $('#cubeControls').css('display', 'block');
    $('.solved').css('display', 'none');
		
		setTimeout(checkSolved, 3000);
  });
});