var namespace = (function() {
  'use strict';

  var overlay = document.getElementById('overlay');
  var dialogAnimationDuration = 250;

  return {
    openModal: openModal,
    closeModal: closeModal,
    loadTemplate: loadTemplate
  };

  function openModal(event, section) {
    var modalContainer = document.getElementById('modal-container');
    setModalPositionFrom(event, modalContainer);
    self.overlay.classList.remove('is-hidden');

    var removeStyleTimeout = setTimeout(function () {
      unsetModalPositionFrom(modalContainer);
      loadTemplate(section);
      clearTimeout(removeStyleTimeout);
    }, dialogAnimationDuration);
  }

  function closeModal(){
    var modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = '';
    unsetTitle();
    overlay.classList.add('is-hidden');
  }

  function loadTemplate(section) {
    var modalBody = document.getElementById('modal-body');
    var view = 'views/' + section + '.html';
    getPartial(view).then(function(response) {
      modalBody.innerHTML = response;
      setTitle(section);
    }, function (error) {
      console.log(error)
      modalBody.innerHTML = 'Ops! Could not fetch the content at this time! Sorry';
    });
  }

  function setModalPositionFrom(event, container) {
    container.style.top = event.clientY + 'px';
    container.style.left = event.clientX + 'px';
  }

  function unsetModalPositionFrom(container) {
    container.style.top = 0;
    container.style.left = 0;
  }

  function setTitle(section) {
    var title = document.getElementById('modal-title');
    title.innerHTML = section.toUpperCase();
  }

  function unsetTitle() {
    var title = document.getElementById('modal-title');
    title.innerHTML = '';
  }

  function getPartial(view) {
    return new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('GET', view);
      req.onload = function() {
        if (req.status == 200) {
          resolve(req.response);
        }
        else {
          reject(Error(req.statusText));
        }
      };
      req.onerror = function() {
        reject(Error('Network Error'));
      };
      req.send();
    });
  }
})();
