document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resumeForm');
    var resumeOutput = document.getElementById('resumeOutput');
    var shareSection = document.getElementById('shareSection');
    var shareableLinkInput = document.getElementById('shareableLink');
    var copyLinkButton = document.getElementById('copyLink');
    var downloadPDFButton = document.getElementById('downloadPDF');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var name = document.getElementById('name').value;
        var username = document.getElementById('username').value.trim().toLowerCase();
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var aboutMe = document.getElementById('aboutMe').value;
        var education = document.getElementById('education').value;
        var skills = document.getElementById('skills').value.split(',').map(function (skill) { return skill.trim(); });
        var workExperience = document.getElementById('workExperience').value;
        var projects = document.getElementById('projects').value.split(',').map(function (project) { return project.trim(); });
        var resumeHTML = "\n            <header class=\"personal-info editable\" contenteditable=\"true\">\n                <h1>".concat(name, "</h1>\n                <p>Email: <a href=\"mailto:").concat(email, "\">").concat(email, "</a></p>\n                <p>Phone: <a href=\"tel:").concat(phone, "\">").concat(phone, "</a></p>\n            </header>\n            <section class=\"about-me editable\" contenteditable=\"true\">\n                <h2>About Me</h2>\n                <p>").concat(aboutMe, "</p>\n            </section>\n            <section class=\"education editable\" contenteditable=\"true\">\n                <h2>Education</h2>\n                <p>").concat(education, "</p>\n            </section>\n            <section class=\"skills editable\" contenteditable=\"true\">\n                <h2>Skills</h2>\n                <ul>\n                    ").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "\n                </ul>\n            </section>\n            <section class=\"work-experience editable\" contenteditable=\"true\">\n                <h2>Work Experience</h2>\n                <p>").concat(workExperience, "</p>\n            </section>\n            <section class=\"projects editable\" contenteditable=\"true\">\n                <h2>Projects</h2>\n                <ul>\n                    ").concat(projects.map(function (project) { return "<li>".concat(project, "</li>"); }).join(''), "\n                </ul>\n            </section>\n        ");
        resumeOutput.innerHTML = resumeHTML;
        var uniqueURL = "https://".concat(username, ".vercel.app/resume");
        shareableLinkInput.value = uniqueURL;
        shareSection.style.display = 'block';
        copyLinkButton.addEventListener('click', function () {
            shareableLinkInput.select();
            document.execCommand('copy');
        });
        downloadPDFButton.addEventListener('click', function () {
            var pdfContent = "\n                Name: ".concat(name, "\n\n                Email: ").concat(email, "\n\n                Phone: ").concat(phone, "\n\n                About Me: ").concat(aboutMe, "\n\n                Education: ").concat(education, "\n\n                Skills: ").concat(skills.join(', '), "\n\n                Work Experience: ").concat(workExperience, "\n\n                Projects: ").concat(projects.join(', '), "\n            ");
            var pdfBlob = new Blob([pdfContent], { type: 'application/pdf' });
            var pdfURL = URL.createObjectURL(pdfBlob);
            downloadPDFButton.setAttribute('href', pdfURL);
            downloadPDFButton.setAttribute('download', "".concat(name, "_Resume.pdf"));
        });
    });
});
