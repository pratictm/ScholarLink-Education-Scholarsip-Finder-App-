// Authentication related JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Toggle password visibility
  const togglePassword = document.querySelectorAll(".toggle-password")

  togglePassword.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const passwordInput = this.previousElementSibling
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
      passwordInput.setAttribute("type", type)

      // Toggle eye icon
      const eyeIcon = this.querySelector("i")
      eyeIcon.classList.toggle("fa-eye")
      eyeIcon.classList.toggle("fa-eye-slash")
    })
  })

  // Password strength meter
  const passwordInput = document.getElementById("password")
  const strengthMeter = document.querySelector(".strength-meter span")
  const strengthText = document.querySelector(".strength-text span")

  if (passwordInput && strengthMeter && strengthText) {
    passwordInput.addEventListener("input", function () {
      const password = this.value
      let strength = 0
      let status = ""

      if (password.length >= 8) strength += 1
      if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1
      if (password.match(/\d/)) strength += 1
      if (password.match(/[^a-zA-Z\d]/)) strength += 1

      switch (strength) {
        case 0:
          strengthMeter.style.width = "10%"
          strengthMeter.style.backgroundColor = "var(--error)"
          status = "Very Weak"
          break
        case 1:
          strengthMeter.style.width = "25%"
          strengthMeter.style.backgroundColor = "var(--error)"
          status = "Weak"
          break
        case 2:
          strengthMeter.style.width = "50%"
          strengthMeter.style.backgroundColor = "var(--warning)"
          status = "Fair"
          break
        case 3:
          strengthMeter.style.width = "75%"
          strengthMeter.style.backgroundColor = "var(--secondary-color)"
          status = "Good"
          break
        case 4:
          strengthMeter.style.width = "100%"
          strengthMeter.style.backgroundColor = "var(--success)"
          status = "Strong"
          break
      }

      strengthText.textContent = status
    })
  }

  // Form validation
  const loginForm = document.getElementById("login-form")
  const signupForm = document.getElementById("signup-form")

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      // Simple validation
      if (!email || !password) {
        showNotification("Please fill in all fields", "error")
        return
      }

      // Simulate login (frontend only)
      simulateLogin(email, password)
    })
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const fullname = document.getElementById("fullname").value
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      const educationLevel = document.getElementById("education-level").value
      const termsChecked = document.getElementById("terms").checked

      // Simple validation
      if (!fullname || !email || !password || !educationLevel) {
        showNotification("Please fill in all required fields", "error")
        return
      }

      if (!termsChecked) {
        showNotification("Please agree to the Terms of Service", "error")
        return
      }

      // Simulate signup (frontend only)
      simulateSignup(fullname, email, password, educationLevel)
    })
  }

  // Simulate login (frontend only)
  function simulateLogin(email, password) {
    // In a real app, this would be an API call
    setTimeout(() => {
      // For demo purposes, any login succeeds
      const user = {
        email: email,
        name: email.split("@")[0], // Just use part of email as name for demo
        isLoggedIn: true,
      }

      // Save to localStorage
      localStorage.setItem("scholarNepalUser", JSON.stringify(user))

      showNotification("Login successful! Redirecting...", "success")

      // Redirect to dashboard or home page
      setTimeout(() => {
        window.location.href = "index.html"
      }, 1500)
    }, 1000)
  }

  // Simulate signup (frontend only)
  function simulateSignup(fullname, email, password, educationLevel) {
    // In a real app, this would be an API call
    setTimeout(() => {
      // For demo purposes, any signup succeeds
      const user = {
        name: fullname,
        email: email,
        educationLevel: educationLevel,
        isLoggedIn: true,
      }

      // Save to localStorage
      localStorage.setItem("scholarNepalUser", JSON.stringify(user))

      showNotification("Account created successfully! Redirecting...", "success")

      // Redirect to dashboard or home page
      setTimeout(() => {
        window.location.href = "index.html"
      }, 1500)
    }, 1000)
  }

  // Notification function
  function showNotification(message, type) {
    // Create notification element if it doesn't exist
    let notification = document.querySelector(".notification")

    if (!notification) {
      notification = document.createElement("div")
      notification.classList.add("notification")
      document.body.appendChild(notification)

      // Add CSS for notification
      const style = document.createElement("style")
      style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 1rem 1.5rem;
                    border-radius: var(--border-radius-md);
                    color: white;
                    font-weight: 500;
                    z-index: 1000;
                    opacity: 0;
                    transform: translateY(-20px);
                    transition: opacity 0.3s, transform 0.3s;
                    box-shadow: var(--shadow-md);
                }
                
                .notification.show {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .notification.success {
                    background-color: var(--success);
                }
                
                .notification.error {
                    background-color: var(--error);
                }
                
                .notification.info {
                    background-color: var(--info);
                }
            `
      document.head.appendChild(style)
    }

    // Set notification content and type
    notification.textContent = message
    notification.className = "notification"
    notification.classList.add(type)

    // Show notification
    setTimeout(() => {
      notification.classList.add("show")
    }, 10)

    // Hide notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove("show")
    }, 3000)
  }

  // Check if user is logged in
  function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem("scholarNepalUser"))

    if (user && user.isLoggedIn) {
      // Update auth buttons to show user info
      const authButtons = document.querySelector(".auth-buttons")

      if (authButtons) {
        authButtons.innerHTML = `
                    <div class="user-menu">
                        <button class="user-button">
                            <span>${user.name}</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <div class="user-dropdown">
                            <a href="dashboard.html">Dashboard</a>
                            <a href="profile.html">Profile</a>
                            <a href="saved-scholarships.html">Saved Scholarships</a>
                            <a href="#" id="logout-button">Logout</a>
                        </div>
                    </div>
                `

        // Add CSS for user menu
        const style = document.createElement("style")
        style.textContent = `
                    .user-menu {
                        position: relative;
                    }
                    
                    .user-button {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        background: none;
                        border: none;
                        cursor: pointer;
                        color: var(--text-dark);
                        font-weight: 500;
                    }
                    
                    .user-dropdown {
                        position: absolute;
                        top: 100%;
                        right: 0;
                        background-color: white;
                        border-radius: var(--border-radius-md);
                        box-shadow: var(--shadow-md);
                        min-width: 200px;
                        z-index: 100;
                        display: none;
                        overflow: hidden;
                    }
                    
                    .user-dropdown.show {
                        display: block;
                    }
                    
                    .user-dropdown a {
                        display: block;
                        padding: 0.75rem 1rem;
                        color: var(--text-dark);
                        transition: background-color var(--transition-fast);
                    }
                    
                    .user-dropdown a:hover {
                        background-color: var(--background-light);
                    }
                `
        document.head.appendChild(style)

        // Toggle user dropdown
        const userButton = document.querySelector(".user-button")
        const userDropdown = document.querySelector(".user-dropdown")

        userButton.addEventListener("click", () => {
          userDropdown.classList.toggle("show")
        })

        // Close dropdown when clicking outside
        document.addEventListener("click", (event) => {
          if (!userButton.contains(event.target) && !userDropdown.contains(event.target)) {
            userDropdown.classList.remove("show")
          }
        })

        // Logout functionality
        document.getElementById("logout-button").addEventListener("click", (e) => {
          e.preventDefault()

          // Clear user data
          localStorage.removeItem("scholarNepalUser")

          showNotification("Logged out successfully!", "success")

          // Redirect to home page
          setTimeout(() => {
            window.location.href = "index.html"
          }, 1500)
        })
      }
    }
  }

  // Check login status on page load
  checkLoginStatus()
})

