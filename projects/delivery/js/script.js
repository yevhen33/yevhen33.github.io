$(document).ready(function(){

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.price-item__content').eq(i).toggleClass('price-item__content_active');
                $('.price-item__list').eq(i).toggleClass('price-item__list_active');
            })
        });
    };

    toggleSlide('.button_mini');
    toggleSlide('.button_back');
    
    $('.reviews-carusel').slick({
        speed: 1200,
        autoplay: true,
        autoplaySpeed: 3500,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/reviews/slayder-left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/reviews/slayder-right.png"></button>'   
      });

    function validateForm(form){
        $(form).validate({
            rules: {
              name: {
                required: true,
                minlength: 2
              },
              phone: "required",
              email: {
                required: true,
                email: true
              },
              text: {
                required: true,
                minlength: 10
              }
            },
            
            messages: {
              name: {
                required: "Введите свое имя",
                minlength: jQuery.validator.format("Введите минимум {0} символа!")
              },
              phone: "Введите свой номет телефона",
              email: {
                required: "Ведите почтовый ящик",
                email: "Неверно введен email"
              },
              text: {
                required: "Введите сообщение",
                minlength: jQuery.validator.format("Введите минимум {10} символа!")
              },
            }
        });
    };

    validateForm('.feed-form');
    validateForm('.feed-form_question');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $(window).scroll(function() {
      if ($(this).scrollTop() > 1200) {
          $('.pageup').fadeIn();
      } else {
          $('.pageup').fadeOut();
      }
    });
    $("a[href=#up]").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    }); 

    //Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
      });
    });
    
    function closeModal() {
      modal.classList.toggle('show');
      document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') == '') {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
        closeModal();
      }
    });

    // forms

    const forms = document.querySelectorAll('form');

    const messages = {
      loading: 'icons/form/spiner.svg',
      success: 'Скоро мы с Вами свяжемся!',
      failure: 'Что-то не так! Попробуйте позже'
    };

    forms.forEach(item => {
      postData(item);
    });

    function postData(form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = messages.loading;
        statusMessage.style.cssText = `
          display: block;
          margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage);

        const request = new XMLHttpRequest();
        request.open('POST', 'mailer/server.php');

        request.setRequestHeader('Content-type', 'application/json');
        const formData = new FormData(form);

        const obj = {};
        formData.forEach(function(value, key) {
          obj[key] = value;
        });

        const json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('load', () => {
          if (request.status === 200) {
            console.log(request.response);
            showThanksModal(messages.success);
            form.reset();
            statusMessage.remove();
          } else {
            showThanksModal(messages.failure);
          }
        });
      });
    }

    function showThanksModal(messages) {
      const prevModalDialog = document.querySelector('.modal__dialog');

      prevModalDialog.classList.add('hide');
      openModal();

      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${messages}</div>
        </div>
      `;

      document.querySelector('.modal').append(thanksModal);

      setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.remove('hide');
        prevModalDialog.classList.add('show');
        closeModal();
      }, 3000);
    }

});
 