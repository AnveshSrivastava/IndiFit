const rotatingText = document.getElementById('rotating-text');
const texts = ['grow', 'connect', 'learn', 'buy and sell'];  // Change the text here as needed
let currentIndex = 0;
let currentText = '';
let isDeleting = false;
let textIndex = 0;

function rotateText() {
  if (isDeleting) {
    currentText = currentText.substring(0, currentText.length - 1); // Delete a letter
    rotatingText.textContent = currentText;

    if (currentText.length === 0) {
      isDeleting = false; // Start adding text once deletion is complete
      currentIndex = (currentIndex + 1) % texts.length; // Move to the next word
      setTimeout(rotateText, 500); // Wait before starting to add new text
      return;
    }
  } else {
    currentText = texts[currentIndex].substring(0, textIndex + 1); // Add a letter
    rotatingText.textContent = currentText;

    if (textIndex < texts[currentIndex].length - 1) {
      textIndex++;
    } else {
      isDeleting = true; // Start deleting after the full word is typed
      setTimeout(rotateText, 1500); // Wait before starting to delete
      return;
    }
  }
  setTimeout(rotateText, 300); // Adjust the speed of typing/deleting
}

// Start the animation when the page loads
window.addEventListener('DOMContentLoaded', rotateText);

