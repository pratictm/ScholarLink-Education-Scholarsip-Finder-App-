// Main JavaScript file

// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")
  const authButtons = document.querySelector(".auth-buttons")

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")

      // Create mobile menu if it doesn't exist
      let mobileMenu = document.querySelector(".mobile-menu")

      if (!mobileMenu) {
        mobileMenu = document.createElement("div")
        mobileMenu.classList.add("mobile-menu")

        // Clone nav links and auth buttons for mobile menu
        const navLinksClone = navLinks.cloneNode(true)
        const authButtonsClone = authButtons.cloneNode(true)

        mobileMenu.appendChild(navLinksClone)
        mobileMenu.appendChild(authButtonsClone)

        // Insert after header
        const header = document.querySelector("header")
        header.parentNode.insertBefore(mobileMenu, header.nextSibling)
      }

      // Toggle mobile menu visibility
      mobileMenu.classList.toggle("show")
    })
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    const mobileMenu = document.querySelector(".mobile-menu")
    const hamburger = document.querySelector(".hamburger")

    if (mobileMenu && hamburger && !hamburger.contains(event.target) && !mobileMenu.contains(event.target)) {
      mobileMenu.classList.remove("show")
      hamburger.classList.remove("active")
    }
  })

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })
})

// Add CSS for mobile menu
document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style")
  style.textContent = `
        .mobile-menu {
            display: none;
            flex-direction: column;
            background-color: white;
            padding: 1rem;
            box-shadow: var(--shadow-md);
        }
        
        .mobile-menu.show {
            display: flex;
        }
        
        .mobile-menu .nav-links {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .mobile-menu .auth-buttons {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        
        @media (min-width: 769px) {
            .mobile-menu {
                display: none !important;
            }
        }
    `
  document.head.appendChild(style)
})

