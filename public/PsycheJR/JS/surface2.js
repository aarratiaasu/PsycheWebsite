gsap.set([
    "#page-header", 
    "#header-h1",
    "#materials", 
    "#features", 
    "#div3", 
    "#div4", 
    "#div5",
    "footer"
], { opacity: 0 });

// Set background properties to ensure no repeat
document.body.style.backgroundImage = "url('/img/psyche-surface.svg')";
document.body.style.backgroundSize = "cover"; // Ensures it fills the screen
document.body.style.backgroundPosition = "center";

const tl = gsap.timeline({
    defaults: { duration: 0.75, ease: "power4.out" }
});

// Animate background size without repeating
tl.fromTo("body", 
    { backgroundSize: "300%"},  // Start large and zoomed in
    { backgroundSize: "650%", duration: 3 } // Shrink to fit screen properly
);

tl.fromTo(
    "#logo",
    {
        opacity: 0,
        scale: 3,
        y: 400
    },
    {
        opacity: 1,
        scale: 1,
        duration: 3,
        y: 0
    }, "<50%"
);

tl.to("#header-h1", {opacity: 1, duration: 3})

// Smooth transition from background image to black, then to white
tl.to("body", { backgroundImage: "none", backgroundColor: "black", duration: 1}, "<60%");
tl.to("body", { backgroundColor: "white", backgroundSize: "100%", duration: 1});

tl.to("#materials", {opacity: 1}, "<50%");
tl.fromTo(
    "body", 
    { 
        backgroundColor: "white" 
    }, 
    { 
        backgroundColor: "black", 
        duration: 2, 
        ease: "power4.inOut", 
        scrollTrigger: {
            trigger: '#materials',
            start: 'top center',
            end: '20% center',
            scrub: true
        }
  })

tl.fromTo(
    "#materials-h1, #materials-p", 
    {
        opacity: 0
    },
    {
        opacity: 1,
        duration: 3,
        ease: "power4.in"
    }, "<"
);

tl.fromTo(
    "#materials-h1", 
    {
        scale: 2,
        y: 0
    },
    {
        scale: 3,
        y: -200,
        duration: 3,
        ease: "power4.in",  
        scrollTrigger: {
            trigger: '#materials',
            start: 'top center',
            end: '50% center',
            scrub: true
        } 
    }
)

tl.fromTo(
    "#materials-h1", 
    {
        scale: 3,
        y: -200
    },
    {
        scale: 2,
        y: 200,
        duration: 3,
        ease: "power4.in",  
        color: "#ef5966", 
        scrollTrigger: {
            trigger: '#materials',
            start: '50% center',
            end: '90% center',
            scrub: true
        } 
    }
)

tl.fromTo(
    "#materials-p", 
    {
        y: 0
    },
    {
        y: 200,
        duration: 3,
        ease: "power4.in",
        color: "#ef5966",  
        scrollTrigger: {
            trigger: '#materials',
            start: 'top center',
            end: '85% center',
            scrub: true
        } 
    }
)

tl.fromTo(
    "#materials", 
    {
        backgroundSize: "100%"
    },
    {
        backgroundSize: "400%",
        duration: 7,
        ease: "power4.in",  
        scrollTrigger: {
            trigger: '#materials',
            start: '10% center',
            end: 'bottom center',
            scrub: true
        } 
    }
)

tl.to("#features", {opacity: 1}, "<")

tl.fromTo(
    "#features", 
    {
        backgroundSize: "300%",
        backgroundPosition: "40% 0%"
    },
    {
        backgroundSize: "200%",
        backgroundPosition: "50% 50%",
        duration: 4,
        ease: "power4.in",  
        scrollTrigger: {
            trigger: '#features',
            start: 'top center',
            end: '50% center',
            scrub: true
        } 
    }
)

tl.fromTo(
    "#inner-features",
    {
        color: "#ef5966",
        backgroundColor: "rgba(0, 0, 0, 1)"
    },
    {
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        scrollTrigger: {
            trigger: '#features',
            start: '30% center',
            end: 'bottom center',
            scrub: true
        } 
    }, "<"
)

tl.fromTo(
    "#features-h1", 
    {
        scale: 1,
        y: 0
    },
    {
        scale: 3,
        y: -200,
        duration: 3,
        ease: "power4.in",  
        scrollTrigger: {
            trigger: '#features',
            start: 'top center',
            end: '50% center',
            scrub: true
        } 
    }, "<"
)



tl.fromTo(
    "#features-p",
    {
        y: 0
    },
    {
        y: 250,
        paddingBottom: "5%",
        scrollTrigger: {
            trigger: '#features',
            start: '50% center',
            end: '90% center',
            scrub: true
        } 
    }, "<"
)

tl.fromTo(
    "#features-h1",
    {
        scale: 3,
        y: -200
    },
    {
        scale: 2,
        y: 200,
        duration: 3,
        ease: "power4.in", 
        scrollTrigger: {
            trigger: '#features',
            start: '50% center',
            end: '80% center',
            scrub: true
        } 
    }, "<"
)

tl.to(
    "#features, #inner-features",
    {
        borderRadius: "10rem",
        duration: 4,
        ease: "power4.inOut",
        scrollTrigger: {
            trigger: '#features',
            start: '70% center',
            end: 'bottom center',
            scrub: true
        } 
    }
)

tl.fromTo(
    "#features",
    {
        backgroundSize: "200%",
        backgroundPosition: "50% 50%",
    },
    {
        backgroundSize: "300%",
        backgroundPosition: "-10% 0%",
        duration: 4,
        ease: "power4.inOut",
        scrollTrigger: {
            trigger: '#features',
            start: '70% center',
            end: 'bottom center',
            scrub: true
        } 
    }
)

tl.to(
    "#features",
    {
        backgroundColor: "rgba(0, 0, 0, 1)",
        backgroundImage: "none",
        duration: 4,
        ease: "power4.inOut",
        scrollTrigger: {
            trigger: '#features',
            start: '90% center',
            end: 'bottom center',
            scrub: true
        } 
    }
)

tl.to(
    "#inner-features",
    {
        color: "#ef5966",
        scale: 1,
        duration: 4,
        scrollTrigger: {
            trigger: '#features',
            start: '90% center',
            end: 'bottom center',
            scrub: true
        } 
    }
)


tl.to(["#div3", "#div4", "#div5", "#footer"], {opacity: 1, duration: 4});
