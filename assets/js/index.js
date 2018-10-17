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

const navParent = document.querySelector('.primary-nav')
const navItems = document.querySelectorAll('.primary-nav__link')

navParent.addEventListener('click', function (e) {
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

// get the hash and scroll to it when coming from another page

setTimeout(function() {if (location.hash) {
  scrollSite(location.hash);
  window.location.hash = '';
}}, 10);
