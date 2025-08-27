// typing-animation.js
const text = `> cat ./skills.txt  
[+]SKILLSET: [andrej@cellsdividing:~]  

[!]CORE PROGRAMMING:  
  ├─ OOP (Python, Java)......▓▓▓▓▓▓▓▓░░░ 82%  
  ├─ JavaScript/ES6+.........▓▓▓▓▓▓▓▓▓░░ 90%  
  ├─ HTML5/CSS3..............▓▓▓▓▓▓▓▓▓▓░ 95%  
  └─ Functional Programming..▓▓▓▓▓▓▓░░░░ 60%  

[!]DESIGN/ART:  
  ├─ Pixel Art...............▓▓▓▓▓▓▓▓▓░ 88%  
  ├─ UI/UX Principles........▓▓▓▓▓▓░░░░ 70%  
  └─ Animation (CSS/JS)......▓▓▓▓▓░░░░░ 58%  

[!]SYSTEMS:  
  ├─ Git.....................▓▓▓▓▓▓▓▓░░ 85%  
  ├─ CLI Wizardry............▓▓▓▓▓▓▓▓▓░ 92%  
  └─ Browser DevTools........▓▓▓▓▓▓▓▓▓▓ 97%  

[+]SPECIALTIES:  
  │  [Clean code alchemist]
  │  [Responsive design bending]
  │  [Pixel-perfect CSS rituals] 
  │  [Vanilla JS optimization]

[-]WARNING: [Skillset dynamically expanding]  
[-]ADVISORY: [New abilities compile daily]   

> help --navigation
[+]DIRECTIVES:
  ├─ nc cellsdividing.net 1337
  ├─ ls ./projects
  ├─ ssh collab@cellsdividing.net
  └─ exit (not recommended)

  root@cellsdividing:~$ █`;

const element = document.getElementById("typing-text");
let i = 0;
let typingComplete = false;
const cursorChar = '<span style="border-left: 10px solidrgb(255, 255, 255); margin-left: 2px;"></span>'; // Cursor character
let cursorVisible = true;
let lineDelay = 0; // Extra delay after line breaks (ms)
let charDelay = 3;  // Delay between characters (ms)

// Define which lines should be links and their URLs
const linkLines = {
    "ls ./projects": "projects.html",
    "nc cellsdividing.net 1337": "home.html",
    "ssh collab@cellsdividing.net": "contact.html",
    "exit (not recommended)": "index.html"
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
            color: #99db48;
            text-decoration: none;
        }
        .terminal-link:hover {
            color: white;
            text-decoration: none;
        }
        .terminal-cursor {
            border-left: 10px solid #38c533;
            margin-left: 2px;
            animation: blink 1s step-end infinite;
        }
        .progress-bar {
            font-size: 0.7em;  /* Adjust this value to make smaller/larger */
            vertical-align: middle; /* Keeps them aligned with text */
            letter-spacing: -0.5px; /* Optional: tightens symbol spacing */
        }
        @keyframes blink {
            from, to { opacity: 1 }
            50% { opacity: 0 }
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