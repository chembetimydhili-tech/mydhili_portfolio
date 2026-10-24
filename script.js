/* ==========================================
   MYDHILI CHEMBETI — PORTFOLIO JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    // 1. Automatically update the footer year
    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // 2. Smooth scrolling for navigation links
    const navigationLinks = document.querySelectorAll(
        '.nav-links a, .home-buttons a[href^="#"]'
    );

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // Update the URL hash without jumping instantly
                history.replaceState(null, "", targetId);
            }
        });
    });


    // 3. Highlight the active navigation link
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    function updateActiveLink() {

        let currentSection = "home";
        const header = document.querySelector(".header");

        const headerHeight = header
            ? header.getBoundingClientRect().height
            : 0;

        const activationPoint = headerHeight + 80;

        sections.forEach(function (section) {

            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop <= activationPoint) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(function (link) {

            const isActive =
                link.getAttribute("href") === "#" + currentSection;

            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink, {
        passive: true
    });

    window.addEventListener("resize", updateActiveLink);

    updateActiveLink();


    // 4. Check whether the profile image loads
    const profileImage = document.querySelector(".profile-image");

    if (profileImage) {

        profileImage.addEventListener("error", function () {
            console.error(
                "Profile photo could not load. Check images/profile.jpeg"
            );
        });

        profileImage.addEventListener("load", function () {
            console.log("Profile photo loaded successfully.");
        });
    }


    // 5. Check that the resume link has a destination
    const resumeLinks = document.querySelectorAll(
        'a[href="resume/Mydhili_Resume.pdf"]'
    );

    resumeLinks.forEach(function (link) {

        link.addEventListener("click", function () {
            console.log("Opening the resume PDF.");
        });
    });


    // 6. Add a subtle reveal effect when sections enter the screen
    const allCards = document.querySelectorAll(
        ".skill-card, .project-card, .certification-card, .contact-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        allCards.forEach(function (card) {
            observer.observe(card);
        });
    }

});