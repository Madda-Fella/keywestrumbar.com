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

    showTab =  () => {
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
      console.log(e.target)
      lightboxImg.setAttribute('src', e.target.dataset.img)
      lightboxImg.setAttribute('data-img', e.target.dataset.img)
    }

    const nextImg = () => {
      const currentImg = document.querySelector('.lightbox-gallery__img')
      let currentImgPath = currentImg.dataset.img
      let currentIndex = imagePathArr.indexOf(currentImgPath)
      let nextImgPath = currentIndex === 6 ? 0 : currentIndex + 1
      console.log(currentIndex)
      console.log(imagePathArr[currentIndex + 1])

      currentImg.setAttribute('src', imagePathArr[nextImgPath])
      currentImg.setAttribute('data-img', imagePathArr[nextImgPath])
    }

    const prevImg = () => {
      const currentImg = document.querySelector('.lightbox-gallery__img')
      let currentImgPath = currentImg.dataset.img
      let currentIndex = imagePathArr.indexOf(currentImgPath)
      let prevImgPath = currentIndex === 0 ? 6 : currentIndex - 1
      console.log(currentIndex)
      console.log(imagePathArr[currentIndex - 1])

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
