// Scholarships page JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Sample scholarship data (in a real app, this would come from an API)
  const scholarships = [
    {
      id: 1,
      title: "Nepal Government Merit Scholarship",
      provider: "Ministry of Education, Nepal",
      level: "higher-secondary",
      type: "government",
      amount: "NPR 100,000",
      deadline: "2023-12-15",
      location: "Nepal",
      tags: ["Merit-based", "Nepali Students", "All Subjects"],
      image: "government.jpg",
    },
    {
      id: 2,
      title: "Tribhuvan University Excellence Award",
      provider: "Tribhuvan University",
      level: "undergraduate",
      type: "merit",
      amount: "Full Tuition",
      deadline: "2023-11-30",
      location: "Kathmandu",
      tags: ["Merit-based", "Engineering", "Science"],
      image: "university.jpg",
    },
    {
      id: 3,
      title: "Kathmandu Valley School Scholarship",
      provider: "Kathmandu Valley School",
      level: "secondary",
      type: "need",
      amount: "NPR 50,000",
      deadline: "2023-12-05",
      location: "Kathmandu",
      tags: ["Need-based", "Secondary Education"],
      image: "school.jpg",
    },
    {
      id: 4,
      title: "STEM Excellence Scholarship",
      provider: "Nepal Science Foundation",
      level: "undergraduate",
      type: "merit",
      amount: "NPR 200,000",
      deadline: "2024-01-15",
      location: "Nepal",
      tags: ["STEM", "Research", "Innovation"],
      image: "stem.jpg",
    },
    {
      id: 5,
      title: "Future Leaders of Nepal",
      provider: "Leadership Nepal NGO",
      level: "higher-secondary",
      type: "private",
      amount: "NPR 75,000",
      deadline: "2023-11-25",
      location: "Multiple Locations",
      tags: ["Leadership", "Community Service"],
      image: "leadership.jpg",
    },
    {
      id: 6,
      title: "Fulbright Scholarship for Nepali Students",
      provider: "U.S. Embassy in Nepal",
      level: "postgraduate",
      type: "international",
      amount: "Full Scholarship",
      deadline: "2024-02-28",
      location: "United States",
      tags: ["International", "Graduate Studies", "Research"],
      image: "international.jpg",
    },
    {
      id: 7,
      title: "Primary Education Support Program",
      provider: "Education for All Nepal",
      level: "primary",
      type: "need",
      amount: "NPR 25,000",
      deadline: "2023-12-10",
      location: "Rural Nepal",
      tags: ["Primary Education", "Rural Students", "Need-based"],
      image: "primary.jpg",
    },
    {
      id: 8,
      title: "Women in Technology Scholarship",
      provider: "Tech Nepal Association",
      level: "undergraduate",
      type: "private",
      amount: "NPR 150,000",
      deadline: "2024-01-05",
      location: "Nepal",
      tags: ["Women", "Technology", "Computer Science"],
      image: "women-tech.jpg",
    },
    {
      id: 9,
      title: "Australia Awards Scholarships",
      provider: "Australian Government",
      level: "postgraduate",
      type: "international",
      amount: "Full Scholarship",
      deadline: "2024-03-15",
      location: "Australia",
      tags: ["International", "Master's Degree", "PhD"],
      image: "australia.jpg",
    },
    {
      id: 10,
      title: "Kathmandu Medical College Scholarship",
      provider: "Kathmandu Medical College",
      level: "undergraduate",
      type: "merit",
      amount: "50% Tuition Waiver",
      deadline: "2023-12-20",
      location: "Kathmandu",
      tags: ["Medical", "Healthcare", "MBBS"],
      image: "medical.jpg",
    },
    {
      id: 11,
      title: "Rural Education Initiative",
      provider: "Nepal Rural Development Foundation",
      level: "secondary",
      type: "need",
      amount: "NPR 40,000",
      deadline: "2023-11-30",
      location: "Rural Nepal",
      tags: ["Rural Students", "Secondary Education"],
      image: "rural.jpg",
    },
    {
      id: 12,
      title: "Arts and Culture Scholarship",
      provider: "Nepal Arts Council",
      level: "undergraduate",
      type: "merit",
      amount: "NPR 80,000",
      deadline: "2024-01-10",
      location: "Nepal",
      tags: ["Arts", "Culture", "Creative Fields"],
      image: "arts.jpg",
    },
    {
      id: 13,
      title: "Pokhara University Merit Scholarship",
      provider: "Pokhara University",
      level: "undergraduate",
      type: "merit",
      amount: "Full Tuition",
      deadline: "2023-12-15",
      location: "Pokhara",
      tags: ["Merit-based", "All Disciplines"],
      image: "pokhara.jpg",
    },
    {
      id: 14,
      title: "Japan MEXT Scholarship",
      provider: "Japanese Government",
      level: "postgraduate",
      type: "international",
      amount: "Full Scholarship",
      deadline: "2024-05-20",
      location: "Japan",
      tags: ["International", "Research", "Graduate Studies"],
      image: "japan.jpg",
    },
    {
      id: 15,
      title: "Entrepreneurship Development Fund",
      provider: "Nepal Chamber of Commerce",
      level: "higher-secondary",
      type: "private",
      amount: "NPR 120,000",
      deadline: "2024-02-10",
      location: "Nepal",
      tags: ["Entrepreneurship", "Business", "Innovation"],
      image: "entrepreneur.jpg",
    },
  ]

  // Render scholarship cards
  function renderScholarships(scholarshipsToRender) {
    const scholarshipList = document.getElementById("scholarship-list")
    scholarshipList.innerHTML = ""

    if (scholarshipsToRender.length === 0) {
      scholarshipList.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                    <h3>No scholarships found</h3>
                    <p>Try adjusting your filters or search terms</p>
                </div>
            `
      return
    }

    scholarshipsToRender.forEach((scholarship) => {
      // Calculate days remaining until deadline
      const deadlineDate = new Date(scholarship.deadline)
      const today = new Date()
      const daysRemaining = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24))

      // Create deadline text
      let deadlineText = ""
      if (daysRemaining < 0) {
        deadlineText = "Deadline passed"
      } else if (daysRemaining === 0) {
        deadlineText = "Deadline is today!"
      } else if (daysRemaining === 1) {
        deadlineText = "1 day remaining"
      } else {
        deadlineText = `${daysRemaining} days remaining`
      }

      // Create scholarship card
      const card = document.createElement("div")
      card.classList.add("scholarship-card")

      card.innerHTML = `
                <div class="scholarship-image">
                    <i class="fas fa-graduation-cap"></i>
                </div>
                <div class="scholarship-content">
                    <h3 class="scholarship-title">${scholarship.title}</h3>
                    <p class="scholarship-provider">${scholarship.provider}</p>
                    
                    <div class="scholarship-details">
                        <div class="scholarship-detail">
                            <i class="fas fa-money-bill-wave"></i>
                            <span>${scholarship.amount}</span>
                        </div>
                        <div class="scholarship-detail">
                            <i class="fas fa-calendar-alt"></i>
                            <span>${deadlineText}</span>
                        </div>
                        <div class="scholarship-detail">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${scholarship.location}</span>
                        </div>
                    </div>
                    
                    <div class="scholarship-tags">
                        ${scholarship.tags.map((tag) => `<span class="scholarship-tag">${tag}</span>`).join("")}
                    </div>
                    
                    <div class="scholarship-actions">
                        <button class="btn btn-primary">View Details</button>
                        <button class="btn btn-outline save-scholarship" data-id="${scholarship.id}">
                            <i class="far fa-bookmark"></i>
                        </button>
                    </div>
                </div>
            `

      scholarshipList.appendChild(card)
    })

    // Update scholarship count
    document.getElementById("scholarship-count").textContent = scholarshipsToRender.length

    // Add event listeners to save buttons
    document.querySelectorAll(".save-scholarship").forEach((button) => {
      button.addEventListener("click", function () {
        const scholarshipId = this.getAttribute("data-id")
        saveScholarship(scholarshipId)

        // Toggle bookmark icon
        const icon = this.querySelector("i")
        icon.classList.toggle("far")
        icon.classList.toggle("fas")

        if (icon.classList.contains("fas")) {
          showNotification("Scholarship saved!", "success")
        } else {
          showNotification("Scholarship removed from saved list", "info")
        }
      })
    })
  }

  // Save scholarship to localStorage
  function saveScholarship(scholarshipId) {
    const savedScholarships = JSON.parse(localStorage.getItem("savedScholarships")) || []

    const index = savedScholarships.indexOf(scholarshipId)

    if (index === -1) {
      // Add to saved scholarships
      savedScholarships.push(scholarshipId)
    } else {
      // Remove from saved scholarships
      savedScholarships.splice(index, 1)
    }

    localStorage.setItem("savedScholarships", JSON.stringify(savedScholarships))
  }

  // Filter scholarships based on selected filters
  function filterScholarships() {
    let filteredScholarships = [...scholarships]

    // Get selected education levels
    const selectedLevels = Array.from(document.querySelectorAll('input[name="level"]:checked')).map(
      (input) => input.value,
    )

    if (selectedLevels.length > 0) {
      filteredScholarships = filteredScholarships.filter((scholarship) => selectedLevels.includes(scholarship.level))
    }

    // Get selected scholarship types
    const selectedTypes = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(
      (input) => input.value,
    )

    if (selectedTypes.length > 0) {
      filteredScholarships = filteredScholarships.filter((scholarship) => selectedTypes.includes(scholarship.type))
    }

    // Get search input
    const searchTerm = document.getElementById("search-input").value.toLowerCase()

    if (searchTerm) {
      filteredScholarships = filteredScholarships.filter(
        (scholarship) =>
          scholarship.title.toLowerCase().includes(searchTerm) ||
          scholarship.provider.toLowerCase().includes(searchTerm) ||
          scholarship.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
      )
    }

    // Sort scholarships
    const sortBy = document.getElementById("sort-by").value

    switch (sortBy) {
      case "deadline-asc":
        filteredScholarships.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        break
      case "deadline-desc":
        filteredScholarships.sort((a, b) => new Date(b.deadline) - new Date(a.deadline))
        break
      case "amount-asc":
        // Simple sorting for demo purposes
        filteredScholarships.sort((a, b) => {
          if (a.amount.includes("Full")) return 1
          if (b.amount.includes("Full")) return -1
          return a.amount.localeCompare(b.amount)
        })
        break
      case "amount-desc":
        // Simple sorting for demo purposes
        filteredScholarships.sort((a, b) => {
          if (a.amount.includes("Full")) return -1
          if (b.amount.includes("Full")) return 1
          return b.amount.localeCompare(a.amount)
        })
        break
      default:
        // Default is relevance, no sorting needed
        break
    }

    renderScholarships(filteredScholarships)
  }

  // Initialize page
  function initPage() {
    // Render all scholarships initially
    renderScholarships(scholarships)

    // Add event listeners
    document.getElementById("search-button").addEventListener("click", filterScholarships)
    document.getElementById("search-input").addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        filterScholarships()
      }
    })

    document.getElementById("apply-filters").addEventListener("click", filterScholarships)
    document.getElementById("clear-filters").addEventListener("click", () => {
      // Clear all checkboxes
      document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        checkbox.checked = false
      })

      // Clear search input
      document.getElementById("search-input").value = ""

      // Reset sort
      document.getElementById("sort-by").value = "relevance"

      // Render all scholarships
      renderScholarships(scholarships)
    })

    document.getElementById("sort-by").addEventListener("change", filterScholarships)

    // Check URL parameters for pre-filtering
    const urlParams = new URLSearchParams(window.location.search)
    const levelParam = urlParams.get("level")

    if (levelParam) {
      // Check the corresponding checkbox
      const checkbox = document.querySelector(`input[name="level"][value="${levelParam}"]`)
      if (checkbox) {
        checkbox.checked = true
        filterScholarships()
      }
    }
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
                
                .no-results {
                    text-align: center;
                    padding: 3rem;
                    color: var(--text-medium);
                    grid-column: 1 / -1;
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

  // Initialize the page
  initPage()
})

