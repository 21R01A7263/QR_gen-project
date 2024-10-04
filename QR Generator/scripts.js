// Constants
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const QR_API_URL = "https://quickchart.io/chart?cht=qr&chs=350x350&chl=";

// DOM Elements
const titleElement = document.querySelector(".title");
const generateButton = document.getElementById("generate-btn");
const downloadButton = document.getElementById("download-btn");
const qrContentInput = document.getElementById("qr-content");
const qrImage = document.getElementById("qr-image");
const blob = document.getElementById("blob");

// Event Listeners
titleElement.addEventListener("mouseover", animateText);
generateButton.addEventListener("mouseover", animateText);
generateButton.addEventListener("click", generateQRCode);
downloadButton.addEventListener("click", downloadQRCode);
window.addEventListener("pointermove", moveBlob);
qrContentInput.addEventListener("input", handleInput);

// Text animation function
function animateText(event) {
  let iteration = 0;
  const originalText = event.target.dataset.value;

  clearInterval(event.target.interval);

  event.target.interval = setInterval(() => {
    event.target.innerText = originalText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return originalText[index];
        }
        return LETTERS[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= originalText.length) {
      clearInterval(event.target.interval);
    }

    iteration += 1 / (event.target === titleElement ? 1.4 : 2);
  }, 30);
}

// QR Code generation function
function generateQRCode() {
  const content = qrContentInput.value.trim();

  if (content === "") {
    alert("Please enter content for the QR code");
    return;
  }

  qrImage.src = `${QR_API_URL}${encodeURIComponent(content)}&chld=l|2`;
  qrImage.alt = `QR Code for: ${content}`;
  qrImage.style.opacity = "1";
  downloadButton.disabled = false;
}

// Blob animation function
function moveBlob(event) {
  const { clientX, clientY } = event;

  blob.animate(
    {
      left: `${clientX}px`,
      top: `${clientY}px`,
    },
    { duration: 3000, fill: "forwards" }
  );
}

// Handle input changes
function handleInput() {
  if (qrContentInput.value.trim() !== "") {
    generateButton.style.opacity = "1";
    generateButton.style.pointerEvents = "auto";
  } else {
    generateButton.style.opacity = "0.5";
    generateButton.style.pointerEvents = "none";
  }
}

// Download QR Code function
function downloadQRCode() {
  const link = document.createElement("a");
  link.download = "qrcode.png";
  link.href = qrImage.src;
  link.click();
}

// Initialize the page
function init() {
  handleInput();
  qrContentInput.focus();
}

init();
