// CV өгөгдөл
let cvData = {
    profile: {
        name: "Болдбаатар Баясгалан",
        title: "Программ Хангамжийн Инженер",
        email: "boldbayar@gmail.com",
        phone: "+976 99119922",
        address: "Улаанбаатар, Монгол",
        image: "https://via.placeholder.com/150"
    },
    about: "Их Засаг Их Сургуулийг төгссөн, 3 жилийн ажлын туршлагатай. Вэб системийн хөгжүүлэлт, мобайл аппликэйшн, систем хөгжүүлэлтийн чиглэлээр мэргэшсэн. JavaScript, React, Node.js, MongoDB, Python зэрэг технологиудтай ажиллах туршлагатай.",
    education: [
        {
            school: "Их Засаг Их Сургууль",
            date: "2016 - 2020",
            description: "Компьютерийн ухаан, Програм хангамж"
        },
        {
            school: "Онлайн сургалт - Udemy",
            date: "2021",
            description: "Бүрэн стек веб хөгжүүлэлт (MERN)"
        }
    ],
    experience: [
        {
            title: "Ахлах Програм Хангамжийн Инженер",
            company: "MCS Группын Интерактив ХХК",
            date: "2022 - Одоог хүртэл",
            description: "Вэб аппликейшн хөгжүүлэлт, багийн удирдлага, шинэ технологиудын судалгаа, хэрэгжүүлэлт."
        },
        {
            title: "Програм Хангамжийн Инженер",
            company: "Юнител ХХК",
            date: "2020 - 2022",
            description: "Мобайл аппликейшн хөгжүүлэлт, API боловсруулалт, систем интеграци."
        }
    ],
    skills: [
        "JavaScript", "HTML5/CSS3", "React.js", "Node.js", "MongoDB", 
        "Express.js", "Git", "Python", "RESTful API", "SQL"
    ]
};

// Админы гарах нэр, нууц үг
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "password123";

// DOM элементүүд - асуудалтай хэсэг засагдсан
let adminLoginBtn;
let loginSection;
let loginForm;
let adminPanel;
let logoutBtn;
let saveAllBtn;
let saveImageBtn;

// CV хуудас байгуулах
function renderCV() {
    // Хувийн мэдээлэл
    document.getElementById('name').textContent = cvData.profile.name;
    document.getElementById('title').textContent = cvData.profile.title;
    document.getElementById('email').textContent = cvData.profile.email;
    document.getElementById('phone').textContent = cvData.profile.phone;
    document.getElementById('address').textContent = cvData.profile.address;
    document.getElementById('profile-image').src = cvData.profile.image;
    
    // Тухай
    document.getElementById('about-text').textContent = cvData.about;
    
    // Боловсрол
    const educationContainer = document.getElementById('education-container');
    educationContainer.innerHTML = '';
    
    cvData.education.forEach(edu => {
        const eduItem = document.createElement('div');
        eduItem.className = 'education-item';
        eduItem.innerHTML = `
            <h3>${edu.school}</h3>
            <p class="date">${edu.date}</p>
            <p>${edu.description}</p>
        `;
        educationContainer.appendChild(eduItem);
    });
    
    // Туршлага
    const experienceContainer = document.getElementById('experience-container');
    experienceContainer.innerHTML = '';
    
    cvData.experience.forEach(exp => {
        const expItem = document.createElement('div');
        expItem.className = 'experience-item';
        expItem.innerHTML = `
            <h3>${exp.title}</h3>
            <p class="company">${exp.company}</p>
            <p class="date">${exp.date}</p>
            <p>${exp.description}</p>
        `;
        experienceContainer.appendChild(expItem);
    });
    
    // Ур чадварууд
    const skillsContainer = document.getElementById('skills-container');
    skillsContainer.innerHTML = '';
    
    cvData.skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.textContent = skill;
        skillsContainer.appendChild(skillItem);
    });
    
    // Одоо жил
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

// Админы хэсэгт мэдээллийг бөглөх
function populateAdminPanel() {
    // Хувийн мэдээлэл
    document.getElementById('edit-name').value = cvData.profile.name;
    document.getElementById('edit-title').value = cvData.profile.title;
    document.getElementById('edit-email').value = cvData.profile.email;
    document.getElementById('edit-phone').value = cvData.profile.phone;
    document.getElementById('edit-address').value = cvData.profile.address;
    
    // Тухай
    document.getElementById('edit-about').value = cvData.about;
    
    // Боловсрол
    const educationList = document.getElementById('education-list');
    educationList.innerHTML = '';
    
    cvData.education.forEach((edu, index) => {
        addEducationItem(edu, index);
    });
    
    // Туршлага
    const experienceList = document.getElementById('experience-list');
    experienceList.innerHTML = '';
    
    cvData.experience.forEach((exp, index) => {
        addExperienceItem(exp, index);
    });
    
    // Ур чадварууд
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = '';
    
    cvData.skills.forEach((skill, index) => {
        addSkillItem(skill, index);
    });
}

// Боловсрол нэмэх
function addEducationItem(edu = { school: '', date: '', description: '' }, index) {
    const educationList = document.getElementById('education-list');
    const eduItem = document.createElement('div');
    eduItem.className = 'education-edit-item';
    eduItem.innerHTML = `
        <button class="remove-btn" data-index="${index}" data-type="education">×</button>
        <label>Сургууль:</label>
        <input type="text" class="edu-school" value="${edu.school}">
        <label>Огноо:</label>
        <input type="text" class="edu-date" value="${edu.date}">
        <label>Тодорхойлолт:</label>
        <input type="text" class="edu-desc" value="${edu.description}">
    `;
    educationList.appendChild(eduItem);
    
    // Устгах товч
    eduItem.querySelector('.remove-btn').addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        cvData.education.splice(index, 1);
        populateAdminPanel();
    });
}

// Ажлын туршлага нэмэх
function addExperienceItem(exp = { title: '', company: '', date: '', description: '' }, index) {
    const experienceList = document.getElementById('experience-list');
    const expItem = document.createElement('div');
    expItem.className = 'experience-edit-item';
    expItem.innerHTML = `
        <button class="remove-btn" data-index="${index}" data-type="experience">×</button>
        <label>Албан тушаал:</label>
        <input type="text" class="exp-title" value="${exp.title}">
        <label>Компани:</label>
        <input type="text" class="exp-company" value="${exp.company}">
        <label>Огноо:</label>
        <input type="text" class="exp-date" value="${exp.date}">
        <label>Тодорхойлолт:</label>
        <input type="text" class="exp-desc" value="${exp.description}">
    `;
    experienceList.appendChild(expItem);
    
    // Устгах товч
    expItem.querySelector('.remove-btn').addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        cvData.experience.splice(index, 1);
        populateAdminPanel();
    });
}

// Ур чадвар нэмэх
function addSkillItem(skill = '', index) {
    const skillsList = document.getElementById('skills-list');
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-edit-item';
    skillItem.innerHTML = `
        <button class="remove-btn" data-index="${index}" data-type="skill">×</button>
        <label>Ур чадвар:</label>
        <input type="text" class="skill-name" value="${skill}">
    `;
    skillsList.appendChild(skillItem);
    
    // Устгах товч
    skillItem.querySelector('.remove-btn').addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        cvData.skills.splice(index, 1);
        populateAdminPanel();
    });
}

// Админ хэсэгт утга хадгалах
function saveAdminChanges() {
    // Хувийн мэдээлэл
    cvData.profile.name = document.getElementById('edit-name').value;
    cvData.profile.title = document.getElementById('edit-title').value;
    cvData.profile.email = document.getElementById('edit-email').value;
    cvData.profile.phone = document.getElementById('edit-phone').value;
    cvData.profile.address = document.getElementById('edit-address').value;
    
    // Тухай
    cvData.about = document.getElementById('edit-about').value;
    
    // Боловсрол
    cvData.education = [];
    document.querySelectorAll('.education-edit-item').forEach(item => {
        cvData.education.push({
            school: item.querySelector('.edu-school').value,
            date: item.querySelector('.edu-date').value,
            description: item.querySelector('.edu-desc').value
        });
    });
    
    // Туршлага
    cvData.experience = [];
    document.querySelectorAll('.experience-edit-item').forEach(item => {
        cvData.experience.push({
            title: item.querySelector('.exp-title').value,
            company: item.querySelector('.exp-company').value,
            date: item.querySelector('.exp-date').value,
            description: item.querySelector('.exp-desc').value
        });
    });
    
    // Ур чадвар
    cvData.skills = [];
    document.querySelectorAll('.skill-edit-item').forEach(item => {
        const skillName = item.querySelector('.skill-name').value.trim();
        if (skillName) {
            cvData.skills.push(skillName);
        }
    });
    
    // Мэдээллийг local storage-д хадгалах
    localStorage.setItem('cvData', JSON.stringify(cvData));
    
    // CV хуудсыг шинэчлэх
    renderCV();
    
    // Админ хэсгийг нуух
    adminPanel.classList.add('hidden');
    
    alert('Мэдээлэл амжилттай хадгалагдлаа!');
}

// Зураг upload хийх
function handleImageUpload() {
    const fileInput = document.getElementById('profile-image-upload');
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            cvData.profile.image = e.target.result;
            document.getElementById('profile-image').src = e.target.result;
            localStorage.setItem('cvData', JSON.stringify(cvData));
            alert('Зураг амжилттай шинэчлэгдлээ!');
        };
        reader.readAsDataURL(file);
    }
}

// Эвент listener-үүд
document.addEventListener('DOMContentLoaded', function() {
    // DOM элементүүдийг зааж өгөх
    adminLoginBtn = document.getElementById('admin-login-btn');
    loginSection = document.getElementById('login-section');
    loginForm = document.getElementById('login-form');
    adminPanel = document.getElementById('admin-panel');
    logoutBtn = document.getElementById('logout-btn');
    saveAllBtn = document.getElementById('save-all');
    saveImageBtn = document.getElementById('save-image');
    
    // ШИНЭ: LocalStorage-г цэвэрлэх - асуудал үүсгэж буй тохиолдолд
    // localStorage.removeItem('adminPanelOpen');
    
    // ШИНЭ: Админ хэсгийг хүчээр нуухад:
    adminPanel.style.display = 'none';
    loginSection.style.display = 'none';
    
    // Админ хэсгийг нуух байдлыг шалгах
    if (!loginSection.classList.contains('hidden')) {
        loginSection.classList.add('hidden');
    }
    
    if (!adminPanel.classList.contains('hidden')) {
        adminPanel.classList.add('hidden');
    }
    
    // Local storage-с өгөгдөл авах
    const savedData = localStorage.getItem('cvData');
    if (savedData) {
        try {
            cvData = JSON.parse(savedData);
        } catch (e) {
            console.error('LocalStorage data parse error:', e);
            localStorage.removeItem('cvData');
        }
    }
    
    // CV хуудсыг үүсгэх
    renderCV();
    
    // Админы нэвтрэх товч
    adminLoginBtn.addEventListener('click', function() {
        loginSection.classList.remove('hidden');
        loginSection.style.display = 'flex';
    });
    
    // Нэвтрэх форм
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            loginSection.classList.add('hidden');
            loginSection.style.display = 'none';
            adminPanel.classList.remove('hidden');
            adminPanel.style.display = 'flex';
            populateAdminPanel();
        } else {
            alert('Хэрэглэгчийн нэр эсвэл нууц үг буруу байна!');
        }
    });
    
    // ШИНЭ: Escape товчийг даралт
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            loginSection.classList.add('hidden');
            loginSection.style.display = 'none';
            adminPanel.classList.add('hidden');
            adminPanel.style.display = 'none';
        }
    });
    
    // Гарах товч - бүрэн засварласан
    if (logoutBtn) {
        console.log('Logout button found');
        
        // Зөвхөн онклик эвент, бусад нь хасагдсан
        logoutBtn.onclick = function() {
            console.log('Logout clicked');
            adminPanel.classList.add('hidden');
            adminPanel.style.display = 'none';
            return false;
        };
    } else {
        console.error('Logout button not found in DOM');
    }
    
    // Бүгдийг хадгалах товч
    saveAllBtn.addEventListener('click', saveAdminChanges);
    
    // Зураг хадгалах товч
    saveImageBtn.addEventListener('click', handleImageUpload);
    
    // Боловсрол нэмэх товч
    document.getElementById('add-education').addEventListener('click', function() {
        cvData.education.push({ school: '', date: '', description: '' });
        addEducationItem({ school: '', date: '', description: '' }, cvData.education.length - 1);
    });
    
    // Туршлага нэмэх товч
    document.getElementById('add-experience').addEventListener('click', function() {
        cvData.experience.push({ title: '', company: '', date: '', description: '' });
        addExperienceItem({ title: '', company: '', date: '', description: '' }, cvData.experience.length - 1);
    });
    
    // Ур чадвар нэмэх товч
    document.getElementById('add-skill').addEventListener('click', function() {
        cvData.skills.push('');
        addSkillItem('', cvData.skills.length - 1);
    });
}); 