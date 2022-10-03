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
          myMap.panTo(place, { flying: true });
        } else {
          return false;
        }
      });
    }
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
  $('.js-popup-link').magnificPopup({
    mainClass: 'mfp-fade'
  });

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

  // // Табы
	// function tabs() {
  //   const tabs = $('.js-tabs');
	// 	if (tabs.length) {
	// 		tabs.each( function () {
  //       let triggers = $(this).find('.js-tabs-trigger');
  //       let contents = $(this).find('.js-tabs-content');
  //       let time = 300;
  //       triggers.on('click', function () {
  //         let trigger = $(this);
  //         let content = $('.js-tabs-content[data-href="' + trigger.attr('href') +'"]');
  //         if (!trigger.hasClass('active')) {
  //           triggers.removeClass('active');
  //           trigger.addClass('active');
  //           contents.hide();
  //           contents.removeClass('open');
  //           content.fadeIn(time, function () {
  //             $(this).addClass('open');
  //           });
  //         }else {
  //           return false;
  //         }
  //       })
  //     });
	// 	}
	// }
	// tabs();

  // // Аккордеон
  // function accordion(accordion, settings) {
  //   if (accordion.length) {
  //     $('.js-accordion').each(function () {
  //       let currentAccordion = $(this);
  //       let trigger = currentAccordion.find('.js-accordion-trigger');
  //       let content = $('.js-accordion-content');
  //       let time = 300;
  //       trigger.on('click', function () {
  //         let currentTrigger = $(this);
  //         let data = currentTrigger.data('content');
  //         if (!currentTrigger.hasClass('active')) {
  //           if (settings) {
  //             content.stop().slideUp(
  //               time,
  //               function () {
  //                 $(this).removeClass('open');
  //               }
  //             )
  //             trigger.removeClass('active');
  //           };
  //           currentTrigger.addClass('active');
  //           currentAccordion.find('#' + data).stop().slideDown(
  //             time,
  //             function () {
  //               $(this).addClass('open')
  //             }
  //           );
  //         } else {
  //           currentTrigger.removeClass('active');
  //           currentAccordion.find('#' + data).stop().slideUp(
  //             time,
  //             function () {
  //               $(this).removeClass('open')
  //             }
  //           );
  //         }
  //       })
  //     })
  //   }
  // }
  // accordion($('.js-accordion'), true);

  // // Sticky Sidebar | Липкий сайдбар
  // if ($('.js-sticky').length) {
  //   var stickySidebar = new StickySidebar('.js-sticky', {
  //     topSpacing: 65,
  //     bottomSpacing: 10,
  //     containerSelector: false,
  //     innerWrapperSelector: '.sidebar__inner',
  //     resizeSensor: true,
  //     stickyClass: 'is-affixed',
  //     minWidth: 0
  //   });
  // }

  // // Кнопка скролла вверх страницы
  // function scrollUp() {
  //   const btn = $('.js-scrollup');
  //   $(window).scroll(function () {
  //     btnShowFade();
  //   });
  //   function btnShowFade() {
  //     if ($(this).scrollTop() > 200) {
  //       btn.addClass('show');
  //     } else {
  //       btn.removeClass('show');
  //     }
  //   }
  //   btnShowFade();
  //   btn.click(function () {
  //     $('body,html').animate({
  //       scrollTop: 0
  //     }, 500);
  //     return false;
  //   });
  // }
  // scrollUp();

  // // Показать еще в фильтрах
  // function showMoreFilters() {
  //   const list = $('.js-more-list');
  //   const btn = $('.js-more-btn');
  //   const count = 4;
  //   list.each(function () {
  //     $(this).find('li').each(function (index) {
  //       if (index > count - 1) {
  //         $(this).fadeOut();
  //       }
  //     })
  //   })
  //   btn.on('click', function () {
  //     $(this).fadeOut();
  //     $(this).parent().find($('.js-more-list li')).fadeIn();
  //   })
  // }
  // showMoreFilters();

  // // Очистить фильтр 
  // function clearFilter() {
  //   let clearBnt = $('.js-filters-clear');
  //   clearBnt.on('click', function () {
  //     $(this).closest('.filters').find('input').prop('checked', false);
  //   })
  // }
  // clearFilter();

  // // Изменение количества товара (плюс минус)
  // function counter(block) {
  //   const counter = document.querySelectorAll(block);
  //   if (counter) {
  //     counter.forEach(element => {
  //       const minus = element.querySelector('.js-counter-minus');
  //       const plus = element.querySelector('.js-counter-plus');
  //       const inputWrap = element.querySelector('.js-counter-input');
  //       const input = inputWrap.querySelector('input');
  //       plus.addEventListener('click', () => {
  //         if (Number(input.value) < 999) {
  //           input.value = Number(input.value) + 1;
  //         }
  //       })
  //       minus.addEventListener('click', () => {
  //         if (Number(input.value) > 1) {
  //           input.value = Number(input.value) - 1;
  //         }
  //       })
  //       input.addEventListener('keyup', () => {
  //         input.value = input.value.replace(/[^\d]/g, '');
  //       })
  //       input.addEventListener('blur', () => {
  //         if (input.value == '' || input.value == 0) {
  //           input.value = 1;
  //         }
  //       })
  //     });
  //   }
  // }
  // counter('.js-counter');

  // // noUiSlider || Ползунок выбора
  // if (document.getElementById('noUiSlider')) {
  //   const rangeSlider = document.getElementById('noUiSlider');
  //   const inputMin = document.getElementById('noUiSliderMin');
  //   const inputMax = document.getElementById('noUiSliderMax');
  //   let min = Number(rangeSlider.dataset.min);
  //   let max = Number(rangeSlider.dataset.max);
  //   let nowMin = Number(rangeSlider.dataset.nowmin);
  //   let nowMax = Number(rangeSlider.dataset.nowmax);
  //   console.log(nowMin,nowMax);
  //   noUiSlider.create(rangeSlider, {
  //     start: [nowMin, nowMax],
  //     connect: true,
  //     step: 10,
  //     range: {
  //       'min': min,
  //       'max': max
  //     }
  //   });
  //   rangeSlider.noUiSlider.on('update', function (values, handle) {
  //     if (handle) {
  //       inputMax.value = values[handle];
  //     } else {
  //       inputMin.value = values[handle];
  //     }
  //   });
  //   inputMin.addEventListener('change', function () {
  //     rangeSlider.noUiSlider.set([this.value, null]);
  //   });
  //   inputMax.addEventListener('change', function () {
  //     rangeSlider.noUiSlider.set([null, this.value]);
  //   });
  // };

}