'use strict';

let container = document.querySelector('.container');
let imageList = document.querySelectorAll('.container-item');

for (let i = imageList.length - 1; i >= 0; i--) {
    let image = imageList[i];
    image.style.left = `${image.getBoundingClientRect().left}px`;
    image.style.top = `${image.getBoundingClientRect().top}px`;
    image.style.position = 'absolute';

    image.addEventListener('mousedown', function(evt) {
        evt.preventDefault();    
        image.classList.add('pressed');
        let shiftX = evt.clientX - image.getBoundingClientRect().left;
        let shiftY = evt.clientY - image.getBoundingClientRect().top;
        container.append(image);
        
        function moveAt(pageX, pageY) {
            image.style.left = `${pageX - shiftX}px`;
            image.style.top = `${pageY - shiftY}px`;
        }

        function onMouseMove(moveEvt) {
            moveEvt.preventDefault();
            moveAt(moveEvt.pageX, moveEvt.pageY);
        }

        function onMouseUp(upEvt) {
            upEvt.preventDefault();
            image.classList.remove('pressed');
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
    
    image.ondragstart = function() {
        return false;
    }
}