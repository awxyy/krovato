// Строгий режим
"use strict"
// Touch Screen?
const isTouchScreen = window.matchMedia("(any-hover:none)").matches
window.addEventListener('load', windowLoaded)
function windowLoaded() {
	// hero slider
	const heroSwiper = new Swiper('.hero__swiper', {
		// Optional parameters
		loop: true,
		autoplay: {
			delay: 4000,
		  },
		// If we need pagination
		pagination: {
		clickable: true,
		  el: '.hero__swiper-pagination',
		},
	  
		// Navigation arrows
		navigation: {
		  nextEl: '.hero__swiper-button-next',
		  prevEl: '.hero__swiper-button-prev',
		}
	  
	  });
	// sale slider
	const saleSwiper = new Swiper('.sale__swiper', {
		// Optional parameters
		slidesPerView: 3,
		spaceBetween: 30,
		freeMode: true,
		loop: true,
		autoplay: {
			delay: 4000,
		},
		
	
		// Navigation arrows
		navigation: {
		nextEl: '.sale__swiper-button-next',
		prevEl: '.sale__swiper-button-prev',
		},
		breakpoints: {
			// when window width is >= 320px
			320: {
				slidesPerView: 1.2,
				spaceBetween: 10
			},
			// when window width is >= 480px
			470: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			// when window width is >= 640px
			800: {
				slidesPerView: 3,
				spaceBetween: 30
			}
		}
	});

	// news slider
	const newsSwiper = new Swiper('.news__swiper', {
		// Optional parameters
		slidesPerView: 3,
		spaceBetween: 30,
		freeMode: true,
		loop: true,
		autoplay: {
			delay: 4000,
		},
		
	
		// Navigation arrows
		navigation: {
		nextEl: '.news__swiper-button-next',
		prevEl: '.news__swiper-button-prev',
		},
		breakpoints: {
			// when window width is >= 320px
			320: {
				slidesPerView: 1.2,
				spaceBetween: 15
			},
			
			950: {
				slidesPerView: 2.4,
				spaceBetween: 20
			},
			1050: {
				slidesPerView: "3",
				spaceBetween: 30,
			}
		}
	});
	// Reviews Slider
	const swiperReviews = new Swiper('.reviews__slider', {
		// Optional parameters
		// loop: true,
		slidesPerView: "auto",
		spaceBetween: 30,
		//freeMode: true,
		scrollbar: {
			el: ".reviews__scroll",
			dragClass: "reviews__drag-scroll",
			hide: false,
			dragSize: 50,
			draggable: true
		},
		
		breakpoints: {
			// when window width is >= 320px
			320: {
				slidesPerView: 1.2,
				spaceBetween: 5
			},
			
			950: {
				slidesPerView: 2.4,
				spaceBetween: 20
			},
			1050: {
				slidesPerView: "auto",
				spaceBetween: 30,
			}
		}
	});

	const maxWidth = +document.querySelector('.menu-footer').dataset.spollersInit || 600
	let keypressActions = (e) => {
		if (e.key === "Escape") {
			document.documentElement.classList.remove('catalog-open')
		}
	}
	document.addEventListener('keydown', keypressActions);
	let documentActions = (e) => {
		const targetElement = e.target

		if(targetElement.closest('.search-block__open')){
			const search = document.querySelector('.search-block__searh');
			search.classList.toggle('open')
		}
		if (targetElement.closest('.icon-menu')) {
			document.documentElement.classList.toggle('menu-open')
		}
		
		if (targetElement.closest('.menu-footer__title')) {
			if (window.innerWidth > maxWidth) {
				e.preventDefault()
			}else{
				const footerAdaptiveSpoiler =document.querySelector(".menu-footer__item[open]")
				if(footerAdaptiveSpoiler && footerAdaptiveSpoiler !== targetElement.closest(".menu-footer__item")){
					footerAdaptiveSpoiler.open=false;
				}
			}
		}
		if (isTouchScreen) {
			if (targetElement.closest('.items-catalog-header__more')) {
				const targetItem = targetElement.closest('.items-catalog-header__item')
				const targetActiveItem = document.querySelector('.items-catalog-header__item.--active')
				targetItem.classList.toggle('--active')
				
				if (targetItem !== targetActiveItem &&  targetActiveItem) {
					targetActiveItem.classList.remove('--active')
				}
			}
		}
		
		const switcherLang = document.querySelector(".switcher-lang__list");
		if (targetElement.closest(".switcher-lang__label")){
			switcherLang.classList.toggle("--visible")
		}
		const switcherPhone = document.querySelector(".list-phone-middle-header");
		const switcherPhoneCroos =document.querySelector(".middle-header__wrapper")
		if (targetElement.closest(".middle-header__wrapper")){
			switcherPhone.classList.toggle("--visible")
			switcherPhoneCroos.classList.toggle("_icon-r-hide");
		}
		if (targetElement.closest('.btn-catalog-header')) {
			const itemsCatalogMenu = document.querySelector('.items-catalog-header');
			document.documentElement.classList.toggle('catalog-open')
		} else if (!targetElement.closest('.items-catalog-header__wrapper')) {
			document.documentElement.classList.remove('catalog-open')
		}
	}
	let spollersInit = (footerSpollers, isOpen) => {
		footerSpollers.forEach(footerSpoller => {
			footerSpoller.classList.toggle('_init', !isOpen)
			footerSpoller.open = isOpen
		})
	}
	document.addEventListener("click", documentActions)

	// Footer Spollers
	const footerSpollers = document.querySelectorAll('.menu-footer__item')
	if (footerSpollers.length) {
		const matchMedia = window.matchMedia(`(max-width: ${maxWidth}px)`)
		spollersInit(footerSpollers, !matchMedia.matches)
		matchMedia.addEventListener('change', () => {
			spollersInit(footerSpollers, !matchMedia.matches)
		})
	}
	const header =document.querySelector('.header')
	const topHeader =document.querySelector('.top-header')
	const topHeaderContainer =document.querySelector('.top-header__container')
	const midHeader =document.querySelector('.middle-header')
	const midHeaderContainer =document.querySelector('.middle-header__container')
	const footerHeader =document.querySelector('.footer-header')
	const footerHeaderContainer =document.querySelector('.footer-header__container')
	const burgerHeader = document.querySelector('.burger-header__container')
	const socialHeader = document.querySelector('.social-block')
	const catalogHeader = document.querySelector('.middle-header__catalog')
	const searchHeader = document.querySelector('.middle-header__form')
	const funcHeader = document.querySelector('.middle-header__func')
	
	if( topHeader && midHeader && footerHeader){
		const matchMedia = window.matchMedia(`(max-width: ${ 991.98 / 16 }em)`);
		moveHeaderElements()
		matchMedia.addEventListener('change', () => {
			moveHeaderElements()
		})
		function moveHeaderElements(){
			if(matchMedia.matches){
				
				burgerHeader.insertAdjacentElement("beforeend",topHeaderContainer)
				burgerHeader.insertAdjacentElement("beforeend",footerHeaderContainer)
				burgerHeader.insertAdjacentElement("beforeend",socialHeader)

				footerHeader.insertAdjacentElement("beforeend",catalogHeader)

				footerHeader.insertAdjacentElement("beforeend",searchHeader)
				footerHeader.insertAdjacentElement("beforeend",funcHeader)
			}
			else{
				topHeader.insertAdjacentElement("beforeend",topHeaderContainer)
				topHeaderContainer.insertAdjacentElement("beforeend",socialHeader)
				midHeaderContainer.insertAdjacentElement("beforeend",catalogHeader)
				midHeaderContainer.insertAdjacentElement("beforeend",searchHeader)
				midHeaderContainer.insertAdjacentElement("beforeend",funcHeader)
				footerHeader.insertAdjacentElement("beforeend",footerHeaderContainer)
			}
		}
	}

	
}