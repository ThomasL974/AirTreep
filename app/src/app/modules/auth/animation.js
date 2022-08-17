import { gsap } from "gsap";

const revealFormOpacity = () =>{
    const tl = gsap.timeline();

    tl.set('.forms', {
        opacity: 0,
    })

    tl.to('.forms', {
        duration: 1,
        opacity: 1,
        ease: "ease-inOut"
    })
}

export {
    revealFormOpacity
}