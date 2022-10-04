window.onload = function () {

  // Липкое меню.
  function stikyMenu(header) {
    let headerTop = header.offset().top;
    headerToggleClass();
    $(window).scroll(function () {
      headerToggleClass();
    });
    function headerToggleClass() {
      if ($(window).scrollTop() > headerTop + 130) {
        header.addClass('sticky');
      } else if ($(window).scrollTop() <= headerTop) {
        header.removeClass('sticky');
      }
    }
  };
  stikyMenu($('#headerSticky'));

  // Мобильное меню
  function menu(btn) {
    let $this = undefined,
        drop = undefined,
        close = $('.js-menu-close'),
        body = $('body');
    btn.on('click', function (e) {
      e.preventDefault();
      $this = $(this);
      drop = $('#' + $this.data('menu'));
      $this.toggleClass('active');
      drop.toggleClass('open');
      body.toggleClass('lock');
    })
    close.on('click', function () {
      $('[data-menu="' + $(this).data('menu') + '"]').removeClass('active');
      $('#' + $(this).data('drop')).removeClass('open');
      body.removeClass('lock');
    })
  }
  menu($('.js-menu-btn'));

  // Swiper | Слайдер на главной
  if ($('#stepsSlider').length) {
    const stepsSlider = new Swiper('#stepsSlider', {
      slidesPerView: 1,
      effect: 'fade',
      navigation: {
        nextEl: '.steps__button--next',
        prevEl: '.steps__button--prev',
      },
      pagination: {
        el: ".steps__pagination",
        type: "progressbar",
        progressbarOpposite: true,
      },
    });
    // Вывод общего колличества слайдов в прогрессбар
    if (stepsSlider.slides.length < 10) {
      $('.steps__pagination-num--all').text('0' + stepsSlider.slides.length);
    } else {
      $('.steps__pagination-num--all').text(stepsSlider.slides.length);
    }
    // Вывод общего колличества слайдов в прогрессфракцию
    if (stepsSlider.slides.length < 10) {
      $('.steps__fractions-total').text('0' + stepsSlider.slides.length);
    } else {
      $('.steps__fractions-total').text(stepsSlider.slides.length);
    }
    // Вывод текущего слайда в прогрессфракцию
    function appendNumCurrent() {
      if (stepsSlider.slides.length < 10) {
        $('.steps__fractions-current').text('0' + (stepsSlider.activeIndex + 1));
      } else {
        $('.steps__fractions-current').text(stepsSlider.activeIndex);
      }
    };
    appendNumCurrent();
    stepsSlider.on('activeIndexChange', function () {
      appendNumCurrent();
    });
  }

  // Swiper | Слайдер на странице товара
  if ($('#productSlider').length) {
    const productSliderThumbs = new Swiper('#productSliderThumbs', {
      slidesPerView: 4,
      spaceBetween: 10,
      freeMode: true,
      watchSlidesProgress: true,
      preventClicks: false,
      breakpoints: {
        992: {
          slidesPerView: 5,

        },
        1200: {
          slidesPerView: 7,
        }
      }
    });
    const productSlider = new Swiper('#productSlider', {
      slidesPerView: 1,
      thumbs: {
        swiper: productSliderThumbs,
      },
    });
  }

  // Swiper | Слайдер на странице о производстве
  if ($('#workflowSlider').length) {
    const workflowSlider = new Swiper('#workflowSlider', {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      watchSlidesProgress: true,
      loopAdditionalSlides: 3,
      grabCursor: true,
      navigation: {
        nextEl: '.workflow__arrow--next',
        prevEl: '.workflow__arrow--prev',
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
      }
    });
  }

  // Видео youtube для страницы
  function uploadYoutubeVideo() {
    if ($(".js-youtube")) {

      $(".js-youtube").each(function () {
        // Зная идентификатор видео на YouTube, легко можно найти его миниатюру
        // $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

        // Добавляем иконку Play поверх миниатюры, чтобы было похоже на видеоплеер
        $(this).append($('<img src="img/play.svg" alt="Play" class="video__play">'));

      });

      $('.video__play, .video__prev').on('click', function () {
        // создаем iframe со включенной опцией autoplay
        let wrapp = $(this).closest('.js-youtube'),
          videoId = wrapp.attr('id'),
          iframe_url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&autohide=1";

        if ($(this).data('params')) iframe_url += '&' + $(this).data('params');

        // Высота и ширина iframe должны быть такими же, как и у родительского блока
        let iframe = $('<iframe/>', {
          'frameborder': '0',
          'src': iframe_url,
          'allow': "autoplay"
        })

        // Заменяем миниатюру HTML5 плеером с YouTube
        wrapp.append(iframe);

      });
    }
  };
  uploadYoutubeVideo();

  // Magnific Popup | Попап окна
  // $('.js-popup-link').magnificPopup({
  //   mainClass: 'mfp-fade',
  //   type: 'inline',
  //   midClick: true
  // });

  // Модальное окно
  function modal(modal) {
    $('.modal-trigger').on('click', function (e) {
      var $this = $(this),
        data = $this.data('modal'),
        thisModal = $(data),
        exception = $('.js-exception');
      if (!exception.is(e.target)
        && exception.has(e.target).length === 0) {
        modalShow(thisModal);
      } else {
        return false;
      }
    });
  };
  // Открытие модального окна
  function modalShow(thisModal) {
    var modalClose = thisModal.find('.js-modal-close'),
      modalBody = thisModal.find('.modal_body');
    thisModal.addClass('open');
    modalClose.on('click', function () {
      modalHide(thisModal);
    });
    modalBody.on('click', function (e) {
      if ($(this).has(e.target).length === 0) {
        modalHide(thisModal);
      }
    });
  };
  // Закрытие модального окна
  function modalHide(thisModal) {
    thisModal.removeClass('open');
  };
  modal($('.js-modal'));

  // Inputmask | Маски для полей ввода
  if ($('input[name="tel"]').length) {
    $('input[name="tel"]').inputmask({
      mask: "+7-999-999-99-99",
      showMaskOnHover: false,
    })
  }
  if ($('input[name="email"]').length) {
    $('input[name="email"]').inputmask({
      alias: 'email',
      showMaskOnHover: false,
    })
  }

  // YandexMap
  if ($('#map').length) {
    let defoltPlace = $('.contact__mapblock-link.active').data('place');
    let btn = $('.contact__mapblock-link');
    ymaps.ready(init);
    function init() {
      const myMap = new ymaps.Map('map', {
        center: defoltPlace,
        zoom: 15,
        controls: [
          'zoomControl',
        ]
      });
      // Добавление меток со своим изображением
      btn.each(function () {
        let currentPlace = $(this).data('place');
        let mark = new ymaps.Placemark(currentPlace, null, {
          iconLayout: 'default#image',
          iconImageHref: 'img/placemark.svg',
          iconImageSize: [41, 50],
          iconImageOffset: [-20, -25]
        });
        myMap.geoObjects
          .add(mark);
      });
      // Обработка клика по кнопке
      btn.on('click', function () {
        let currentItem = $(this);
        if (!currentItem.hasClass('active')) {
          let place = currentItem.data('place');
          btn.removeClass('active');
          currentItem.addClass('active');
          myMap.setCenter(place);
        } else {
          return false;
        }
      });
    }
  }

}