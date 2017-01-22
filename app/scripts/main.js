'use strict';
var overlay = document.getElementById('overlay');
var modalContainer = document.getElementById('modal-container');
var dialogAnimationDuration = 250;

function openModal(event){
  modalContainer.style.top = event.clientY + 'px';
  modalContainer.style.left = event.clientX + 'px';
  overlay.classList.remove('is-hidden');
  var removeStyleTimeout = setTimeout(function () {
    modalContainer.style.top = 0;
    modalContainer.style.left = 0;
    clearTimeout(removeStyleTimeout);
  }, dialogAnimationDuration);
}

function closeModal(){
  overlay.classList.add('is-hidden');
}
