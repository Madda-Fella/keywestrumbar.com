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
