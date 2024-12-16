document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("a[data-page]");
    const contentDiv = document.getElementById("content");
  
    const loadPage = (pageUrl) => {
      fetch(pageUrl)
        .then((response) => {
          if (!response.ok) throw new Error("Page not found");
          return response.text();
        })
        .then((data) => {
          contentDiv.innerHTML = data;
          initializeSelect2();
        })
        .catch((error) => {
          contentDiv.innerHTML = `<h1>Error</h1><p>${error.message}</p>`;
        });
    };
  
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default navigation
        const pageUrl = event.target.getAttribute("data-page");
        loadPage(pageUrl);
      });
    });
  
    loadPage("Main/index.html");
  });
  
  function initializeAreoSpaceScrollSpy(element) {
    const sections = document.querySelectorAll(".aerospace-defence-section");
    const navLinks = document.querySelectorAll(".aerospace-defence-nav-link");
    sections.forEach((section) => {
      section.classList.remove("active");
    });
  
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });
  
    element.classList.add("active");
  }
  
  function initializeAboutUsScrollSpy(element) {
    const sections = document.querySelectorAll(".about-us-our-firm");
    const navLinks = document.querySelectorAll(".about-us-link");
    sections.forEach((section) => {
      section.classList.remove("active");
    });
  
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });
  
    element.classList.add("active");
  }
  
  function viewMoreParagraph(event, element) {
    event.preventDefault();
    let targetElementId = element.getAttribute("target-element");
  
    let targetElement = document.getElementById(targetElementId);
    let elementText = element.textContent;
    if (elementText === "Show More") {
      targetElement.style.display = "block";
      element.textContent = "Show Less";
    } else {
      targetElement.style.display = "none";
      element.textContent = "Show More";
    }
  }
  
  function initializeSelect2() {
    $("#industry-select").select2({
      placeholder: "Select Industry",
      allowClear: true,
    });
  
    $("#industry-select").on("change", function () {
      const value = $(this).val();
      if (!value) {
        $("#error-message").removeClass("d-none");
      } else {
        $("#error-message").addClass("d-none");
      }
    });
  }
  
  function readyToTalkSubmit() {
    debugger;
    const emailInput = document.getElementById("email-input");
    const errorMessage = document.getElementById("email-error");
    const emailValue = emailInput.value.trim();
  
    // Simple validation
    if (emailValue === "" || !emailValue.includes("@")) {
      errorMessage.classList.remove("d-none");
    } else {
      errorMessage.classList.add("d-none");
      alert("Thank you! Your details have been submitted.");
    }
  }
  
  emailjs.init({
    publicKey: "ABuQFq_B58CjqRqnS", // Replace with your actual public key
    // blockHeadless: true,  // Optional: Block headless browsers for security
    blockList: {
      list: ["foo@emailjs.com", "bar@emailjs.com"], // Optional: Block specific emails
      watchVariable: "email", // Match the form variable name
    },
    limitRate: {
      id: "app", // Application ID (optional)
      throttle: 10000, // 1 request per 10 seconds
    },
  });
  
  
  
  
  // Function to send email on form submission
  function sendEmail(event) {
    event.preventDefault(); // Prevent default form submission
  
    // Capture form data
    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;
    const company = document.getElementById("contact-company").value;
    const subject = document.getElementById("contact-subject").value;
    const message = document.getElementById("contact-message").value;
  
    if (name === "" || email === "") {
      alert("Please fill in both the Name and Email fields.");
      return; // Stop the function from continuing
    }
    const formattedMessage =
      "Sender: " +
      name +
      "\n" +
      "Email: " +
      email +
      "\n" +
      "Message:\n" +
      message;
  
    // Template parameters
    var templateParams = {
      name: name,
      email: email,
      subject: subject,
      message: message,
      company:company
    };
  
    // Send email using EmailJS
    emailjs.send("service_ordrphg", "template_q1qlymp", templateParams).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("Message sent successfully!");
      },
      (error) => {
        console.log("FAILED...", error);
        alert("Failed to send message. Please try again.");
      }
    );
  
    // Optionally reset the form after submission
    document.getElementById("contactForm").reset();
  }
  