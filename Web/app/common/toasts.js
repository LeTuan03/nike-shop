const toasts = document.querySelector("#toasts")
const close = document.querySelector("#close")
const responsiveIcon = document.querySelector("#responsive-icon")
responsiveIcon.addEventListener("click",()=> {
    toasts.style.display = "block"
})
close.addEventListener("click",()=> {
    toasts.style.display = "none"
})
