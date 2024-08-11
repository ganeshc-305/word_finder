function liveHighlightWord() {
    const paragraph = document.getElementById('paragraphInput').value;
    const word = document.getElementById('wordInput').value;
    const caseSensitive = document.getElementById('caseSensitive').checked;
    
    // Check if word is empty
    if (!word) {
        document.getElementById('result').innerHTML = paragraph;
        document.getElementById('wordInfo').innerHTML = '';
    }
    
    // Create the regular expression
    const flags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(`(${word})`, flags);
    
    // Count occurrences and find positions
    const matches = [...paragraph.matchAll(regex)];
    const count = matches.length;
    const positions = matches.map(match => match.index + 1); // 1-indexed positions
    
    // Highlight the word in the paragraph
    const highlightedParagraph = paragraph.replace(regex, '<span class="highlight">$1</span>');
    
    // Update the UI
    document.getElementById('result').innerHTML = highlightedParagraph;
    document.getElementById('wordInfo').innerHTML = 
        count > 0 
        ? `The word '${word}' appears ${count} time(s) at positions: ${positions.join(', ')}`
        : `The word '${word}' does not appear in the paragraph.`;
}

function clearInputs() {
    document.getElementById('paragraphInput').value = '';
    document.getElementById('wordInput').value = '';
    document.getElementById('caseSensitive').checked = false;
    document.getElementById('result').innerHTML = '';
    document.getElementById('wordInfo').innerHTML = '';
}


document.getElementById('theme-switch').addEventListener('change', function() {
    document.body.classList.toggle('dark');
});

function highlightWord() {
    let paragraphText = document.getElementById("paragraph-input").value;
    let wordToFind = document.getElementById("word-input").value;
    const isCaseSensitive = document.getElementById("case-sensitive").checked;

    if (!isCaseSensitive) {
        paragraphText = paragraphText.toLowerCase();
        wordToFind = wordToFind.toLowerCase();
    }

    const regex = new RegExp(`(${wordToFind})`, isCaseSensitive ? 'g' : 'gi');
    const highlightedText = paragraphText.replace(regex, '<span class="highlight">$1</span>');
    document.getElementById("result").innerHTML = highlightedText;

    const wordCount = (paragraphText.match(regex) || []).length;
    document.getElementById("word-info").textContent = `Found "${wordToFind}" ${wordCount} times.`;
}

// Trigger highlightWord function when inputs change
document.getElementById("word-input").addEventListener("input", highlightWord);
document.getElementById("paragraph-input").addEventListener("input", highlightWord);

// Refresh button functionality
document.getElementById("refresh-button").addEventListener("click", highlightWord);

// Clear button functionality
document.getElementById("clear-button").addEventListener("click", function() {
    document.getElementById("paragraph-input").value = "";
    document.getElementById("word-input").value = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("word-info").textContent = "";
});

