// import modules
import {serialize} from '../js/modules/serialize'

const errMsgCheck = `already subscribed`

// form submission

if (document.querySelector('.form__mc-js-rumbar-signup')) {
  const form = document.querySelector('.form__mc-js-rumbar-signup')
  const formInputs = form.querySelectorAll('input')
  const formSubmitButton = form.querySelector('.form__btn--submit')
  const emailInput = form.querySelector('.form__input--email')
  const url = `https://maddafella.us13.list-manage.com/subscribe/post-json?u=3227b92f0c70395f6cb82d51b&amp;id=50bb67b678&c=callBack`
  let successMessageDiv = document.querySelector('.fc-news__header')


  formSubmitButton.addEventListener('click', (e) => {
    e.preventDefault()

    // Create & add post script to the DOM
    const script = document.createElement('script');
    script.src = `${url}&${serialize(form)}`;
    document.body.appendChild(script);

    const callBack = 'callBack'

    window[callBack] = (data) => {
      delete window[callBack]
      document.body.removeChild(script)

      if (data.result === 'success') {
        emailInput.placeholder = ''
        emailInput.value = ''
        emailInput.placeholder = data.msg
        formSubmitButton.setAttribute('disabled', true)

        //reset form values
        formInputs.forEach(input => input.value = '')

      } else if (data.msg.includes(errMsgCheck)) {
        const returnMsg = `You're already subscribed`
        emailInput.placeholder = ''
        emailInput.value = ''
        emailInput.placeholder = returnMsg

      } else {
        const returnMsg = `Too many attempts with this email`
        emailInput.placeholder = ''
        emailInput.value = ''
        emailInput.placeholder = returnMsg
      }
    }
  })
}

if (document.querySelector('.form__mc-js-rumguide-signup')) {
  const form = document.querySelector('.form__mc-js-rumguide-signup')
  const formInputs = form.querySelectorAll('input')
  const emailInput = document.getElementById('mce-EMAIL')
  const formSubmitButton = form.querySelector('.form__btn--submit')
  const url = `https://maddafella.us13.list-manage.com/subscribe/post-json?u=3227b92f0c70395f6cb82d51b&amp;id=27662d09cf&c=callBack`

  formSubmitButton.addEventListener('click', (e) => {
    e.preventDefault()

    // Create & add post script to the DOM
    const script = document.createElement('script');
    script.src = `${url}&${serialize(form)}`;
    document.body.appendChild(script);

    const callBack = 'callBack'

    window[callBack] = (data) => {
      delete window[callBack]
      document.body.removeChild(script)

      if (data.result === 'success') {
        emailInput.placeholder = ''
        emailInput.placeholder = data.msg
        formSubmitButton.setAttribute('disabled', true)
        formSubmitButton.classList.add('disabled')

        //reset form values
        formInputs.forEach(input => input.value = '')
      } else if (data.msg.includes(errMsgCheck)) {
        const returnMsg = `You're already subscribed`
        emailInput.placeholder = ''
        emailInput.value = ''
        emailInput.placeholder = returnMsg
        formSubmitButton.setAttribute('disabled', true)
        formSubmitButton.classList.add('disabled')
      } else {
        const returnMsg = `Too many attempts with this email`
        emailInput.placeholder = ''
        emailInput.value = ''
        emailInput.placeholder = returnMsg
        formSubmitButton.setAttribute('disabled', true)
        formSubmitButton.classList.add('disabled')
      }
    }
  })
}

// move this to the tabs module
if (document.querySelector('#index')) {
  (function () {
    const tabParent = document.querySelector('.event-tabs')
    const tabLinksArr = Array.from(document.querySelectorAll('.event-tab'))
    const eventTabsArr = Array.from(document.querySelectorAll('.event'))

    tabParent.addEventListener('click', (e) => {

      tabLinksArr.forEach((link) => {
        link.classList.remove('is-active')
      })
      e.target.classList.add('is-active')
      e.stopPropagation()

      showTab()
    })

    const showTab =  () => {
      const activeTab = document.querySelector('.event-tab.is-active')
      const tabData = activeTab.dataset.tab

      eventTabsArr.forEach((tab) => {
        tab.classList.remove('is-active')
        if (tab.id === tabData) {
          tab.classList.add('is-active')
        } else {
          tab.classList.remove('is-active')
        }
      })
    }
  })()
}

if (document.querySelector('.md-copy')) {
  const linksArr = document.querySelectorAll('.md-copy a[href^="http://"], a[href^="https://"]')

  linksArr.forEach((link) => {
    link.setAttribute('target', '_blank')
  })
}

//scroll nav

var scrollSite = function(scrollTo){
  var scrollTo = scrollTo.substring(8);

  if (document.querySelector(`#${scrollTo}`)) {
    const top = document.querySelector(`#${scrollTo}`).offsetTop

    window.scrollTo({
      top: top,
      behavior: 'smooth',
    })
  }
}

const navItems = document.querySelectorAll('a[href^="#scroll"]')

navItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    const scrollTo = e.target.href.slice(e.target.href.indexOf('#'))

    if (scrollTo.length) {
      e.preventDefault()

      if (window.location.pathname === '/') {
        scrollSite(scrollTo)
      } else {
        window.location.href = `/${scrollTo}`
      }
    }
  })
})

// get the hash and scroll to it when coming from another page

setTimeout(function() {if (location.hash) {
  scrollSite(location.hash);
  window.location.hash = '';
}}, 10);

// lightbox-gallery
  if (document.querySelector('#lightbox-gallery')) {
    const body = document.querySelector('body')
    const galleryParent = document.querySelector('.mf-gallery')
    const galleryImgArr = Array.from(document.querySelectorAll('.lightbox-img'))
    const lightboxGallery = document.querySelector('#lightbox-gallery')
    const lightboxImg = document.querySelector('.lightbox-gallery__img')
    const imagePathArr = galleryImgArr.map(image => image.dataset.img)
    const nextBtn = document.querySelector('.next')
    const prevBtn = document.querySelector('.prev')
    const closeBtn = document.querySelector('.lightbox__close')

    const setImage = (e) => {
      lightboxImg.setAttribute('src', e.target.dataset.img)
      lightboxImg.setAttribute('data-img', e.target.dataset.img)
    }

    const nextImg = () => {
      const currentImg = document.querySelector('.lightbox-gallery__img')
      let currentImgPath = currentImg.dataset.img
      let currentIndex = imagePathArr.indexOf(currentImgPath)
      let nextImgPath = currentIndex === 6 ? 0 : currentIndex + 1

      currentImg.setAttribute('src', imagePathArr[nextImgPath])
      currentImg.setAttribute('data-img', imagePathArr[nextImgPath])
    }

    const prevImg = () => {
      const currentImg = document.querySelector('.lightbox-gallery__img')
      let currentImgPath = currentImg.dataset.img
      let currentIndex = imagePathArr.indexOf(currentImgPath)
      let prevImgPath = currentIndex === 0 ? 6 : currentIndex - 1

      currentImg.setAttribute('src', imagePathArr[prevImgPath])
      currentImg.setAttribute('data-img', imagePathArr[prevImgPath])
    }

    closeBtn.addEventListener('click', () => {
      lightboxGallery.classList.add('is-hidden')
      lightboxGallery.classList.remove('is-shown')
      body.classList.remove('modal-shown')
    })

    nextBtn.addEventListener('click', () => {
      nextImg()
    })

    prevBtn.addEventListener('click', () => {
      prevImg()
    })

    galleryParent.addEventListener('click', (e) => {

      setImage(e)

      if (lightboxGallery.classList.contains('is-hidden')) {
        lightboxGallery.classList.add('is-shown')
        lightboxGallery.classList.remove('is-hidden')
        body.classList.add('modal-shown')
      } else {
        lightboxGallery.classList.add('is-hidden')
        lightboxGallery.classList.remove('is-shown')
        body.classList.remove('modal-shown')
      }
    })
  }
