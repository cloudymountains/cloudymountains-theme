document.addEventListener('DOMContentLoaded', function() {
  // Get all code blocks
  const codeBlocks = document.querySelectorAll('pre code');
  
  // Add copy button to each code block
  codeBlocks.forEach(block => {
    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.innerHTML = `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
      </svg>
    `;
    
    // Add click event listener
    copyButton.addEventListener('click', async () => {
      try {
        // Get the code content
        const code = block.textContent;
        
        // Copy to clipboard
        await navigator.clipboard.writeText(code);
        
        // Update button icon
        const originalIcon = copyButton.innerHTML;
        copyButton.innerHTML = `
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
        `;
        
        // Reset button icon after 2 seconds
        setTimeout(() => {
          copyButton.innerHTML = originalIcon;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
        copyButton.innerHTML = `
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        `;
        setTimeout(() => {
          copyButton.innerHTML = originalIcon;
        }, 2000);
      }
    });
    
    // Add button to the pre element
    block.parentNode.appendChild(copyButton);
  });
}); 