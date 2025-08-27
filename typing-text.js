// typing-animation.js
const text = `$ nc cellsdividing.net 1337
Connected to [CellsDividing Terminal v3.1.4]
User: guest@anonymous
Access: read-only
Last login: Thu Jun 13 14:37:42 UTC 2024

> system_msg --priority high
[+]SYSTEM: [Welcome to the deeper layers]
[+]SYSTEM: [This is where code bends to curiosity]
[+]SYSTEM: [where ideas compile into reality]

> whois andrej
[+]USER: [andrej]
[+]TYPE: [Builder/Coder/PixelArtist]
[+]SPECIALIZATION: [Full-stack reality manipulation]
[+]MOTIVATION: [challenge=85% fun=10% profit=5% (optional)]

> scan --intent --user=guest
SCAN RESULTS:
[ ] Talent scout
[ ] Collaboration request
[x] Curious wandering (confidence: 97.3%)

> auth --check
[+]AUTH: [No credentials required]
[+]AUTH: [Session granted (restricted)]
[+]SYSTEM: [Glad you found your way here.]

> help --navigation
[+]DIRECTIVES:
  ├─ ls ./projects
  ├─ cat ./skills.txt
  ├─ ssh collab@cellsdividing.net
  └─ exit (not recommended)

> sysmon --status
[-]WARNING: [High curiosity levels detected]
[-]ADVISORY: [Proceed with caution]

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
    "cat ./skills.txt": "skills.html",
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