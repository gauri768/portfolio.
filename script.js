/* =========================================================
GAURI BHOYAR PORTFOLIO
   Vanilla JavaScript
   ========================================================= */


/* ================= PRELOADER ================= */

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    setTimeout(() => {
        preloader.classList.add("hidden");
    }, 500);

});


/* ================= HEADER SCROLL EFFECT ================= */

const header = document.getElementById("header");

function handleHeaderScroll() {

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", handleHeaderScroll);

handleHeaderScroll();


/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {

    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen.toString()
    );

    document.body.classList.toggle(
        "menu-open",
        isOpen
    );

    const icon = menuToggle.querySelector("i");

    if (isOpen) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove("menu-open");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* ================= TYPING EFFECT ================= */

const typingElement =
    document.getElementById("typingText");

const typingWords = [
    "I am continuous learner",
    "Tech Enthusiast ",
];

let wordIndex = 0;
let characterIndex = 0;

let isDeleting = false;

function typeEffect() {

    const currentWord =
        typingWords[wordIndex];

    if (!isDeleting) {

        typingElement.textContent =
            currentWord.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;

        if (characterIndex === currentWord.length) {

            isDeleting = true;

            setTimeout(
                typeEffect,
                1500
            );

            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;

        if (characterIndex === 0) {

            isDeleting = false;

            wordIndex =
                (wordIndex + 1) %
                typingWords.length;

        }

    }

    const typingSpeed =
        isDeleting ? 45 : 90;

    setTimeout(
        typeEffect,
        typingSpeed
    );

}

typeEffect();


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ================= ACTIVE NAVIGATION ================= */

const sections =
    document.querySelectorAll("section[id]");

function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 150;

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");

        const navigationLink =
            document.querySelector(
                `.nav-link[href="#${sectionId}"]`
            );

        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
                sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {
                link.classList.remove("active");
            });

            if (navigationLink) {
                navigationLink.classList.add(
                    "active"
                );
            }

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNavigation
);

updateActiveNavigation();


/* ================= PROJECT MESSAGE ================= */

function showProjectMessage(event, projectName) {

    event.preventDefault();

    showToast(
        `${projectName} link is ready to be added.`
    );

}


/* ================= TOAST ================= */

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");

let toastTimeout;

function showToast(message) {

    toastMessage.textContent =
        message;

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {

        toast.classList.remove("show");

    }, 3500);

}


/* ================= CONTACT FORM ================= */

const contactForm =
    document.getElementById("contactForm");

contactForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const name =
            document.getElementById("name")
                .value
                .trim();

        const email =
            document.getElementById("email")
                .value
                .trim();

        const subject =
            document.getElementById("subject")
                .value
                .trim();

        const message =
            document.getElementById("message")
                .value
                .trim();


        if (
            !name ||
            !email ||
            !subject ||
            !message
        ) {

            showToast(
                "Please fill in all fields."
            );

            return;

        }


        const recipient =
            "gauribhoyar40gmail.com";

        const mailSubject =
            encodeURIComponent(
                subject
            );

        const mailBody =
            encodeURIComponent(
                `Hello Anshuman,

Name: ${name}
Email: ${email}

Message:
${message}`
            );


        const mailtoLink =
            `mailto:${recipient}?subject=${mailSubject}&body=${mailBody}`;


        window.location.href =
            mailtoLink;


        showToast(
            "Opening your email client..."
        );

    }
);


/* ================= SMOOTH ANCHOR SCROLL ================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(anchor => {

    anchor.addEventListener(
        "click",
        function(event) {

            const targetId =
                this.getAttribute("href");

            if (
                targetId === "#" ||
                targetId === ""
            ) {
                return;
            }

            const target =
                document.querySelector(
                    targetId
                );

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header.offsetHeight;

            const targetPosition =
                target.offsetTop -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        }
    );

});


/* ================= CARD STAGGER ================= */

const staggerGroups = [
    ".skill-category",
    ".project-card",
    ".module-card",
    ".timeline-item"
];

staggerGroups.forEach(selector => {

    const elements =
        document.querySelectorAll(
            selector
        );

    elements.forEach(
        (element, index) => {

            element.style.transitionDelay =
                `${index * 70}ms`;

        }
    );

});


/* ================= KEYBOARD ESCAPE ================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            navMenu.classList.contains("open")
        ) {

            navMenu.classList.remove(
                "open"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "menu-open"
            );

            const icon =
                menuToggle.querySelector("i");

            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );

        }

    }
);


/* ================= CONSOLE MESSAGE ================= */

console.log(
    "%c👋 Hello! Welcome to Anshuman Agrawal's Portfolio.",
    "color:#9b84ff;font-size:16px;font-weight:bold;"
);

console.log(
    "%cBuilt with HTML, CSS & Vanilla JavaScript.",
    "color:#21d4fd;font-size:12px;"
);
