var namespace = (function() {
  'use strict';

  var overlay = document.getElementById('overlay');
  var dialogAnimationDuration = 750;

  return {
    openModal: openModal,
    closeModal: closeModal,
    loadTemplate: loadTemplate
  };

  function openModal(event, section) {
    console.log('opening modal');
    var modalContainer = document.getElementById('modal-container');
    // setModalPositionFrom(event, modalContainer);
    self.overlay.classList.remove('is-hidden');

    var removeStyleTimeout = setTimeout(function () {
      // unsetModalPositionFrom(modalContainer);
      loadTemplate(section);
      disableScrollOn('cosmo');
      clearTimeout(removeStyleTimeout);
    }, dialogAnimationDuration);
  }

  function closeModal(){
    var modalBody = document.getElementById('modal-body');
    var modalContainer = document.getElementById('modal-container');
    modalContainer.classList.add('size-down');
    modalBody.innerHTML = '';

    var removeStyleTimeout = setTimeout(function () {
      unsetTitle();
      enableScrollOn('cosmo');
      modalContainer.classList.remove('size-down');
      self.overlay.classList.add('is-hidden');
      clearTimeout(removeStyleTimeout);
    }, 700);

  }

  function loadTemplate(section) {
    console.log('loading template...');
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

  function disableScrollOn(cosmo) {
    var element = document.getElementById(cosmo);
    element.style.overflow = 'hidden';
  }

  function enableScrollOn(cosmo) {
    var element = document.getElementById(cosmo);
    element.style.overflow = 'scroll';
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
