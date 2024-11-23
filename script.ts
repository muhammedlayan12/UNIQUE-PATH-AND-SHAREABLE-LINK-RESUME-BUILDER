document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm') as HTMLFormElement;
    const resumeOutput = document.getElementById('resumeOutput') as HTMLDivElement;
    const shareSection = document.getElementById('shareSection') as HTMLDivElement;
    const shareableLinkInput = document.getElementById('shareableLink') as HTMLInputElement;
    const copyLinkButton = document.getElementById('copyLink') as HTMLButtonElement;
    const downloadPDFButton = document.getElementById('downloadPDF') as HTMLAnchorElement;

    form.addEventListener('submit', (event: Event) => {
        event.preventDefault();

        const name = (document.getElementById('name') as HTMLInputElement).value;
        const username = (document.getElementById('username') as HTMLInputElement).value.trim().toLowerCase();
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const aboutMe = (document.getElementById('aboutMe') as HTMLTextAreaElement).value;
        const education = (document.getElementById('education') as HTMLTextAreaElement).value;
        const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',').map(skill => skill.trim());
        const workExperience = (document.getElementById('workExperience') as HTMLTextAreaElement).value;
        const projects = (document.getElementById('projects') as HTMLTextAreaElement).value.split(',').map(project => project.trim());

       
        
        const resumeHTML = `
            <header class="personal-info editable" contenteditable="true">
                <h1>${name}</h1>
                <p>Email: <a href="mailto:${email}">${email}</a></p>
                <p>Phone: <a href="tel:${phone}">${phone}</a></p>
            </header>
            <section class="about-me editable" contenteditable="true">
                <h2>About Me</h2>
                <p>${aboutMe}</p>
            </section>
            <section class="education editable" contenteditable="true">
                <h2>Education</h2>
                <p>${education}</p>
            </section>
            <section class="skills editable" contenteditable="true">
                <h2>Skills</h2>
                <ul>
                    ${skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            </section>
            <section class="work-experience editable" contenteditable="true">
                <h2>Work Experience</h2>
                <p>${workExperience}</p>
            </section>
            <section class="projects editable" contenteditable="true">
                <h2>Projects</h2>
                <ul>
                    ${projects.map(project => `<li>${project}</li>`).join('')}
                </ul>
            </section>
        `;

      
        
        resumeOutput.innerHTML = resumeHTML;

        

        const uniqueURL = `https://${username}.vercel.app/resume`;
        shareableLinkInput.value = uniqueURL;
        shareSection.style.display = 'block';


        
        copyLinkButton.addEventListener('click', () => {
            shareableLinkInput.select();
            document.execCommand('copy');
        });


        
        downloadPDFButton.addEventListener('click', () => {
            const pdfContent = `
                Name: ${name}\n
                Email: ${email}\n
                Phone: ${phone}\n
                About Me: ${aboutMe}\n
                Education: ${education}\n
                Skills: ${skills.join(', ')}\n
                Work Experience: ${workExperience}\n
                Projects: ${projects.join(', ')}
            `;
            const pdfBlob = new Blob([pdfContent], { type: 'application/pdf' });
            const pdfURL = URL.createObjectURL(pdfBlob);
            downloadPDFButton.setAttribute('href', pdfURL);
            downloadPDFButton.setAttribute('download', `${name}_Resume.pdf`);
        });
    });
});
