/*
    CC-BY-SA

    Published originally at github.com/TeeKups/js-slideshow

    Copyright (c) 2024 Juhani Kupiainen. All rights reserved.
*/

(() => {
    const initSlideshow = (slideshow) => {
        const slides = [...slideshow.children];
        slides.forEach((slide, index) => {
            const bg = document.createElement("img");
            // 1px transparent png image
            bg.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NgAAIAAAUAAR4f7BQAAAAASUVORK5CYII=");
            slide.insertBefore(bg, slide.firstChild)
        })

        const controls = document.createElement("div");
        controls.classList.add("slideshow-controls");
        const prevButton = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const nextButton = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        prevButton.classList.add("prev");
        nextButton.classList.add("next");

        const slideIndicatorsContainer = document.createElement("div");
        slideIndicatorsContainer.classList.add("slideshow-indicator-container")

        const slideIndicators = slides.map((slide) => {
            const indicator = document.createElement("div");
            indicator.classList.add("slideshow-indicator");
            return indicator;
        })
        slideIndicators.forEach(indicator => slideIndicatorsContainer.appendChild(indicator));
        if (slideIndicators.length > 0) {
            slideIndicators[0].classList.add("active");
        }

        controls.append(slideIndicatorsContainer);

        const fontAwesomeLisence = "Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc."
        svgPath = "M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"

        Array(prevButton, nextButton).forEach(element => {
            element.classList.add("slide-button");
            element.setAttribute("viewBox", "0 0 448 512");
            element.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink")
            element.setAttribute("data-lisence", fontAwesomeLisence)
            path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", svgPath);
            element.appendChild(path);
            controls.appendChild(element);
        });

        slideshow.appendChild(controls);

        const fixIndex = (index) => {
            if (index > slides.length-1) {
                return 0;
            } else if (index < 0) {
                return slides.length-1;
            } else {
                return index;
            }
        }

        const lazyLoad = index => {
            for (let i = index-1; i <= index +1; i++) {
                console.log(fixIndex(i))
                const slide = slides[fixIndex(i)];
                if (slide.hasAttribute("data-background")) {
                    const background = slide.getAttribute("data-background");
                    slide.firstChild.setAttribute("src", background);
                    slide.removeAttribute("data-background");
                }
            }
        }

        const showSlide = (n) => {
            slideIndicators.forEach((slide, index) => {
                slide.classList.remove("active");
                if (n == index) {
                    slide.classList.add("active");
                }
            });

            n = fixIndex(n);
            slides.forEach((slide) => {
                slide.style.transform = `translateX(${-(n)*100}%)`;
            });
            lazyLoad(n);
        }

        let currentSlide = 0
        const nextSlide = () => {
            currentSlide++;
            if (currentSlide > slides.length-1) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        }
        prevButton.addEventListener("click", event => prevSlide());

        const prevSlide = () => {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = slides.length-1;
            }
            showSlide(currentSlide);
        }
        nextButton.addEventListener("click", event => nextSlide());

        showSlide(0);
    }

    const slideshows = document.querySelectorAll(".slideshow");
    slideshows.forEach(slideshow => initSlideshow(slideshow));
})();
