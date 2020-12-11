 const body = document.querySelector('.body');
 const main = document.querySelector('.main');
 const header = document.querySelector('.header');
 
//tabs

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelector('.tabs');
  const tabsBtn = document.querySelectorAll('.tabs__item');
  const tabsContent = document.querySelectorAll('.tabs__content');

  if (tabs) {
    tabsBtn.forEach((element) => {
    element.addEventListener('click', function () {
      const tabsPath = element.dataset.tabsPath;
      tabsHandler(tabsPath);
    });
});

  }
    const tabsHandler = (path) => {
    tabsBtn.forEach(el => {el.classList.remove('tabs__item_active')});
    document.querySelector(`[data-tabs-path="${path}"]`).classList.add('tabs__item_active');
    
    tabsContent.forEach(el => {el.classList.remove('tabs__content_active', 'fade-in-top')});
    document.querySelector(`[data-tabs-target="${path}"]`).classList.add('tabs__content_active', 'fade-in-top');
  };
});

//slider

// const mySwiper = new Swiper('.shops__container', {
//   direction: 'vertical',
//   loop: true,
//   navigation: {
//     nextEl: '.shops__next',
//     prevEl: '.shops__prev',
//   },
  // effect: 'coverflow',
  // coverflowEffect: {
  //   rotate: 30,
  //   slideShadows: true,
  //   stretch: 300,
  // },
// });

// const mySwiperShops = new Swiper('.shops__body', {
//   direction: 'horizontal',
//   loop: true,
//   navigation: {
//     nextEl: '.text-shops__btn',
//   }
// });

var swiperH = new Swiper('.swiper-container-h', {
      spaceBetween: 50,
      navigation: {
          nextEl: '.text-shops__btn',
        }
    });
    var swiperV = new Swiper('.swiper-container-v', {
      direction: 'vertical',
      touchRatio: 0,
      spaceBetween: 100,
      slidesPerView: 1,
      enteredSlides: true,
        navigation: {
        nextEl: '.shops__next',
        prevEl: '.shops__prev',
      },
    });

//accordion

let accordionHeight = document.querySelector('.accordion').offsetHeight;

function adaptiveHeight() {
  document.querySelector('.questions__inner').style.minHeight = `${accordionHeight + 80}px`;
}

adaptiveHeight();


document.querySelectorAll('.accordion-item__trigger').forEach((item) =>
  item.addEventListener('click', () => {
    const parent = item.parentNode;

    if (parent.classList.contains('accordion-item_active')) {
      parent.classList.remove('accordion-item_active');
    } else {
      document.querySelectorAll('.accordion-item').forEach((child) => child.classList.remove('accordion-item_active'));
      parent.classList.add('accordion-item_active');
    }
  })
)

document.addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
   
    if (target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') == 'modal') {
        if (target.hasAttribute('data-target')) {
            var m_ID = target.getAttribute('data-target');
            document.getElementById(m_ID).classList.add('open');
            body.classList.add('locked');
            header.classList.add('blur');
            main.classList.add('blur');
            validateForms('.modal-form', { tel: { required: true } }, '.thanks-popup', 'send goal');
            e.preventDefault();
        }
    }
    if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'modal') || target.classList.contains('modal')) {
        var modal = document.querySelector('[class="modal open"]');
        modal.classList.remove('open');
        body.classList.remove('locked');
        header.classList.remove('blur');
        main.classList.remove('blur');
        e.preventDefault();
    }
}, false);


//forms

const phoneInput = document.querySelectorAll('input[type="tel"]'),
  im = new Inputmask('+7 (999) 999-99-99');
  im.mask(phoneInput);

let validateForms = function (selector, rules, successModal, yaGoal) {
  new window.JustValidate(selector, {
    rules: rules,
    messages: {
      name: {
            required: 'Обязательное поле'
      },
      tel: {
         required: 'Обязательное поле'
      }
    },
    submitHandler: function (form) {
      let formData = new FormData(form);

      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            alert('Ваши данные успешно отправлены')
          }
        }
      }
      xhr.open('POST', 'mail.php', true)
      xhr.send(formData);
      form.reset();
    }
  });
}

validateForms('.form', { tel: { required: true } }, '.thanks-popup', 'send goal');