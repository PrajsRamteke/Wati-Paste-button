/** @format */

(function () {
  "use strict";

  // Create the paste button
  var pasteButton = document.createElement("div");
  pasteButton.innerHTML = '<i class="fas fa-clipboard"></i>';
  Object.assign(pasteButton.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "40px",
    height: "40px",
    backgroundColor: "#25D366",
    color: "#fff",
    cursor: "pointer",
    zIndex: "9999",
    borderRadius: "50%",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    fontSize: "24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  // Add hover effect
  pasteButton.addEventListener("mouseover", function () {
    pasteButton.style.backgroundColor = "#34D480";
  });

  pasteButton.addEventListener("mouseout", function () {
    pasteButton.style.backgroundColor = "#25D366";
  });

  // Add an event listener to handle the paste action
  pasteButton.addEventListener("click", function () {
    var inputField = document.querySelector(
      ".px-4.py-1.border.rounded-md.w-full.md\\:w-auto.mb-2.md\\:mb-0.md\\:mr-2"
    );
    if (inputField) {
      navigator.clipboard.readText().then(function (clipboardText) {
        inputField.value = clipboardText;
      });
    }
  });

  // Append the paste button to the body
  document.body.appendChild(pasteButton);

  // Function to handle button dragging
  function handleDrag(event) {
    event.preventDefault();
    var startX = event.clientX;
    var startY = event.clientY;
    var initialX = parseFloat(getComputedStyle(pasteButton).right);
    var initialY = parseFloat(getComputedStyle(pasteButton).bottom);

    function moveButton(event) {
      var deltaX = event.clientX - startX;
      var deltaY = event.clientY - startY;
      pasteButton.style.right = initialX - deltaX + "px";
      pasteButton.style.bottom = initialY - deltaY + "px";
    }

    function stopDragging() {
      document.removeEventListener("mousemove", moveButton);
      document.removeEventListener("mouseup", stopDragging);
    }

    document.addEventListener("mousemove", moveButton);
    document.addEventListener("mouseup", stopDragging);
  }

  // Add drag functionality to the button
  pasteButton.addEventListener("mousedown", handleDrag);
})();
