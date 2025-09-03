const text = `
Some of the core skills I developed over the years:


CORE PROGRAMMING:  
  ├─ OOP (Python, Java)......▓▓▓▓▓▓▓▓▓▓░ 95%  
  ├─ JavaScript/ES6+.........▓▓▓▓▓▓▓▓▓░░ 85%  
  ├─ HTML5/CSS3..............▓▓▓▓▓▓▓░░░░ 60%  
  └─ Functional Programming..▓▓▓▓▓▓▓▓░░░ 70%  

DESIGN/ART:  
  ├─ Pixel Art...............▓▓▓▓▓▓▓▓▓▓░ 95%  
  ├─ UI/UX Principles........▓▓▓▓▓▓▓▓░░░ 70%  
  └─ Animation (CSS/JS)......▓▓▓▓▓░░░░░░ 50%  

SYSTEMS:  
  ├─ Git.....................▓▓▓▓▓▓▓▓░░ 85%  
  ├─ CLI Wizardry............▓▓▓▓▓▓▓▓▓░ 90%  
  └─ Browser DevTools........▓▓▓▓▓▓▓▓▓▓ 99%  


                                           PROJECTS
                                             INFO
                                           CONTACTS
                                             EXIT 
`;

const element = document.getElementById("typing-text");
let i = 0;
let typingComplete = false;
const cursorChar = '<span style="border-left: 10px solidrgb(255, 255, 255); margin-left: 2px;"></span>'; // Cursor character
let cursorVisible = true;
let lineDelay = 0; // Extra delay after line breaks (ms)
let charDelay = 3;  // Delay between characters (ms)

// Define which lines should be links and their URLs
const linkLines = {
    "PROJECTS": "projects.html",
    "INFO": "home.html",
    "CONTACTS": "contact.html",
    "EXIT": "index.html"
};

function processTextWithLinks(displayedText, includeCursor = true) {
    // Split the text into lines
    let lines = displayedText.split('\n');
    
    // Process each line
    for (let j = 0; j < lines.length; j++) {
        const line = lines[j].trim();
        
        // Check if this line matches any of our link patterns
        for (const [linkText, linkUrl] of Object.entries(linkLines)) {
            if (line.includes(linkText)) {
                // Replace the text with a link
                lines[j] = lines[j].replace(linkText, 
                    `<a href="${linkUrl}" class="terminal-link">${linkText}</a>`);
                break;
            }
        }
        
        // Add this block to shrink progress bars
        if (line.includes('▓') || line.includes('▒') || line.includes('░')) {
            lines[j] = lines[j].replace(/([▓▒░]+)/g, '<span class="progress-bar">$1</span>');
        }
    }
    
    // Join the lines back together
    let result = lines.join('\n').replace(/\n/g, '<br>');
    if (includeCursor && cursorVisible) {
        result += cursorChar;
    }
    return result;
}

function typeWriter() {
    if (i < text.length) {
        const currentText = text.substring(0, i);
        element.innerHTML = processTextWithLinks(currentText);
        i++;
        setTimeout(typeWriter, charDelay);
    } else {
        // Final render with all links and no cursor
        typingComplete = true;
        element.innerHTML = processTextWithLinks(text, false);
    }
}


// Initialize
window.onload = function() {

    const style = document.createElement('style');
    style.textContent = `
        .terminal-link {
            color: #ff0000ff;
            text-decoration: none;
        }
        .terminal-link:hover {
            color: white;
            text-decoration: none;
        }
        .progress-bar {
            font-size: 0.7em;  /* Adjust this value to make smaller/larger */
            vertical-align: middle; /* Keeps them aligned with text */
            letter-spacing: -0.5px; /* Optional: tightens symbol spacing */
        }
    `;
    document.head.appendChild(style);
  // Start typing
  typeWriter();
  
  // Cursor blink effect
  setInterval(() => {
        if (!typingComplete) {
            cursorVisible = !cursorVisible;
            const currentText = text.substring(0, i);
            element.innerHTML = processTextWithLinks(currentText);
        }
    }, 500);
};