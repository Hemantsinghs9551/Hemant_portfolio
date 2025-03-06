/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    //     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.skills__data, .work__img, .contact__input', { interval: 200 });


//for descriptions
const descriptions = [
    "Software Engineer",
    "React Developer",
    "UI Designer"
];

let phraseIndex = 0; // Index for the current description
let letterIndex = 0;
let currentText = "a ";
const typingTextElement = document.getElementById('typing-text');

function type() {
    if (letterIndex < descriptions[phraseIndex].length) {
        currentText += descriptions[phraseIndex].charAt(letterIndex);
        typingTextElement.textContent = currentText;
        letterIndex++;
        setTimeout(type, 100); // Typing speed
    } else {
        setTimeout(erase, 2000); // Pause before erasing
    }
}

function erase() {
    if (letterIndex > 0) {
        currentText = currentText.slice(0, -1);
        typingTextElement.textContent = currentText;
        letterIndex--;
        setTimeout(erase, 50); // Erasing speed
    } else {
        phraseIndex = (phraseIndex + 1) % descriptions.length; // Move to next description
        currentText = "a "; // Reset to preserve "I'm a "
        letterIndex = 0; // Reset letter index
        setTimeout(type, 500); // Pause before typing next
    }
}
type(); // Start the typing effect

//for educations
const educationData = [
    {
        title: "Barkatullah University",
        description: "I earned my B.Tech degree in Computer Science and Engineering.",
        marks: "CGPA - 8.10",
        year: "Year - 2024",
    },
    {
        title: "Govt. Higher Secondary Dabhaura",
        description: "I graduated from Govt. Higher Secondary Dabhaura after completing my 12th grade.",
        marks: "Marks - 83.80%",
        year: "Year - 2019",
    },
    {
        title: "Govt. Higher Secondary Dabhaura",
        description: "I finished my 11th grade at this school.",
        marks: "Marks - 65.50%",
        year: "Year - 2018",
    },
    {
        title: "Govt. High School Dabhaura",
        description: "I completed my 10th grade at this school.",
        marks: "Marks - 84.14%",
        year: "Year - 2017",
    },
];
const timelineContainer = document.getElementById("educationTimeline");
const colorOne = "#0ad7f7";  // First color
const colorTwo = "#fcd539";  // Second color

educationData.forEach((item, index) => {
    const isEven = index % 2 === 0;
    const invertClass = isEven ? "" : "timeline-inverted";
    const badgeColor = isEven ? colorOne : colorTwo;
    const yearTextColor = badgeColor;

    timelineContainer.innerHTML += `
<div class="timeline-wrapper ${invertClass}">
<div class="timeline-badge" style="background-color: ${badgeColor};"></div>
<div class="timeline-panel">
<div class="timeline-heading">
<h6 class="timeline-title">${item.title}</h6>
</div>
<div class="timeline-body">
<p>${item.description}</p>
</div>
<div class="timeline-footer d-flex align-items-center flex-wrap">
<i class="mdi mdi-heart-outline text-muted mr-1"></i>
<span class="marks">${item.marks}</span>
</div>
<div>
<span class="ml-md-auto font-weight-bold yearDate" style="color: ${yearTextColor};">${item.year}</span>
</div>
</div>
</div>
`;
});

window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.timeline-wrapper');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.style.opacity = 1;
        }
    });
});


//for skills
const skillsData = [
    {
        category: "Programming Languages",
        skills: [
            { icon: "bxl-java", name: "Java", level: "70%" },
            { icon: "bxl-c-plus-plus", name: "C++", level: "80%" },
            { icon: "bxl-javascript", name: "JavaScript", level: "75%" },
            { icon: "bxl-typescript", name: "TypeScript", level: "65%" },
        ],
    },
    {
        category: "Frameworks & Technologies",
        skills: [
            { icon: "bxl-react", name: "React Native", level: "85%" },
            { icon: "bxs-cloud", name: "Cloud Computing", level: "60%" },
        ],
    },
    {
        category: "Operating Systems",
        skills: [
            { icon: "bxl-linux", name: "Linux", level: "70%" },
            { icon: "bxl-windows", name: "Windows", level: "75%" },
        ],
    },
    {
        category: "Tools",
        skills: [
            { icon: "bxl-git", name: "Git", level: "75%" },
        ],
    },
    {
        category: "Soft Skills",
        skills: [
            { icon: "bx-group", name: "Leadership" },
            { icon: "bx-chat", name: "Communication" },
            { icon: "bx-bulb", name: "Problem Solving" },
        ],
    },
];

const skillsContainer = document.getElementById("skillsContainer");

skillsData.forEach(section => {
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("skills__content");

    const subtitle = document.createElement("h2");
    subtitle.classList.add("skills__subtitle");
    subtitle.textContent = section.category;
    contentDiv.appendChild(subtitle);

    section.skills.forEach(skill => {
        const skillDiv = document.createElement("div");
        skillDiv.classList.add("skills__data");

        const icon = document.createElement("i");
        icon.classList.add("bx", skill.icon, "skills__icon");
        skillDiv.appendChild(icon);

        const nameSpan = document.createElement("span");
        nameSpan.classList.add("skills__name");
        nameSpan.textContent = skill.name;
        skillDiv.appendChild(nameSpan);

        if (skill.level) {
            const progressContainer = document.createElement("div");
            progressContainer.classList.add("progress__container");

            const progressBar = document.createElement("div");
            progressBar.classList.add("progress__bar");

            const progressFill = document.createElement("div");
            progressFill.classList.add("progress__fill");
            progressFill.setAttribute("data-progress", skill.level);
            progressFill.style.width = "0%"; // Start at 0% for animation


            progressBar.appendChild(progressFill);

            const percentSpan = document.createElement("span");
            percentSpan.classList.add("progress__percent");
            percentSpan.textContent = skill.level;

            progressContainer.appendChild(progressBar);
            progressContainer.appendChild(percentSpan);

            skillDiv.appendChild(progressContainer);
        }
        contentDiv.appendChild(skillDiv);
    });
    skillsContainer.appendChild(contentDiv);
});

document.addEventListener("DOMContentLoaded", () => {

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress__fill');
                progressBars.forEach(bar => {
                    const value = bar.getAttribute('data-progress');
                    bar.style.width = value;
                });
                observer.unobserve(entry.target); // Optional: run animation only once
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of the element is visible
    });

    document.querySelectorAll('.skills__content').forEach(section => {
        observer.observe(section);
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Optional: remove after first trigger
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.skills__content').forEach(card => {
    observer.observe(card);
});

//for projects
const projects = [
    {
        name: "Jweva: Jewellery E-Commerce App",
        image: "./projectsImages/Jweva.jpeg",
        github: "https://github.com/Hemantsinghs9551"
    },
    {
        name: "Smart Occupancy-Based Lighting System",
        image: "./projectsImages/door_automation.jpeg",
        github: "https://github.com/Hemantsinghs9551/Smart-Occupancy-Based-Lighting-System.git"
    },
    {
        name: "College Administration System",
        image: "./projectsImages/college_administration.jpeg",
        github: "https://github.com/Hemantsinghs9551/College_administration.git"
    },
    {
        name: "Bus Reservation System",
        image: "./projectsImages/Bus_reservation.jpeg",
        github: "https://github.com/Hemantsinghs9551/bus_reservation_system.git"
    },
    {
        name: "Heart Disease Prediction",
        image: "./projectsImages/Heart.jpeg",
        github: "https://github.com/Hemantsinghs9551/heart-diesese-prediction-ML.git"
    }
];

const container = document.getElementById("projects-container");
projects.forEach((project, index) => {
    const projectItem = document.createElement("a");
    projectItem.classList.add("work__img");
    projectItem.href = project.github;
    projectItem.target = "_blank";
    projectItem.innerHTML = `<img src="${project.image}" alt="${project.name}">`;
    projectItem.style.setProperty('--delay', `${index * 0.15}s`); // Slight delay between items
    container.appendChild(projectItem);
});

const observeProjects = () => {
    /* ==== SCROLL ANIMATION FOR PROJECTS ==== */
    const projectItems = document.querySelectorAll(".work__img");

    projectItems.forEach((item, index) => {
        item.style.setProperty('--delay', `${index * 0.1}s`);
    });

    const projectObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        },
        {
            threshold: 0.1,
        }
    );

    projectItems.forEach((item) => projectObserver.observe(item));
};
window.addEventListener('load', observeProjects);

// for Contact 
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById('contact-form');
    const loader = document.getElementById('form-loader');
    const toast = document.getElementById('toast');

    emailjs.init("l6SXAe1etcEFZRBJG"); // public key

    function showLoader() {
        loader.style.display = 'flex';
    }
    function hideLoader() {
        loader.style.display = 'none';
    }
    function showToast(message, duration = 3000) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            showLoader();

            emailjs.sendForm('service_pljnwp3', 'template_xybkgoj', this)
                .then(function () {
                    hideLoader();
                    showToast('✅ Message sent successfully!');
                    contactForm.reset();
                }, function (error) {
                    hideLoader();
                    showToast('❌ Failed to send: ' + error.text);
                });
        });
    }
});


