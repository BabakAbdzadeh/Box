// export const observeContainer = () => {
//     const container = document.querySelector('.product-tables-container');

//     const observer = new MutationObserver((mutations) => {
//         // Whenever a new node is added to the container:
//         mutations.forEach((mutation) => {
//             if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
//                 // Scroll the container to the left (to show the new item)
//                 container.scrollLeft = container.scrollWidth - container.clientWidth;
//             }
//         });
//     });

//     observer.observe(container, { childList: true });
// }

// function expandingTable() {
//     const panels = document.getElementsByClassName('.product-table')
//     console.log(panels);
//     if (panels.length > 0) {
//         console.log("clicked");
//         panels.forEach(panel => {
//             panel.addEventListener('click', () => {
//                 removeActiveClasses();
//                 panel.classList.add('active');
//             })
//         })

//         function removeActiveClasses() {
//             panels.forEach(panel => {
//                 panel.classList.remove('active');
//             })
//         }

//     }
// }



// MVC design pattern

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("product-table");


    // This is check to exit the function without trying more! (For initial state of the app)
    if (!slides || slides.length === 0) {
        console.error("No slides found");
        return;
    }

    //   Prev on First and Next on Last slide's controll
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

// numberText Control
function numberText() {
    var numberTexts = document.getElementsByClassName("numbertext");

    if (numberTexts.length > 0) {
        numberTexts[slideIndex - 1].innerHTML = `Table: ${slideIndex}/${numberTexts.length}`;
    }
}


export { plusSlides, numberText };



