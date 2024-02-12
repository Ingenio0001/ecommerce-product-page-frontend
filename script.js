// variable declarations
const closeIcon = document.querySelector("[alt=icon-close]");
const mobileCloseIcon = document.querySelector("[alt=mobile-icon-close]");
const modalContainer = document.querySelector(".modal-container");
const cartContainer = document.querySelector(".cart-container");
const cartDropdown = document.querySelector("#cart-dropdown");
const mobileCartDropdown = document.querySelector("#mobile-cart-dropdown");
const cartIcon = document.querySelectorAll("[alt=icon-cart]");
const thumbnailImages = document.querySelectorAll(".thumbnails img");
const mainImage = document.querySelector("#main-image");
const mobileMainImage = document.querySelector(".mobile-main-image > img");
const cartCount = document.querySelector("#cart-count");
const minusIcon = document.querySelector("[alt=icon-minus]");
const plusIcon = document.querySelector("[alt=icon-plus]");
const cartCounter = document.querySelector(".cart-counter");
const addToCartBtn = document.querySelector("#cart-btn");
const cartPriceP = document.querySelector("#cart-price-p");
const mobileCartPriceP = document.querySelector("#mobile-cart-price-p");
const cartDetails = document.querySelector("#cart-details");
const mobileCartDetails = document.querySelector("#mobile-cart-details");
const emptyCart = document.querySelector("#empty-cart");
const mobileEmptyCart = document.querySelector("#mobile-empty-cart");
const deleteIcon = cartDetails.querySelector("[alt=icon-delete]");
const mobileDeleteIcon = mobileCartDetails.querySelector("[alt=icon-delete]");
const modalMainImage = modalContainer.querySelector(".modal > div > img");
const modalThumbnailImages = modalContainer.querySelectorAll(".modal-thumbnails div");
const navigationButtons = modalContainer.getElementsByClassName("navigation-button");
const mmiNavButtons = document.querySelectorAll(".mmi-nav-button");
const mobileNav = document.querySelector(".mobile-nav");
const iconMenu = document.querySelector("#icon-menu");
const mobileCartIconSvgPath = document.querySelector(".cart-container > svg");

// sets variable to 0 on page load
let cartItems = 0;

// sets cartCounter to display none when at 0
if (cartItems < 1) {
    cartCounter.style.display = "none";
}

// opens mobile navigation on click of menu icon
iconMenu.addEventListener('click', () => {
    mobileNav.style.display = "block";
})

// closes mobile navigation on click of mobile navigation close icon
mobileCloseIcon.addEventListener("click", () => {
    mobileNav.style.display = "none";
})

// close cart dropdown on click of modal close icon
closeIcon.addEventListener("click", () => {
    modalContainer.style.display = "none";
})

// function to change svg path fill atribute. to be called in another function
function changeCartIconSvgPathFill() {
    // Check if mobileCartIconSvgPath exists
    if (mobileCartIconSvgPath) {
        if (
            cartDropdown.style.display === "block" ||
            mobileCartDropdown.style.display === "block"
        ) {
            // Select the path element inside the SVG
            var pathElement = mobileCartIconSvgPath.querySelector("path");
            // Change the fill color
            if (pathElement) {
                pathElement.setAttribute("fill", "black");
            } else {
                console.error("Path element not found inside mobileCartIconSvgPath");
            }
        } else {
            console.log("Dropdowns are not displayed");
        }
    } else {
        console.error("mobileCartIconSvgPath is not defined");
    }
}

// opens and closes cartDropdown on click of cartIcon for both mobile cart and desktop cart
cartIcon.forEach(cartButton => {
    cartButton.addEventListener("click", () => {
        if (window.innerWidth > 850) {
            if (cartDropdown.style.display === "block") {
                cartDropdown.style.display = "none";
            } else {
                cartDropdown.style.display = "block";
                mobileCartDropdown.style.display = "none"; 
            }
        } else {
            if (mobileCartDropdown.style.display === "block") {
                mobileCartDropdown.style.display = "none";
            } else {
                mobileCartDropdown.style.display = "block";
                cartDropdown.style.display = "none"; 
            }
        }
        // console.log(`${cartDropdown.style.display} ${mobileCartDropdown.style.display}`);
        // console.log(window.getComputedStyle(mobileCartIconSvgPath).getPropertyValue('display'));
        // console.log(mobileCartIconSvgPath.querySelector("path").getAttribute('fill'));


        // changeCartIconSvgPathFill();
    })
})

// eexperimental function to close the cartDropdown on click of the window but not on the cartDropdown itself
// window.onclick = function(event) {
//     if (
//         event.target.alt !== "icon-cart" &&
//         event.target.parentElement.id.indexOf("cart") < 0
//     ) {
//         cartDropdown.style.display ="none";
//     }
// }

// closes cartDropdown on click of window but not on the cartDropdown itself
window.addEventListener('click', function(event) {
    if (
        !event.target.closest('.cart-container') 
        && !event.target.closest('#mobile-cart-dropdown')) {
            cartDropdown.style.display = "none";
            mobileCartDropdown.style.display = "none";
    }
})

// dynamically changes the mainImage and mobileMainImage simulteanously when thumbnails are being clicked and also adding the .active-thumbnail to the clicked thumbnail
for (let i = 0; i < thumbnailImages.length; i++) {
    const thumbnails = thumbnailImages[i];
    thumbnails.onclick = () => {
        mainImage.src = thumbnails.src.replace("-thumbnail", "");
        mobileMainImage.src = thumbnails.src.replace("-thumbnail", "");

        for (let i = 0; i < thumbnailImages.length; i++) {
            thumbnailImages[i].classList.remove("active-thumbnail");
        }
    
        thumbnails.classList.add("active-thumbnail");
    }
}

// handles the minus icon to dynamically update the cartItems and the cartCount value
minusIcon.addEventListener("click", () => {
    if (cartItems > 0) {
        cartItems -= 1;
        cartCount.innerText = cartItems;
    }
})

// handles the plus icon to dynamically update the cartItems and the cartCount value
plusIcon.addEventListener("click", () => {
    if (cartItems >= 0) {
        cartItems++;
        cartCount.innerText =cartItems;
    }
})

// updates cartDetails, cartCounter and cartPriceP value and also their mobile counterparts value on click on the addToCartBtn 
addToCartBtn.onclick = function () {
    if (cartItems !== 0) {
        cartCounter.style.display = "inline-block";
        cartCounter.innerText = cartItems;
        cartDetails.style.display = "block";
        mobileCartDetails.style.display = "block";
        emptyCart.style.display = "none";
        mobileEmptyCart.style.display = "none";
        cartPriceP.innerHTML = `$125.00 x ${cartItems} <span>$${(125 * cartItems).toFixed(2)}</span>`;
        mobileCartPriceP.innerHTML = `$125.00 x ${cartItems} <span>$${(125 * cartItems).toFixed(2)}</span>`;
    } else {
        cartCounter.style.display = "none";
        cartDetails.style.display = "none";
        mobileCartDetails.style.display = "none";
        emptyCart.style.display = "block";
        mobileEmptyCart.style.display = "block";
    }
}

// resets cartItems and cartCounter and cartDetails values and their mobile counterparts on click of the desktop deleteIcon and also displays emptyCart on said reset for both desktop and mobile
deleteIcon.onclick = () => {
    cartItems = 0;
    cartCount.innerText = cartItems;
    cartCounter.style.display = "none";
    cartDetails.style.display = "none";
    mobileCartDetails.style.display = "none";
    emptyCart.style.display = "block";
    mobileEmptyCart.style.display = "block";
}

// resets cartItems and cartCounter and cartDetails values and their mobile counterparts on click of the mobileDeleteIcon and also displays emptyCart on said reset for both desktop and mobile
mobileDeleteIcon.onclick = () => {
    cartItems = 0;
    cartCount.innerText = cartItems;
    cartCounter.style.display = "none";
    cartDetails.style.display = "none";
    mobileCartDetails.style.display = "none";
    emptyCart.style.display = "block";
    mobileEmptyCart.style.display = "block";   
}

// shows modal on click of the mainImage
mainImage.onclick = () => {
    modalContainer.style.display = "flex";
}

// updates the .active-thumbnail on click of the modalThumbnailImages to the clicked image and dynamically updates the modalMainImage based on the clicked modalThumbnailImages 
for (let i = 0; i < modalThumbnailImages.length; i++) {
    const thumbnails = modalThumbnailImages[i];
    thumbnails.onclick = () => {
        modalMainImage.src = thumbnails.firstElementChild.src.replace("-thumbnail", "");

        for (let i = 0; i < thumbnailImages.length; i++) {
            modalThumbnailImages[i].firstElementChild.classList.remove("active-thumbnail");
        }
    
        thumbnails.firstElementChild.classList.add("active-thumbnail");
    }
}

// handles the function of the mobile previous button  and changes both the mobileMainImage and mainImage accordingly. Also updates the .active-thumbnail to reflect the currently displayed image on the desktop
mmiNavButtons[0].onclick = () => {
    let currentImagePosition = Array.from(thumbnailImages).findIndex((thumb) => thumb.className === "active-thumbnail");

    if (currentImagePosition === 0) {
        currentImagePosition = 4;
    }

    if (currentImagePosition > 0) {
        for (let i = 0; i < thumbnailImages.length; i++) {
            thumbnailImages[i].classList.remove("active-thumbnail");
        }
        mobileMainImage.src = thumbnailImages[currentImagePosition - 1].src.replace("-thumbnail", "");
        mainImage.src = thumbnailImages[currentImagePosition - 1].src.replace("-thumbnail", "");

        thumbnailImages[currentImagePosition -1].classList.add("active-thumbnail");
    }
}

// handles the function of the mobile next button  and changes both the mobileMainImage and mainImage accordingly. Also updates the .active-thumbnail to reflect the currently displayed image on the desktop
mmiNavButtons[1].onclick = () => {
    let currentImagePosition = Array.from(thumbnailImages).findIndex((thumb) => thumb.className === "active-thumbnail");

    if (currentImagePosition === 3) {
        currentImagePosition = -1;
    }

    if (currentImagePosition < 3) {
        for (let i = 0; i < thumbnailImages.length; i++) {
            thumbnailImages[i].classList.remove("active-thumbnail");
        }
        mobileMainImage.src = thumbnailImages[currentImagePosition + 1].src.replace("-thumbnail", "");
        mainImage.src = thumbnailImages[currentImagePosition + 1].src.replace("-thumbnail", "");

        thumbnailImages[currentImagePosition + 1].classList.add("active-thumbnail");
    }
}

// handles the function of the modal previous button  and changes the modalMainImage accordingly. Also updates the .active-thumbnail to reflect the currently displayed image on the modalThumbnailImages
navigationButtons[0].onclick = () => {
    let currentImagePosition = Array.from(modalThumbnailImages).findIndex((thumb) => thumb.firstElementChild.className === "active-thumbnail");

    if (currentImagePosition === 0) {
        currentImagePosition = 4;
    }

    if (currentImagePosition > 0) {
        for (let i = 0; i < modalThumbnailImages.length; i++) {
            modalThumbnailImages[i].firstElementChild.classList.remove("active-thumbnail");
        }
        modalMainImage.src = modalThumbnailImages[currentImagePosition - 1].firstElementChild.src.replace("-thumbnail", "");

        modalThumbnailImages[currentImagePosition - 1].firstElementChild.classList.add("active-thumbnail");
    }

}

// handles the function of the modal next button  and changes the modalMainImage accordingly. Also updates the .active-thumbnail to reflect the currently displayed image on the modalThumbnailImages
navigationButtons[1].onclick = () => {
    let currentImagePosition = Array.from(modalThumbnailImages).findIndex((thumb) => thumb.firstElementChild.className === "active-thumbnail");

    if (currentImagePosition === 3) {
        currentImagePosition = -1;
    }

    if (currentImagePosition < 3) {
        for (let i = 0; i < modalThumbnailImages.length; i++) {
            modalThumbnailImages[i].firstElementChild.classList.remove("active-thumbnail");
        }
        modalMainImage.src = modalThumbnailImages[currentImagePosition + 1].firstElementChild.src.replace("-thumbnail", "");

        modalThumbnailImages[currentImagePosition + 1].firstElementChild.classList.add("active-thumbnail");
    }

}

// dynamically updates which cartDropdown should show between the mobile and desktop versions on resize of window also, hides the mobileNav when the window is resized to desktop mode also, hides the modalContainer when window is resized to mobile mode
window.onresize = () => {
    let screenSize = window.innerWidth;
    if (
        screenSize <= 850 && 
        cartDropdown.style.display === "block"
        ) {
            cartDropdown.style.display = "none";
            mobileCartDropdown.style.display = "block";
    } else if (
        screenSize > 850 &&
        mobileCartDropdown.style.display === "block"
        ) {
            mobileCartDropdown.style.display = "none";
            cartDropdown.style.display = "block";
        }

    if (screenSize > 850) {
        mobileNav.style.display = "none";
    }
    
    if (screenSize < 850) {
        modalContainer.style.display = "none";
    }    
}
