
//focus the pdf element regularly to catch events from that element. Otherwise copy protection does not work
setInterval(() => {
  document.activeElement?.focus()
}, 200);

//prevent selecting all text, because this messes up the focus css
document.addEventListener("keydown", event => {
 if(event.key == 'a' && event.ctrlKey) {
   event.preventDefault()
 }
})
