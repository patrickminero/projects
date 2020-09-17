//side menu animation
window.addEventListener('load', ()=>{
    document.getElementById('preload').style.display = 'none';
})

ScrollTrigger.create({
    trigger: '#nav-bar',
    start: 'top top',
    end: '+=300',
    scrub: true,
    onUpdate: self => direction(self.direction),
})
function direction(element){
    console.log(element)
    if(element == 1){
        gsap.to('#nav-bar', { y: -70, duration: .5})
    }else{
        gsap.to('#nav-bar', { y: 0, duration: .5})
    }
}

gsap.to('#nav-bar', {
    scrollTrigger: {
        trigger: '#description',
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        start: '180% bottom', 
        end: '170%',
    },
    y: 0, duration: .5,
})


let menuBtn = document.getElementById('menu-button');
let sideNav = document.getElementById('side-nav');

menuBtn.addEventListener('click', ()=>{
    if(sideNav.style.display === 'block'){
        gsap.to('#side-nav', {display: 'none', opacity: 0, width: '0vw', duration: 1, ease: 'back'})
        gsap.to('#top', {rotate: -360, y: 0, backgroundColor: '#000', duration: 1});
        gsap.to('#bottom', {rotate: 360, backgroundColor: '#000', duration: 1}); 
        gsap.to('#middle', {opacity: 1, duration: 1, backgroundColor: '#000'})
        gsap.to('#menu-button', {y: 6})
        gsap.to('body', {backgroundColor: '#ffffff00', duration: 1})
        gsap.to('header', {backgroundColor: '#ffffff00', duration: 1})
        gsap.to('body', {overflow: 'initial', duration: 1})
    }else{
        gsap.to('#side-nav', {display: 'block', opacity: 1, width: '85vw', duration: 1, ease: 'back'})
        gsap.to('#middle', {opacity: 0, backgroundColor: '#fff', duration: 1});    
        gsap.to('#top', {rotate: 405, y: 25, backgroundColor: '#fff', duration: 1});    
        gsap.to('#bottom', {rotate: -405, backgroundColor: '#fff', duration: 1});    
        gsap.to('#menu-button', {y: -6})
        gsap.to('body', {backgroundColor: '#00000070', duration: 1})
        gsap.to('header', {backgroundColor: '#00000070', duration: 1})
        gsap.to('body', {overflow: 'hidden', duration: 1})
        
    }
})

// heading animations
gsap.from('#heading', { y: -200, opacity: 0, duration: 1, ease: 'slow'});
gsap.from('#menu-button', {x: -300, rotate: 720, opacity: 0, duration: 1, ease: 'slow'})

// parallax
gsap.registerPlugin(ScrollTrigger);

gsap.to('#header', {
    scrollTrigger: {
        trigger: '#about',
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        start: 'top bottom', 
        end: '#line',
        duration: 3,
    },
    backgroundPosition: '0% 50%',
})

gsap.to('#heading', {
    scrollTrigger: {
        trigger: '#about',
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        start: 'top bottom', 
        end: '#line',
        duration: 1,
    },
    top: 100
})

gsap.registerPlugin(ScrollTrigger);

gsap.to('#line', {
    scrollTrigger: {
        trigger: "#main",
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        start: "top top",
        duration: 1,
        pin: true,
},
    width: 2995,
    position: 'absolute'
})

gsap.to('#timeline', {
    scrollTrigger: {
        trigger: '#main',
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        start: "top top",
        duration: 3,
        pin: true,
    },
    xPercent: -6010,
    overflowX: 'initial'
})

gsap.from('#spain', {
    scrollTrigger: {
        trigger: '#about',
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        start: 'top top',
        end: 0
    },
    opacity: 0,
    y: -150
})

gsap.from('#portugal', {
    scrollTrigger: {
        trigger: '#main',
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        start: 'top top',
        end: "+=120",
    },
    opacity: 0,
    y: 150
})
gsap.from('#france', {
    scrollTrigger: {
        trigger: '#main',
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        start: 'top top',
        end: "+=230",
    },
    opacity: 0,
    y: -150
})

gsap.from('#italy', {
    scrollTrigger: {
        trigger: '#main',
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        start: 'top top',
        end: "+=340",
    },
    opacity: 0,
    y: 250
})

gsap.from('#england', {
    scrollTrigger: {
        trigger: '#main',
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        start: 'top top',
        end: "+=450",
    },
    opacity: 0,
    y: -400
})

gsap.from('#singapore', {
    scrollTrigger: {
        trigger: '#main',
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        start: 'top top',
        end: "+=580",
    },
    opacity: 0,
    y: 400
})

gsap.from('#malaysia', {
    scrollTrigger: {
        trigger: '#main',
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        start: 'top top',
        end: "+=710",
    },
    opacity: 0,
    y: -550
})

gsap.from('#indonesia', {
    scrollTrigger: {
        trigger: '#main',
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        start: 'top top',
        end: "+=850",
    },
    opacity: 0,
    y: 550
})

gsap.from('#taiwan', {
    scrollTrigger: {
        trigger: '#main',
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        start: 'top top',
        end: "+=970",
    },
    opacity: 0,
    y: -650
})

gsap.from('#brazil', {
    scrollTrigger: {
        trigger: '#main',
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        start: 'top top',
        end: "+=1500",
    },
    opacity: 0,
    y: 650
})

gsap.from('#uruguay', {
    scrollTrigger: {
        trigger: '#main',
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        start: 'top top',
        end: "+=1770",
    },
    opacity: 0,
    y: -750
})

gsap.from('#argentina', {
    scrollTrigger: {
        trigger: '#main',
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        start: 'top top',
        end: "+=1950",
    },
    opacity: 0,
    y: 750
})

gsap.from('#chile', {
    scrollTrigger: {
        trigger: '#main',
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        start: 'top top',
        end: "+=2180",
    },
    opacity: 0,
    y: -850
})

gsap.from('#ecuador', {
    scrollTrigger: {
        trigger: '#main',
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        start: 'top top',
        end: "+=2500",
    },
    opacity: 0,
    y: 850
})

gsap.from('#costa-rica', {
    scrollTrigger: {
        trigger: '#main',
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        start: 'top top',
        end: "+=2750",
    },
    opacity: 0,
    y: -900
})

gsap.from('#salvador', {
    scrollTrigger: {
        trigger: '#main',
        toggleActions: 'restart pause reverse pause',
        scrub: true,
        start: 'top top',
        end: "+=3000",
    },
    opacity: 0,
    y: 900
})