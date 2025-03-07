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
        setTimeout(erase, 50);
    } else {
        phraseIndex = (phraseIndex + 1) % descriptions.length;
        currentText = "a ";
        letterIndex = 0;
        setTimeout(type, 500);
    }
}
type(); // Start the typing effect



//for educations
async function fetchAndRenderEducation() {
    try {
        const response = await fetch('http://localhost:3000/api/education');
        if (!response.ok) throw new Error('Failed to fetch education data');

        const educationData = await response.json();
        renderEducation(educationData);
    } catch (error) {
        console.error('Error fetching education data:', error);
    }
}

function renderEducation(educationArray) {
    const timelineContainer = document.getElementById("educationTimeline");
    timelineContainer.innerHTML = "";
    const colorOne = "#0ad7f7";
    const colorTwo = "#fcd539";
    educationArray.forEach((item, index) => {
        const isEven = index % 2 === 0;
        const invertClass = isEven ? "" : "timeline-inverted";
        const badgeColor = isEven ? colorOne : colorTwo;
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
                        <span class="marks">${item.marks}</span>
                    </div>
                    <div>
                        <span class="ml-md-auto font-weight-bold yearDate" style="color: ${badgeColor};">${item.year}</span>
                    </div>
                </div>
            </div>
        `;
    });
}
document.addEventListener('DOMContentLoaded', fetchAndRenderEducation);

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
async function fetchSkills() {
    try {
        const response = await fetch('http://localhost:3000/api/skills');
        if (!response.ok) throw new Error('Failed to fetch skills');
        const skillsData = await response.json();
        //   console.log('Fetched skills data:', skillsData);
        renderSkills(skillsData);
    } catch (error) {
        console.error('Error fetching skills:', error);
    }
}

function renderSkills(skills) {
    const skillsContainer = document.getElementById('skillsContainer');
    skillsContainer.innerHTML = ''; // Clear existing content if any
    skills.forEach((category, index) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('skills__content');
        categoryDiv.style.transitionDelay = `${(index + 1) * 0.2}s`; // Stagger effect
        categoryDiv.innerHTML = `<h3 class="skills__subtitle">${category.category}</h3>`;
        category.items.forEach(item => {
            const skillDiv = document.createElement('div');
            skillDiv.classList.add('skills__data');
            skillDiv.innerHTML = `
          <div class="skills__names">
            <i class="bx ${item.icon} skills__icon"></i>
            <span class="skills__name">${item.name}</span>
          </div>
          <div class="progress__container">
            <div class="progress__bar">
              <div class="progress__fill"></div>
            </div>
            <span class="progress__percent">${item.proficiency}</span>
          </div>
        `;

            const fillDiv = skillDiv.querySelector('.progress__fill');
            fillDiv.style.setProperty('--progress', item.proficiency);
            fillDiv.style.width = item.proficiency; // Immediate visible progress
            categoryDiv.appendChild(skillDiv);
        });
        skillsContainer.appendChild(categoryDiv);
    });
    observeSkills();
}

function observeSkills() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    document.querySelectorAll('.skills__content').forEach(skill => {
        observer.observe(skill);
    });
}
// Initialize
fetchSkills();

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


// project
let tempProjectsData = [];

async function fetchAllProjects() {
    const loader = document.getElementById('projects-loader');
    loader.classList.add('show');
    
    try {
        const response = await fetch('http://localhost:3000/api/projects');
        if (!response.ok) throw new Error('Failed to fetch projects data');

        tempProjectsData = await response.json();
        
        renderProjects(tempProjectsData);

        // Wait a bit before hiding loader to ensure smooth transition
        setTimeout(() => loader.classList.remove('show'), 500);

    } catch (error) {
        console.error('Error fetching projects:', error);
        loader.textContent = '❌ Failed to load projects.';
    }
}

function renderProjects(projectsData) {
    const projectsContainer = document.getElementById('projectsContainer');
    if (!projectsContainer) return console.error('projectsContainer not found');

    projectsContainer.innerHTML = '';

    projectsData.forEach(project => {
        const projectItem = document.createElement('a');
        projectItem.classList.add('work__img');
        projectItem.href = project.github;
        projectItem.target = '_blank';
        projectItem.innerHTML = `<img src="${project.image}" alt="${project.name}">`;
        projectsContainer.appendChild(projectItem);
    });

    ScrollReveal().reveal('.work__img', {
        origin: 'top',
        distance: '20px',
        duration: 500,
        delay: 200,
        interval: 100,
        reset: false,
    });

    observeProjects();
}

document.addEventListener('DOMContentLoaded', fetchAllProjects);


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

document.getElementById('addEducationForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const newEducation = {
      title: document.getElementById('eduTitle').value,
      description: document.getElementById('eduDescription').value,
      marks: document.getElementById('eduMarks').value,
      year: document.getElementById('eduYear').value,
    };
  
    try {
      const response = await fetch('http://localhost:3000/api/education', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEducation),
      });
  
      if (response.ok) {
        alert('Education added successfully!');
        location.reload();
      } else {
        alert('Failed to add education');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding education.');
    }
  });

  // Modal control
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("educationModal");
  const openModalBtn = document.getElementById("openModalBtn");
  const closeModal = document.querySelector(".close");

  openModalBtn.addEventListener("click", () => {
    modal.classList.add("show");
  });

  closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  // Close modal on outside click
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });
});


// Toast function
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.backgroundColor = type === 'error' ? '#e74c3c' : '#333';
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Form validation with toast notifications
const addEducationForm = document.getElementById('addEducationForm');

addEducationForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('eduTitle').value.trim();
    const description = document.getElementById('eduDescription').value.trim();
    const marks = document.getElementById('eduMarks').value.trim();
    const year = document.getElementById('eduYear').value.trim();

    if (!title || !description || !marks || !year) {
        showToast('⚠️ Please fill in all the fields!', 'error');
        return;
    }

    // Simulate successful addition (replace with your logic to update the UI)
    showToast('🎉 Education added successfully!');

    // Close the modal
    educationModal.style.display = 'none';

    // Reset the form
    addEducationForm.reset();
});




