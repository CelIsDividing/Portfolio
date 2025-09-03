// typing-animation.js
const text = `I've been programming for as long as I can remember. 


It all started with QBasic and Pascal back in the day, and 
I've been hooked ever since. Over the years, I've worked 
with all sorts of languages - Java, JavaScript, C++, 
Python, SQL - you name it.


If you didn't already guess, I specialize in backend 
development, but I've dipped my fingers in some frontend 
as well.

(like this portfolio page I made)


When I'm not coding, I love drawing pixel art and making 
video games. I've used both GameMaker Studio and Unreal Engine 
for my projects. There's something really satisfying about 
building entire worlds from scratch and watching people 
enjoy what you've created.

(currently working on my second one so far)


I'm always keeping myself bussy with something new, whether 
it's a programming challenge or an art project. I just enjoy 
the process of making things work and bringing at least some 
of my ideas to life.


PROJECTS
SKILLS
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
    "SKILLS": "skills.html",
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

        // Add styling for specific phrases
        if (line.includes("(like this portfolio page I made)")) {
            lines[j] = lines[j].replace("(like this portfolio page I made)", 
                '<span class="gray-text">(like this portfolio page I made)</span>');
        }
        
        if (line.includes("(currently working on my second one so far)")) {
            lines[j] = lines[j].replace("(currently working on my second one so far)", 
                '<span class="gray-text">(currently working on my second one so far)</span>');
        }


        if (line.includes("QBasic")) {
            lines[j] = lines[j].replace("QBasic", 
                '<span class="pink-text">QBasic</span>');
        }

        if (line.includes("Pascal")) {
            lines[j] = lines[j].replace("Pascal", 
                '<span class="pink-text">Pascal</span>');
        }

        if (line.includes("Java")) {
            lines[j] = lines[j].replace("Java", 
                '<span class="turquoise-text">Java</span>');
        }

        if (line.includes("JavaScript")) {
            lines[j] = lines[j].replace("JavaScript", 
                '<span class="turquoise-text">JavaScript</span>');
        }

        if (line.includes("C++")) {
            lines[j] = lines[j].replace("C++", 
                '<span class="turquoise-text">C++</span>');
        }

        if (line.includes("Python")) {
            lines[j] = lines[j].replace("Python", 
                '<span class="turquoise-text">Python</span>');
        }

        if (line.includes("SQL")) {
            lines[j] = lines[j].replace("SQL", 
                '<span class="turquoise-text">SQL</span>');
        }

        if (line.includes("I specialize in backend")) {
            lines[j] = lines[j].replace("I specialize in backend", 
                '<span class="turquoise-text">I specialize in backend</span>');
        }

        if (line.includes("development")) {
            lines[j] = lines[j].replace("development", 
                '<span class="turquoise-text">development</span>');
        }

        if (line.includes("I love drawing pixel art and making")) {
            lines[j] = lines[j].replace("I love drawing pixel art and making", 
                '<span class="turquoise-text">I love drawing pixel art and making</span>');
        }

        if (line.includes("video games")) {
            lines[j] = lines[j].replace("video games", 
                '<span class="turquoise-text">video games</span>');
        }

        if (line.includes("GameMaker Studio")) {
            lines[j] = lines[j].replace("GameMaker Studio", 
                '<span class="pink-text">GameMaker Studio</span>');
        }

        if (line.includes("Unreal Engine")) {
            lines[j] = lines[j].replace("Unreal Engine", 
                '<span class="pink-text">Unreal Engine</span>');
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
        .terminal-cursor {
            border-left: 10px solid #38c533;
            margin-left: 2px;
            animation: blink 1s step-end infinite;
        }
        @keyframes blink {
            from, to { opacity: 1 }
            50% { opacity: 0 }
        }
        .gray-text {
            color: #979797;
            font-style: italic;
        }
        .red-text {
            color: #ff1717;
            weight: bold;
        }
        .blue-text {
            color: #2712ff;
            weight: bold;
        }
        .pink-text {
            color: #ff22e2;
            weight: bold;
        }
        .turquoise-text {
            color: #46f7ff;
            weight: bold;
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