      "use strict";

      // Diagnostic: Check if script is running
      console.log("✓ Portfolio script loaded successfully");

      // Wrap DOM initialization in try-catch for error handling
      try {
        // ══════════════════════════════════════
        // FIX 1: Cursor (gold dot — decorative overlay)
        // Native cursor is now visible (default/pointer per CSS)
        // ══════════════════════════════════════
        const cursor = document.getElementById("cursor");
        const ring = document.getElementById("cursor-ring");
        if (cursor && ring) {
          let mx = 0,
            my = 0,
            rx = 0,
            ry = 0;
          document.addEventListener("mousemove", (e) => {
            mx = e.clientX;
            my = e.clientY;
            cursor.style.left = mx + "px";
            cursor.style.top = my + "px";
          });
          function animRing() {
            rx += (mx - rx) * 0.12;
            ry += (my - ry) * 0.12;
            ring.style.left = rx + "px";
            ring.style.top = ry + "px";
            requestAnimationFrame(animRing);
          }
          animRing();
        }

        // ══════════════════════════════════════
        // SIDEBAR TOGGLE (mobile overlay + arrow button)
        // ══════════════════════════════════════
        const sidebarBtn = document.getElementById("sidebar-btn");
        const toggleArrowBtn = document.getElementById("sidebar-toggle-arrow");
        const sidebarEl = document.querySelector(".sidebar");
        const mainEl = document.querySelector("main");
        let sidebarVisible = false;

        function closeMobileSidebar() {
          if (sidebarEl && mainEl) {
            sidebarEl.classList.remove("mobile-open");
            mainEl.classList.remove("sidebar-backdrop");
            sidebarVisible = false;
            if (toggleArrowBtn) {
              toggleArrowBtn.classList.remove("active");
            }
          }
        }

        function openMobileSidebar() {
          if (sidebarEl && mainEl) {
            sidebarEl.classList.add("mobile-open");
            mainEl.classList.add("sidebar-backdrop");
            sidebarVisible = true;
            if (toggleArrowBtn) {
              toggleArrowBtn.classList.add("active");
            }
          }
        }

        // Old toggle button (sidebar-btn) - keep for backward compatibility
        if (sidebarBtn) {
          sidebarBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (sidebarEl.classList.contains("mobile-open")) {
              closeMobileSidebar();
            } else {
              openMobileSidebar();
            }
          });
        }

        // New arrow toggle button (for all screen sizes)
        if (toggleArrowBtn) {
          toggleArrowBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (sidebarEl.classList.contains("mobile-open")) {
              closeMobileSidebar();
            } else {
              openMobileSidebar();
            }
          });
        }

        // Close sidebar when clicking on sidebar contacts or outside
        if (sidebarEl) {
          sidebarEl.addEventListener("click", (e) => {
            // Close if clicking on a contact link or social link
            if (e.target.closest(".contact-item, .social-link")) {
              closeMobileSidebar();
            }
          });
        }

        // Close sidebar when clicking on the backdrop
        if (mainEl) {
          mainEl.addEventListener("click", (e) => {
            if (
              e.target === mainEl &&
              sidebarEl.classList.contains("mobile-open")
            ) {
              closeMobileSidebar();
            }
          });
        }

        // Close sidebar on page navigation
        const navBtns = document.querySelectorAll(".nav-btn");
        navBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            closeMobileSidebar();
          });
        });

        // Page and nav initialization
        initializeNavigation();
        initializeAllModals();
        initializePortfolioFilter();
        initializeProjectViewer();
        initializeAskJack();
        initializeThemeToggle();

        console.log("✓ All features initialized successfully");
      } catch (error) {
        console.error("❌ Error during initialization:", error);
      }

      // ══════════════════════════════════════
      // PAGE NAVIGATION
      // ══════════════════════════════════════
      function initializeNavigation() {
        const navBtns = document.querySelectorAll(".nav-btn");
        const pages = document.querySelectorAll(".page");

        navBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            const target = btn.dataset.page;
            navBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            pages.forEach((p) => p.classList.remove("active"));
            const pageEl = document.getElementById("page-" + target);
            if (pageEl) {
              pageEl.classList.add("active");
            }
            window.scrollTo(0, 0);
            if (target === "resume") animateSkills();
          });
        });
      }

      // ══════════════════════════════════════
      // SKILL BARS ANIMATION
      // ══════════════════════════════════════
      let skillsAnimated = false;
      function animateSkills() {
        if (skillsAnimated) return;
        skillsAnimated = true;
        document.querySelectorAll(".skill-fill").forEach((bar) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.w + "%";
          }, 100);
        });
      }

      // ══════════════════════════════════════
      // MODALS INITIALIZATION
      // ══════════════════════════════════════
      function initializeAllModals() {
        // TESTIMONIAL MODAL
        const modal = document.getElementById("modal");
        const modalClose = document.getElementById("modal-close");

        if (modal && modalClose) {
          document.querySelectorAll("[data-modal]").forEach((card) => {
            card.addEventListener("click", () => {
              document.getElementById("modal-img").src = card.dataset.modalImg;
              document.getElementById("modal-name").textContent =
                card.dataset.modalName;
              document.getElementById("modal-role").textContent =
                card.dataset.modalRole;
              document.getElementById("modal-text").textContent =
                card.dataset.modalText;
              modal.classList.add("active");
            });
          });
          modalClose.addEventListener("click", () =>
            modal.classList.remove("active"),
          );
          modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("active");
          });
        }

        // SERVICE MODAL
        const svcModal = document.getElementById("svc-modal");
        const svcModalClose = document.getElementById("svc-modal-close");

        if (svcModal && svcModalClose) {
          document.querySelectorAll("[data-svc-modal]").forEach((card) => {
            const btn = card.querySelector("[data-svc-trigger]");
            if (!btn) return;
            btn.addEventListener("click", (e) => {
              e.stopPropagation();
              document.getElementById("svc-modal-icon").textContent =
                card.dataset.svcIcon || "💡";
              document.getElementById("svc-modal-heading").textContent =
                card.dataset.svcHeading || "";
              document.getElementById("svc-modal-sub").textContent =
                card.dataset.svcSub || "";
              document.getElementById("svc-modal-body").innerHTML =
                card.dataset.svcBody || "";
              svcModal.classList.add("active");
            });
          });
          svcModalClose.addEventListener("click", () =>
            svcModal.classList.remove("active"),
          );
          svcModal.addEventListener("click", (e) => {
            if (e.target === svcModal) svcModal.classList.remove("active");
          });
        }
      }

      // ══════════════════════════════════════
      // PORTFOLIO FILTER INITIALIZATION
      // ══════════════════════════════════════
      function initializePortfolioFilter() {
        const filterBtns = document.querySelectorAll(".filter-btn");
        const projectCards = document.querySelectorAll(".project-card");

        filterBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            // Update active filter
            filterBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;

            // Filter projects
            projectCards.forEach((card) => {
              const category = card.dataset.category;
              const shouldShow = filter === "all" || category === filter;

              if (shouldShow) {
                card.style.opacity = "0";
                card.style.display = "";
                setTimeout(() => {
                  card.style.opacity = "1";
                  card.style.transition = "opacity 0.4s ease";
                }, 10);
              } else {
                card.style.display = "none";
              }
            });
          });
        });
      }

      // ══════════════════════════════════════
      // PROJECT VIEWER INITIALIZATION
      // ══════════════════════════════════════
      function initializeProjectViewer() {
        // Close project viewer
        const pv_close = document.getElementById("pv-close");
        const projViewer_elem = document.getElementById("proj-viewer");

        if (pv_close && projViewer_elem) {
          pv_close.addEventListener("click", () => {
            projViewer_elem.classList.remove("active");
            document.body.style.overflow = "";
          });

          // Close on overlay click
          projViewer_elem.addEventListener("click", (e) => {
            if (e.target === projViewer_elem) {
              projViewer_elem.classList.remove("active");
              document.body.style.overflow = "";
            }
          });
        }

        // Open project viewer from expand button
        document.querySelectorAll("[data-expand]").forEach((btn) => {
          btn.addEventListener("click", () => {
            const projectId = btn.dataset.expand;
            if (typeof openProjectViewer === "function") {
              openProjectViewer(projectId);
            }
          });
        });
      }

      // ══════════════════════════════════════
      // ASK JACK — PERSONAL ASSISTANT INITIALIZATION
      // ══════════════════════════════════════
      function initializeAskJack() {
        const jackToggle = document.getElementById("ask-jack-toggle");
        const jackPanel = document.getElementById("jack-panel");
        const jackCloseBtn = document.getElementById("jack-close-btn");
        const jackSendBtn = document.getElementById("jack-send-btn");
        const jackInput = document.getElementById("jack-input");

        if (jackToggle && jackPanel) {
          jackToggle.addEventListener("click", () => {
            const isOpen = jackPanel.classList.toggle("open");
            if (isOpen && jackInput) jackInput.focus();
          });
        }

        if (jackCloseBtn && jackPanel) {
          jackCloseBtn.addEventListener("click", () => {
            jackPanel.classList.remove("open");
          });
        }

        if (jackSendBtn && jackInput) {
          jackSendBtn.addEventListener("click", () => jackSendMessage());
          jackInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") jackSendMessage();
          });
        }

        document.querySelectorAll(".jack-quick-btn").forEach((btn) => {
          btn.addEventListener("click", () => {
            const q = btn.dataset.q;
            if (q) jackSendMessage(q);
          });
        });
      }

      // ══════════════════════════════════════
      // THEME TOGGLE INITIALIZATION
      // ══════════════════════════════════════
      function initializeThemeToggle() {
        const themeToggle_elem = document.getElementById("theme-toggle");
        const themeKnob_elem = document.getElementById("theme-knob");
        let isDayMode = false;

        if (themeToggle_elem) {
          themeToggle_elem.addEventListener("click", () => {
            isDayMode = !isDayMode;
            document.documentElement.classList.toggle("day-mode", isDayMode);
            if (themeKnob_elem) {
              themeKnob_elem.textContent = isDayMode ? "☀️" : "🌙";
            }
            localStorage.setItem("portfolioTheme", isDayMode ? "day" : "night");
          });

          // Restore saved preference
          const saved = localStorage.getItem("portfolioTheme");
          if (saved === "day") {
            isDayMode = true;
            document.documentElement.classList.add("day-mode");
            if (themeKnob_elem) themeKnob_elem.textContent = "☀️";
          } else {
            if (themeKnob_elem) themeKnob_elem.textContent = "🌙";
          }
        }
      }

      // ══════════════════════════════════════
      // ══════════════════════════════════════
      // FIX 5: PROJECT VIEWER (Expand) - Updated
      // ══════════════════════════════════════

      // Project Data with file categories
      const projectData = {
        "proj-1": {
          title: "E-Commerce Platform",
          category: "Web Design",
          description:
            "Full-stack e-commerce solution with payment integration",
          files: [
            {
              name: "Screenshots",
              icon: "📸",
              type: "slideshow",
              folder: "project-1",
            },
            {
              name: "Homepage",
              icon: "🏠",
              type: "image",
              src: "./Asset/IMG/project-1/homepage.jpg",
            },
            {
              name: "Product Page",
              icon: "📦",
              type: "image",
              src: "./Asset/IMG/project-1/product.jpg",
            },
            {
              name: "Checkout",
              icon: "💳",
              type: "image",
              src: "./Asset/IMG/project-1/checkout.jpg",
            },
            {
              name: "Dashboard",
              icon: "📊",
              type: "image",
              src: "./Asset/IMG/project-1/dashboard.jpg",
            },
            {
              name: "Mockup",
              icon: "📱",
              type: "image",
              src: "./Asset/IMG/project-1/mockup.jpg",
            },
          ],
        },
        "proj-2": {
          title: "AI Chatbot Dashboard",
          category: "Applications",
          description: "Intelligent chatbot with NLP integration and analytics",
          files: [
            {
              name: "Screenshots",
              icon: "📸",
              type: "slideshow",
              folder: "project-2",
            },
            {
              name: "Chat Interface",
              icon: "💬",
              type: "image",
              src: "./Asset/IMG/project-2/chat.jpg",
            },
            {
              name: "Analytics",
              icon: "📊",
              type: "image",
              src: "./Asset/IMG/project-2/analytics.jpg",
            },
            {
              name: "Settings",
              icon: "⚙️",
              type: "image",
              src: "./Asset/IMG/project-2/settings.jpg",
            },
            {
              name: "Reports",
              icon: "📈",
              type: "image",
              src: "./Asset/IMG/project-2/reports.jpg",
            },
            {
              name: "Integration",
              icon: "🔗",
              type: "image",
              src: "./Asset/IMG/project-2/integration.jpg",
            },
          ],
        },
        "proj-3": {
          title: "Fitness Tracker App",
          category: "Mobile",
          description:
            "Cross-platform fitness tracking with real-time data sync",
          files: [
            {
              name: "Screenshots",
              icon: "📸",
              type: "slideshow",
              folder: "project-3",
            },
            {
              name: "Home Screen",
              icon: "🏠",
              type: "image",
              src: "./Asset/IMG/project-3/home.jpg",
            },
            {
              name: "Workouts",
              icon: "🏋️",
              type: "image",
              src: "./Asset/IMG/project-3/workouts.jpg",
            },
            {
              name: "Progress",
              icon: "📈",
              type: "image",
              src: "./Asset/IMG/project-3/progress.jpg",
            },
            {
              name: "Profile",
              icon: "👤",
              type: "image",
              src: "./Asset/IMG/project-3/profile.jpg",
            },
            {
              name: "Social",
              icon: "👥",
              type: "image",
              src: "./Asset/IMG/project-3/social.jpg",
            },
          ],
        },
        "proj-4": {
          title: "SaaS Dashboard Design",
          category: "UI/UX Design",
          description: "Modern dashboard UI with data visualization components",
          files: [
            {
              name: "Screenshots",
              icon: "📸",
              type: "slideshow",
              folder: "project-4",
            },
            {
              name: "Overview",
              icon: "📊",
              type: "image",
              src: "./Asset/IMG/project-4/overview.jpg",
            },
            {
              name: "Analytics",
              icon: "📈",
              type: "image",
              src: "./Asset/IMG/project-4/analytics.jpg",
            },
            {
              name: "Users",
              icon: "👥",
              type: "image",
              src: "./Asset/IMG/project-4/users.jpg",
            },
            {
              name: "Reports",
              icon: "📋",
              type: "image",
              src: "./Asset/IMG/project-4/reports.jpg",
            },
            {
              name: "Settings",
              icon: "⚙️",
              type: "image",
              src: "./Asset/IMG/project-4/settings.jpg",
            },
          ],
        },
        "proj-5": {
          title: "Corporate Website",
          category: "Web Design",
          description:
            "Enterprise website with CMS integration and SEO optimization",
          files: [
            {
              name: "Screenshots",
              icon: "📸",
              type: "slideshow",
              folder: "project-5",
            },
            {
              name: "Landing",
              icon: "🎯",
              type: "image",
              src: "./Asset/IMG/project-5/landing.jpg",
            },
            {
              name: "About",
              icon: "ℹ️",
              type: "image",
              src: "./Asset/IMG/project-5/about.jpg",
            },
            {
              name: "Services",
              icon: "💼",
              type: "image",
              src: "./Asset/IMG/project-5/services.jpg",
            },
            {
              name: "Portfolio",
              icon: "🎨",
              type: "image",
              src: "./Asset/IMG/project-5/portfolio.jpg",
            },
            {
              name: "Contact",
              icon: "📧",
              type: "image",
              src: "./Asset/IMG/project-5/contact.jpg",
            },
          ],
        },
        "proj-6": {
          title: "Sales Management System",
          category: "Applications",
          description:
            "Complete CRM solution with inventory and reporting features",
          files: [
            {
              name: "Screenshots",
              icon: "📸",
              type: "slideshow",
              folder: "project-6",
            },
            {
              name: "Dashboard",
              icon: "📊",
              type: "image",
              src: "./Asset/IMG/project-6/dashboard.jpg",
            },
            {
              name: "Sales",
              icon: "💰",
              type: "image",
              src: "./Asset/IMG/project-6/sales.jpg",
            },
            {
              name: "Inventory",
              icon: "📦",
              type: "image",
              src: "./Asset/IMG/project-6/inventory.jpg",
            },
            {
              name: "Customers",
              icon: "👥",
              type: "image",
              src: "./Asset/IMG/project-6/customers.jpg",
            },
            {
              name: "Reports",
              icon: "📈",
              type: "image",
              src: "./Asset/IMG/project-6/reports.jpg",
            },
          ],
        },
        "proj-7": {
          title: "Social Media App",
          category: "Mobile",
          description:
            "Feature-rich social platform with chat and notifications",
          files: [
            {
              name: "Screenshots",
              icon: "📸",
              type: "slideshow",
              folder: "project-7",
            },
            {
              name: "Feed",
              icon: "📱",
              type: "image",
              src: "./Asset/IMG/project-7/feed.jpg",
            },
            {
              name: "Messages",
              icon: "💬",
              type: "image",
              src: "./Asset/IMG/project-7/messages.jpg",
            },
            {
              name: "Profile",
              icon: "👤",
              type: "image",
              src: "./Asset/IMG/project-7/profile.jpg",
            },
            {
              name: "Stories",
              icon: "✨",
              type: "image",
              src: "./Asset/IMG/project-7/stories.jpg",
            },
            {
              name: "Notifications",
              icon: "🔔",
              type: "image",
              src: "./Asset/IMG/project-7/notifications.jpg",
            },
          ],
        },
        "proj-8": {
          title: "Mobile App UI Kit",
          category: "UI/UX Design",
          description: "Comprehensive design system with reusable components",
          files: [
            {
              name: "Screenshots",
              icon: "📸",
              type: "slideshow",
              folder: "project-8",
            },
            {
              name: "Buttons",
              icon: "🔘",
              type: "image",
              src: "./Asset/IMG/project-8/buttons.jpg",
            },
            {
              name: "Forms",
              icon: "📝",
              type: "image",
              src: "./Asset/IMG/project-8/forms.jpg",
            },
            {
              name: "Cards",
              icon: "🎴",
              type: "image",
              src: "./Asset/IMG/project-8/cards.jpg",
            },
            {
              name: "Navigation",
              icon: "🗺️",
              type: "image",
              src: "./Asset/IMG/project-8/navigation.jpg",
            },
            {
              name: "Modals",
              icon: "🪟",
              type: "image",
              src: "./Asset/IMG/project-8/modals.jpg",
            },
          ],
        },
        "proj-9": {
          title: "Real Estate Platform",
          category: "Web Design",
          description:
            "Property listing platform with advanced search and filters",
          files: [
            {
              name: "Screenshots",
              icon: "📸",
              type: "slideshow",
              folder: "project-9",
            },
            {
              name: "Listings",
              icon: "🏠",
              type: "image",
              src: "./Asset/IMG/project-9/listings.jpg",
            },
            {
              name: "Property",
              icon: "🏡",
              type: "image",
              src: "./Asset/IMG/project-9/property.jpg",
            },
            {
              name: "Map View",
              icon: "🗺️",
              type: "image",
              src: "./Asset/IMG/project-9/map.jpg",
            },
            {
              name: "Agent",
              icon: "👤",
              type: "image",
              src: "./Asset/IMG/project-9/agent.jpg",
            },
            {
              name: "Favorites",
              icon: "❤️",
              type: "image",
              src: "./Asset/IMG/project-9/favorites.jpg",
            },
          ],
        },
      };

      const projViewer = document.getElementById("proj-viewer");
      const pvMain = document.getElementById("pv-main");
      let currentProjectId = "";
      let currentActiveFile = null;

      // Open project viewer
      function openProjectViewer(projectId) {
        const project = projectData[projectId];
        if (!project) return;

        currentProjectId = projectId;

        // Update header
        document.getElementById("pv-title").textContent = project.title;
        document.getElementById("pv-sub").textContent = project.category;

        // Build sidebar file list
        const fileList = document.getElementById("pv-file-list");
        fileList.innerHTML = "";

        project.files.forEach((file, index) => {
          const btn = document.createElement("div");
          btn.className =
            "proj-file-item" + (index === 0 ? " active-file" : "");
          btn.innerHTML = `<span class="proj-file-icon">${file.icon}</span><span class="proj-file-name">${file.name}</span>`;
          btn.addEventListener("click", () => previewFile(projectId, index));
          fileList.appendChild(btn);
        });

        // Show first file by default
        previewFile(projectId, 0);

        projViewer.classList.add("active");
        document.body.style.overflow = "hidden";
      }

      // Preview file in main viewer
      function previewFile(projectId, fileIndex) {
        const project = projectData[projectId];
        const file = project.files[fileIndex];

        // Update active state
        document.querySelectorAll(".proj-file-item").forEach((item, idx) => {
          item.classList.toggle("active-file", idx === fileIndex);
        });

        if (file.type === "slideshow") {
          // Show slideshow for screenshots folder
          pvMain.innerHTML = `
            <div class="proj-viewer-slideshow">
              <div class="slideshow-container">
                <img src="./Asset/IMG/${file.folder}/slide-1.jpg" alt="Slide 1" class="slide-image" id="slide-img" />
                <div class="slide-nav" id="slide-nav"></div>
              </div>
            </div>
          `;

          // Create slide dots (assuming 4 slides per folder)
          const slideNav = document.getElementById("slide-nav");
          let currentSlide = 1;

          for (let i = 1; i <= 4; i++) {
            const dot = document.createElement("div");
            dot.className = "slide-dot" + (i === 1 ? " active" : "");
            dot.addEventListener("click", () => {
              currentSlide = i;
              document.getElementById("slide-img").src =
                `./Asset/IMG/${file.folder}/slide-${i}.jpg`;
              document.querySelectorAll(".slide-dot").forEach((d, idx) => {
                d.classList.toggle("active", idx === i - 1);
              });
            });
            slideNav.appendChild(dot);
          }
        } else {
          // Show image
          pvMain.innerHTML = `<img src="${file.src}" alt="${file.name}" class="proj-viewer-image" />`;
        }
      }

      // ══════════════════════════════════════
      // FIX 5B: QR CODE MODAL — Social Icons
      // ══════════════════════════════════════
      const qrModal = document.getElementById("qr-modal");
      const qrModalClose = document.getElementById("qr-modal-close");
      const qrModalImage = document.getElementById("qr-modal-image");
      const qrModalTitle = document.getElementById("qr-modal-title");
      const qrModalText = document.getElementById("qr-modal-text");

      // Open QR modal when icon is clicked
      document.querySelectorAll(".social-icon-card").forEach((card) => {
        card.addEventListener("click", (e) => {
          const qrImg = card.dataset.qrImg;
          const qrLabel = card.dataset.qrLabel;

          // Update modal content
          qrModalImage.src = qrImg;
          qrModalTitle.textContent = `Scan ${qrLabel} QR Code`;
          qrModalText.textContent = `Use your phone to scan this ${qrLabel} QR code`;

          // Show modal with animation
          qrModal.classList.add("active");
          document.body.style.overflow = "hidden";
        });
      });

      // Close QR modal
      function closeQRModal() {
        qrModal.classList.remove("active");
        document.body.style.overflow = "";
      }

      qrModalClose.addEventListener("click", closeQRModal);

      // Close modal when clicking outside
      qrModal.addEventListener("click", (e) => {
        if (e.target === qrModal) {
          closeQRModal();
        }
      });

      // Close modal with Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && qrModal.classList.contains("active")) {
          closeQRModal();
        }
      });

      // ══════════════════════════════════════
      // ══════════════════════════════════════
      // FIX 6: CHATBOT — Keyword-based Q&A (Editable Knowledge Base)
      // ══════════════════════════════════════

      // KNOWLEDGE BASE: Questions & Answers stored locally (EDIT HERE)
      const knowledgeBase = [
        {
          keywords: ["who", "jack", "you"],
          q: "Who are you?",
          a: "I'm a portfolio assistant for an Entrepreneur, Prompt Engineer, AI Content Creator, Frontend Developer, and Stock Market Expert based in Malegaon, Maharashtra, India.",
        },
        {
          keywords: ["services", "offer", "what"],
          q: "What services do you offer?",
          a: "Services include: Frontend Development, AI Prompt Engineering, Stock Market Training, Digital Marketing, AI Content Creation, Entrepreneurship Consulting, Backend Development, Online Courses & Workshops, and Business Analytics.",
        },
        {
          keywords: ["hire", "work", "contact"],
          q: "How can I hire you?",
          a: "Send a message via the Contact page, email directly, or WhatsApp. I respond within 24 hours.",
        },
        {
          keywords: ["freelance", "available"],
          q: "Do you do freelance work?",
          a: "Yes! I'm available for freelance frontend development, AI consulting, content creation, and digital marketing projects.",
        },
        {
          keywords: ["tech", "stack", "technologies"],
          q: "What's your tech stack?",
          a: "Frontend: React, HTML5, CSS3, JavaScript. Backend (learning): Node.js, Express.js, MongoDB. AI: Claude, ChatGPT, Gemini.",
        },
        {
          keywords: ["website", "build", "create"],
          q: "Can you build a website for me?",
          a: "Absolutely! I build modern, responsive websites using React, HTML5, and CSS3. Share your requirements via the Contact form.",
        },
        {
          keywords: ["prompt", "engineering", "ai"],
          q: "What is prompt engineering?",
          a: "Prompt engineering is the skill of designing precise instructions for AI models (like Claude or ChatGPT) to produce high-quality, targeted outputs consistently.",
        },
        {
          keywords: ["stock", "training", "market"],
          q: "How is stock training done?",
          a: "Training is available 1-on-1 (online via Zoom or offline in Malegaon), in groups, or via recorded courses. Topics include technical analysis, options, risk management, and equity research.",
        },
        {
          keywords: ["teaching", "style", "method"],
          q: "What is your teaching style?",
          a: "Practical and example-driven — every concept is backed by real charts from NSE/BSE. Students analyze live markets from week one.",
        },
        {
          keywords: ["students", "trained", "how many"],
          q: "How many students have you trained?",
          a: "50+ students so far, many of whom are now consistently profitable traders.",
        },
        {
          keywords: ["marketing", "digital", "ads"],
          q: "Do you offer digital marketing?",
          a: "Yes! I manage Meta Ads (Facebook/Instagram), Google Ads, SEO, social media strategy, and analytics reporting.",
        },
        {
          keywords: ["results", "roas", "achieved"],
          q: "What ad results have you achieved?",
          a: "One client achieved 3x ROAS within the first month of running Meta Ads under my strategy.",
        },
        {
          keywords: ["cost", "price", "money"],
          q: "How much does a website cost?",
          a: "Pricing depends on scope. A basic landing page starts from ₹5,000. A full React app is priced project-by-project. Contact me for a quote.",
        },
        {
          keywords: ["content", "create", "writing"],
          q: "What content formats can you create?",
          a: "Blog posts, YouTube scripts, Instagram carousels, LinkedIn posts, email newsletters, website copy, ebooks, and product descriptions — all AI-assisted but human-edited.",
        },
        {
          keywords: ["collaboration", "collaborate", "partner"],
          q: "Are you available for collaboration?",
          a: "Yes! I'm open to collaborations with creators, startups, and educators. Reach out and let's explore how we can work together.",
        },
        {
          keywords: ["location", "where", "based"],
          q: "Where are you located?",
          a: "Malegaon, Maharashtra, India. I work with clients nationally and internationally via online platforms.",
        },
        {
          keywords: ["language", "speak", "hindi"],
          q: "What languages do you speak?",
          a: "Hindi, Marathi, and English — comfortable communicating in all three.",
        },
        {
          keywords: ["course", "courses", "learn"],
          q: "Do you have any courses available?",
          a: "Yes! I offer online courses on stock market trading, web development basics, and AI content creation. Contact me for enrollment details.",
        },
        {
          keywords: ["hours", "availability", "time"],
          q: "What are your working hours?",
          a: "I'm generally available Monday to Saturday, 10 AM – 7 PM IST. Emergency support available via WhatsApp.",
        },
        {
          keywords: ["delivery", "timeline", "fast"],
          q: "How fast do you deliver projects?",
          a: "Timelines depend on project size. A landing page: 3–5 days. A full web app: 2–4 weeks. Content packages: 1 week. Always discussed upfront.",
        },
        {
          keywords: ["seo", "search", "optimization"],
          q: "Can you help with SEO?",
          a: "Yes! I provide on-page SEO, keyword research, content optimization, and technical SEO audits to improve search rankings.",
        },
        {
          keywords: ["experience", "ai", "Claude"],
          q: "What's your experience with AI?",
          a: "I've engineered 500+ prompts for production use across content, business, and education. I work daily with Claude, ChatGPT, and Gemini.",
        },
        {
          keywords: ["beginners", "learn", "stock"],
          q: "Do you teach beginners in stock markets?",
          a: "Absolutely — most of my students are complete beginners. My curriculum is designed to build from zero to confident trading systematically.",
        },
        {
          keywords: ["stocks", "analyze", "nse"],
          q: "What stocks do you analyze?",
          a: "Primarily NSE and BSE listed Indian equities across large-cap, mid-cap, and sector-specific stocks. Also Nifty/BankNifty options.",
        },
        {
          keywords: ["portfolio", "manage", "funds"],
          q: "Do you manage portfolios?",
          a: "I provide training and analysis, but I do not manage client funds. All decisions remain with the individual investor.",
        },
        {
          keywords: ["reach", "best", "whatsapp"],
          q: "What's the best way to reach you?",
          a: "WhatsApp is fastest for quick replies. For detailed project discussions, email or the contact form is preferred.",
        },
        {
          keywords: ["business", "ideas", "consulting"],
          q: "Can you help with business ideas?",
          a: "Yes! I offer entrepreneurship consulting including idea validation, market research, MVP planning, and 90-day launch roadmaps.",
        },
        {
          keywords: ["startups", "work", "startup"],
          q: "Do you work with startups?",
          a: "Yes, especially early-stage startups who need a versatile tech partner for web development, content, and digital strategy.",
        },
        {
          keywords: ["different", "unique", "what makes"],
          q: "What makes you different?",
          a: "I combine technical skills (code), creative skills (content/AI), financial expertise (markets), and business mindset (entrepreneurship) — a rare combination.",
        },
        {
          keywords: ["mobile", "app", "ios"],
          q: "Can you make mobile apps?",
          a: "Currently focused on web apps (React). Mobile app development with React Native is on my learning roadmap for 2026.",
        },
        {
          keywords: ["github", "git", "version"],
          q: "Do you use GitHub?",
          a: "Yes! All my code projects are version controlled with Git. You can check my GitHub for open-source contributions.",
        },
        {
          keywords: ["payment", "gateway", "razorpay"],
          q: "Can you integrate payment gateways?",
          a: "Yes, I can integrate Razorpay and Stripe into web applications for accepting online payments.",
        },
        {
          keywords: ["database", "mongodb", "mysql"],
          q: "What databases do you know?",
          a: "MongoDB (learning actively), and basic experience with MySQL. Currently building full MERN stack proficiency.",
        },
        {
          keywords: ["youtube", "video", "content"],
          q: "Do you create YouTube content?",
          a: "I create AI-assisted YouTube scripts and can help plan video content strategies for creators. Video editing is outsourced.",
        },
        {
          keywords: ["tools", "daily", "software"],
          q: "What tools do you use daily?",
          a: "VS Code, Figma (basic), Claude AI, ChatGPT, Meta Ads Manager, Google Analytics, Canva, and Excel/Google Sheets.",
        },
        {
          keywords: ["affordable", "price", "cheap"],
          q: "Are your services affordable?",
          a: "I believe in fair, transparent pricing — especially for small businesses and individual learners. Contact me and we'll find a package that fits your budget.",
        },
        {
          keywords: ["refund", "money back"],
          q: "Do you offer refunds?",
          a: "Refund policy is discussed on a case-by-case basis. I prioritize satisfaction and always work to resolve issues before requesting a refund.",
        },
        {
          keywords: ["creative", "design", "canva"],
          q: "Can you create ad creatives?",
          a: "I design basic ad creatives using Canva and AI image tools. For advanced design, I collaborate with professional graphic designers.",
        },
        {
          keywords: ["mern", "stack", "mongodb"],
          q: "What is MERN stack?",
          a: "MERN = MongoDB + Express.js + React + Node.js. It's a JavaScript-based full-stack web development framework I'm actively mastering.",
        },
        {
          keywords: ["discount", "group", "team"],
          q: "Do you offer group discounts?",
          a: "Yes! Group discounts are available for workshops, stock market training cohorts, and digital marketing packages for teams.",
        },
        {
          keywords: ["start", "demat", "begin"],
          q: "How do I start with stock market?",
          a: "Open a Demat account (Zerodha or Groww), learn chart reading basics, start with paper trading, then invest small amounts while learning. My training covers all of this.",
        },
        {
          keywords: ["technical", "analysis", "chart"],
          q: "What is technical analysis?",
          a: "Technical analysis is using historical price and volume data (charts) to predict future market movements. I teach it thoroughly in my stock market training.",
        },
        {
          keywords: ["blog", "articles", "write"],
          q: "Do you write blog posts?",
          a: "Yes! I create SEO-optimized blog posts using AI tools + editorial judgment. Turnaround is 1–3 days per post depending on length.",
        },
        {
          keywords: ["tools", "ai", "recommend"],
          q: "What AI tools do you recommend?",
          a: "Claude for thinking/writing (best!), ChatGPT for variety, Perplexity for research, Midjourney for images, and ElevenLabs for voice content.",
        },
        {
          keywords: ["audit", "website"],
          q: "Can you audit my website?",
          a: "Yes! I offer website audits covering design, performance, SEO, mobile responsiveness, and conversion optimization.",
        },
        {
          keywords: ["emi", "installment", "payment"],
          q: "Do you offer EMI payment options?",
          a: "For larger projects, installment payment arrangements can be discussed. Typically 50% upfront, 50% on delivery.",
        },
        {
          keywords: ["social", "media", "linkedin"],
          q: "Are you on social media?",
          a: "Yes! I'm active on LinkedIn, Instagram, YouTube, and Twitter/X. Links are in the sidebar. Follow for regular content on AI, trading, and tech.",
        },
        {
          keywords: ["success", "rate", "winning"],
          q: "What is your success rate in trading?",
          a: "I maintain a consistent win rate through disciplined risk management. My students learn the same discipline — losses are part of trading, controlling them is the skill.",
        },
        {
          keywords: ["email", "marketing", "mailchimp"],
          q: "Can you help with email marketing?",
          a: "Yes! I create email sequences, newsletter templates, and automation workflows using tools like Mailchimp and ConvertKit.",
        },
        {
          keywords: ["free", "consultation", "call"],
          q: "Do you offer free consultations?",
          a: "Yes! I offer a free 15-minute discovery call for new clients. Use the contact form to schedule yours.",
        },
      ];

      // Fallback responses for unmatched queries
      const fallbackResponses = [
        "That's a great question! Could you rephrase it in simpler terms? Try keywords like 'services', 'hire', 'price', 'skills', or 'stock'.",
        "I'm not sure I understood that. Try asking about 'website development', 'AI prompts', 'stock trading', or 'digital marketing'.",
        "I didn't quite catch that. Ask me about my services, experience, pricing, or how to work with me!",
      ];

      // ══════════════════════════════════════
      // ASK JACK — PERSONAL ASSISTANT LOGIC
      // ══════════════════════════════════════

      // EmailJS config — replace with your own IDs from https://www.emailjs.com
      // 1) Sign up free  2) Add an Email Service  3) Create a Template with these vars:
      //    {{to_email}}, {{client_name}}, {{service}}, {{date}}, {{contact}}
      // 4) Paste your Public Key, Service ID, and Template ID below
      const EMAILJS_PUBLIC_KEY = "iFyQ8SkeHwrhKEONY";
      const EMAILJS_SERVICE_ID = "service_v19z29u";
      const EMAILJS_TEMPLATE_ID = "template_s8qxu7f";

      if (typeof emailjs !== "undefined") {
        emailjs.init(EMAILJS_PUBLIC_KEY);
      }

      // Appointment booking state machine
      let apptState = "IDLE";
      let apptData = {};

      function jackAddBubble(text, type) {
        const body = document.getElementById("jack-body");
        if (!body) return;
        const div = document.createElement("div");
        div.className = "jack-bubble " + type;
        div.textContent = text;
        body.appendChild(div);
        body.scrollTop = body.scrollHeight;
      }

      function jackTyping() {
        const body = document.getElementById("jack-body");
        if (!body) return null;
        const div = document.createElement("div");
        div.className = "jack-typing";
        div.innerHTML = "<span></span><span></span><span></span>";
        body.appendChild(div);
        body.scrollTop = body.scrollHeight;
        return function () {
          if (div.parentNode) div.parentNode.removeChild(div);
        };
      }

      function jackFindAnswer(input) {
        const text = input.toLowerCase().trim();
        if (
          /\b(book|appoint|schedule|meeting|call|session|consult)\b/.test(text)
        ) {
          return "__APPT__";
        }
        let bestMatch = null;
        let bestScore = 0;
        for (const kb of knowledgeBase) {
          let score = 0;
          for (const kw of kb.keywords) {
            if (text.includes(kw)) score++;
          }
          if (score > bestScore) {
            bestScore = score;
            bestMatch = kb;
          }
        }
        return bestMatch
          ? bestMatch.a
          : fallbackResponses[
              Math.floor(Math.random() * fallbackResponses.length)
            ];
      }

      function sendAppointmentEmail() {
        if (typeof emailjs === "undefined") {
          jackAddBubble(
            "✅ Appointment noted! Jack will contact you at " +
              apptData.email +
              " to confirm.",
            "bot",
          );
          return;
        }
        emailjs
          .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            to_email: "sajid713@gmail.com",
            client_name: apptData.name,
            service: apptData.service,
            date: apptData.date,
            contact: apptData.email,
          })
          .then(function () {
            jackAddBubble(
              "✅ Appointment confirmed! Jack has been notified and will reach out to you at " +
                apptData.email +
                " shortly. Looking forward to working with you! 🙌",
              "bot",
            );
          })
          .catch(function () {
            jackAddBubble(
              "✅ Your appointment request has been received! Jack will contact you at " +
                apptData.email +
                " to confirm the details.",
              "bot",
            );
          });
      }

      function jackHandleAppointmentFlow(text) {
        switch (apptState) {
          case "APPT_NAME":
            apptData.name = text;
            apptState = "APPT_SERVICE";
            return (
              "Great to meet you, " +
              text +
              "! 👋\n\nWhich service are you interested in?\n\n💻 Website Development\n🤖 AI Chatbot\n📈 Stock Trading Mentorship\n📱 Social Media Marketing\n🎨 Graphic Design\n✍️ Other (just type it)"
            );
          case "APPT_SERVICE":
            apptData.service = text;
            apptState = "APPT_DATE";
            return "Perfect choice! 🎯 What date and time works best for you? (e.g. Tuesday 3pm, or any flexible slot)";
          case "APPT_DATE":
            apptData.date = text;
            apptState = "APPT_EMAIL";
            return "Almost there! What's the best email or phone number Jack can reach you on?";
          case "APPT_EMAIL":
            apptData.email = text;
            apptState = "APPT_CONFIRM";
            return (
              "Here's your appointment summary:\n\n" +
              "👤 Name: " +
              apptData.name +
              "\n" +
              "🛠 Service: " +
              apptData.service +
              "\n" +
              "📅 Date/Time: " +
              apptData.date +
              "\n" +
              "📧 Contact: " +
              apptData.email +
              "\n\n" +
              "Reply confirm to finalize, or cancel to start over."
            );
          case "APPT_CONFIRM":
            if (/\b(confirm|yes|ok|sure|proceed|go ahead)\b/i.test(text)) {
              apptState = "IDLE";
              apptData = {};
              sendAppointmentEmail();
              return null;
            } else if (/\b(cancel|no|stop|abort)\b/i.test(text)) {
              apptState = "IDLE";
              apptData = {};
              return "No problem! Appointment cancelled. Feel free to ask me anything else. 😊";
            }
            return "Please reply confirm to finalize your appointment or cancel to start over.";
          default:
            return null;
        }
      }

      function jackSendMessage(overrideText) {
        const input = document.getElementById("jack-input");
        const userText = (overrideText || (input ? input.value : "")).trim();
        if (!userText) return;

        jackAddBubble(userText, "user");
        if (input && !overrideText) input.value = "";

        // Hide quick-reply chips after first interaction
        const qBtns = document.getElementById("jack-quick-btns");
        if (qBtns) qBtns.style.display = "none";

        const removeTyping = jackTyping();

        setTimeout(function () {
          if (removeTyping) removeTyping();

          if (apptState !== "IDLE") {
            const reply = jackHandleAppointmentFlow(userText);
            if (reply) jackAddBubble(reply, "bot");
            return;
          }

          const answer = jackFindAnswer(userText);
          if (answer === "__APPT__") {
            apptState = "APPT_NAME";
            apptData = {};
            jackAddBubble(
              "Sure! Let's book your appointment with Jack. 📅\n\nFirst, what's your full name?",
              "bot",
            );
          } else {
            jackAddBubble(answer, "bot");
          }
        }, 700);
      }

      // ══════════════════════════════════════
      // CONTACT FORM
      // ══════════════════════════════════════
      const cfName = document.getElementById("cf-name");
      const cfEmail = document.getElementById("cf-email");
      const cfMsg = document.getElementById("cf-msg");
      const submitBtn = document.getElementById("submit-btn");
      [cfName, cfEmail, cfMsg].forEach((el) => {
        el.addEventListener("input", () => {
          submitBtn.disabled = !(
            cfName.value.trim() &&
            cfEmail.value.includes("@") &&
            cfMsg.value.trim()
          );
        });
      });
      document
        .getElementById("contact-form")
        .addEventListener("submit", (e) => {
          e.preventDefault();
          submitBtn.innerHTML = "✓ Message Sent!";
          submitBtn.style.background = "var(--accent-teal)";
          submitBtn.disabled = true;
          setTimeout(() => {
            submitBtn.innerHTML = "Send Message";
            submitBtn.style.background = "";
            submitBtn.disabled = false;
            cfName.value = "";
            cfEmail.value = "";
            cfMsg.value = "";
          }, 3000);
        });

      // ══════════════════════════════════════
      // DAY / NIGHT TOGGLE (moved to initializeThemeToggle function)
      // ══════════════════════════════════════

      // CTA buttons with [data-page-link] → navigate to target page and close Jack panel
      document.querySelectorAll("[data-page-link]").forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          const target = btn.getAttribute("data-page-link");
          document.querySelectorAll(".page").forEach(function (p) {
            p.classList.remove("active");
          });
          document.querySelectorAll(".nav-btn").forEach(function (b) {
            b.classList.remove("active");
          });
          const page = document.getElementById("page-" + target);
          const navBtn = document.querySelector('[data-page="' + target + '"]');
          if (page) page.classList.add("active");
          if (navBtn) navBtn.classList.add("active");
          const jp = document.getElementById("jack-panel");
          if (jp) jp.classList.remove("open");
        });
      });

      // ══════════════════════════════════════
      // BLOG EXPAND MODAL
      // ══════════════════════════════════════
      const blogExpandOverlay = document.getElementById("blog-expand-overlay");
      const blogExpandClose = document.getElementById("blog-expand-close");

      document.querySelectorAll(".blog-expand-trigger").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const card = btn.closest(".blog-card");
          document.getElementById("bex-img").textContent =
            card.dataset.bexImg || "📝";
          document.getElementById("bex-cat").textContent =
            card.dataset.bexCat || "";
          document.getElementById("bex-date").textContent =
            card.dataset.bexDate || "";
          document.getElementById("bex-title").textContent =
            card.dataset.bexTitle || "";
          document.getElementById("bex-text").textContent =
            card.dataset.bexText || "";
          blogExpandOverlay.classList.add("active");
          document.body.style.overflow = "hidden";
        });
      });

      function closeBlogExpand() {
        blogExpandOverlay.classList.remove("active");
        document.body.style.overflow = "";
      }
      blogExpandClose.addEventListener("click", closeBlogExpand);
      blogExpandOverlay.addEventListener("click", (e) => {
        if (e.target === blogExpandOverlay) closeBlogExpand();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeBlogExpand();
      });

      // ══════════════════════════════════════
      // GET E-ACCESS BUTTON (SIDEBAR)
      // ══════════════════════════════════════
      const eaccessBtn = document.getElementById("eaccess-btn");
      const eaccessModal = document.getElementById("eaccess-modal");
      const eaccessModalClose = document.getElementById("eaccess-modal-close");
      const eaccessCardImage = document.getElementById("eaccess-card-image");

      // Open e-access modal when button is clicked
      eaccessBtn.addEventListener("click", (e) => {
        e.preventDefault();
        eaccessModal.classList.add("active");
        document.body.style.overflow = "hidden";
      });

      // Close e-access modal function
      function closeEaccessModal() {
        eaccessModal.classList.remove("active");
        document.body.style.overflow = "";
      }

      // Close button handler
      eaccessModalClose.addEventListener("click", closeEaccessModal);

      // Close modal when clicking outside (on backdrop)
      eaccessModal.addEventListener("click", (e) => {
        if (e.target === eaccessModal) {
          closeEaccessModal();
        }
      });

      // Close modal with Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && eaccessModal.classList.contains("active")) {
          closeEaccessModal();
        }
      });

      // ═══════════════════════════════════════
      // PROJECT SHOWCASE FUNCTIONALITY
      // ═══════════════════════════════════════

      let currentSlide = 0;
      let autoTimer = null;
      let isPlaying = false;

      // Carousel management
      function moveCarousel(direction) {
        const slides = document.querySelectorAll(".carousel-slide");
        const totalSlides = slides.length;
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        updateCarousel();
      }

      function goToSlide(index) {
        currentSlide = Math.max(
          0,
          Math.min(
            index,
            document.querySelectorAll(".carousel-slide").length - 1,
          ),
        );
        updateCarousel();
      }

      function updateCarousel() {
        const slides = document.querySelectorAll(".carousel-slide");
        const dots = document.querySelectorAll(".dot-btn");
        const counter = document.querySelector(".slide-counter");
        const progress = document.querySelector(".carousel-progress");

        slides.forEach((s, i) =>
          s.classList.toggle("active", i === currentSlide),
        );
        dots.forEach((d, i) =>
          d.classList.toggle("active", i === currentSlide),
        );

        if (counter)
          counter.textContent = `${currentSlide + 1}/${slides.length}`;
        if (progress)
          progress.style.width =
            ((currentSlide + 1) / slides.length) * 100 + "%";
      }

      function startAuto() {
        if (autoTimer) return;
        isPlaying = true;
        const btn = document.querySelector("#autoplay-btn");
        if (btn) btn.classList.add("playing");

        autoTimer = setInterval(() => {
          moveCarousel(1);
        }, 5000);
      }

      function stopAuto() {
        if (autoTimer) clearInterval(autoTimer);
        autoTimer = null;
        isPlaying = false;
        const btn = document.querySelector("#autoplay-btn");
        if (btn) btn.classList.remove("playing");
      }

      function toggleAutoplay() {
        isPlaying ? stopAuto() : startAuto();
      }

      // Initialize carousel
      document.addEventListener("DOMContentLoaded", () => {
        const dots = document.querySelectorAll(".dot-btn");
        dots.forEach((dot, i) => {
          dot.addEventListener("click", () => goToSlide(i));
        });
        updateCarousel();
        startAuto();
      });

      // Gallery modal management
      const gallery = {
        currentIndex: 0,
        projectData: {},

        openModal: function (btn) {
          try {
            const galleryData = btn.dataset.gallery
              ? JSON.parse(btn.dataset.gallery)
              : [];

            // Convert old format to new format if needed
            this.projectData = {
              images: galleryData.map((g) => g.src || g),
              slides: galleryData,
            };
            this.currentIndex = 0;
            this.render();
            document.getElementById("gallery-modal").classList.add("open");
          } catch (e) {
            console.error("Gallery data error:", e);
          }
        },

        closeModal: function () {
          document.getElementById("gallery-modal").classList.remove("open");
        },

        render: function () {
          const { images = [], slides = [] } = this.projectData;
          const slides_el = document.getElementById("gallery-slides");
          const thumbs = document.getElementById("gallery-thumbs");

          // Render main slide
          if (slides.length > 0 && this.currentIndex < slides.length) {
            const current = slides[this.currentIndex];
            slides_el.innerHTML = `<img src="${current.src}" alt="${current.title}" style="width:100%; height:100%; object-fit:cover;"/>`;

            // Render title and description
            document.getElementById("gallery-title").textContent =
              current.title || "Project Gallery";
            document.getElementById("gallery-desc").textContent =
              current.desc || "Explore project details and gallery images.";
          }

          // Render thumbnails
          thumbs.innerHTML = slides
            .map(
              (img, i) =>
                `<div class="gallery-thumb ${i === this.currentIndex ? "active" : ""}" onclick="gallery.goTo(${i})" style="cursor:pointer;">
              <img src="${img.src}" alt="Thumbnail - ${img.title}" style="width:100%; height:100%; object-fit:cover;"/>
            </div>`,
            )
            .join("");
        },

        goTo: function (index) {
          this.currentIndex = index;
          this.render();
        },

        next: function () {
          const max = this.projectData.slides?.length || 1;
          this.currentIndex = (this.currentIndex + 1) % max;
          this.render();
        },

        prev: function () {
          const max = this.projectData.slides?.length || 1;
          this.currentIndex = (this.currentIndex - 1 + max) % max;
          this.render();
        },
      };

      // Helper function for button onclick
      function openGallery(cardNum) {
        const btn = event.target;
        gallery.openModal(btn);
      }

      // YouTube modal management
      const youtubeGallery = {
        closeModal: function () {
          document.getElementById("yt-modal").classList.remove("open");
        },

        openModal: function (btn) {
          try {
            const ytData = btn.dataset.yt ? JSON.parse(btn.dataset.yt) : [];

            const ytGrid = document.getElementById("yt-grid");
            ytGrid.innerHTML = ytData
              .map(
                (v) => `
              <a href="https://youtube.com/watch?v=${v.videoId}" target="_blank" class="yt-thumb-card">
                <div class="yt-thumb-img">
                  <img src="https://img.youtube.com/vi/${v.videoId}/maxresdefault.jpg" alt="${v.title}" style="width:100%; height:100%; object-fit:cover;"/>
                  <div class="yt-play-icon">▶</div>
                </div>
                <div class="yt-thumb-info">
                  <h4>${v.title}</h4>
                  <span>${v.duration || "N/A"}</span>
                </div>
              </a>
            `,
              )
              .join("");

            document.getElementById("yt-modal").classList.add("open");
          } catch (e) {
            console.error("YouTube data error:", e);
          }
        },
      };

      // Helper function for button onclick
      function openYoutube(cardNum) {
        const btn = event.target;
        youtubeGallery.openModal(btn);
      }

      // Initialize modal event listeners
      document.addEventListener("DOMContentLoaded", () => {
        // Close modals on overlay click
        document
          .getElementById("gallery-modal")
          .addEventListener("click", (e) => {
            if (e.target.id === "gallery-modal") gallery.closeModal();
          });

        document.getElementById("yt-modal").addEventListener("click", (e) => {
          if (e.target.id === "yt-modal") youtubeGallery.closeModal();
        });

        // Close modals on Escape key
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            gallery.closeModal();
            youtubeGallery.closeModal();
          }
        });
      });

      // Auto-initialize carousel after page navigation
      const originalPageSwitcher = window.switchPage;
      if (originalPageSwitcher) {
        window.switchPage = function (pageName) {
          originalPageSwitcher(pageName);
          if (pageName === "projects") {
            setTimeout(() => {
              currentSlide = 0;
              updateCarousel();
            }, 100);
          }
        };
      }

      // ══════════════════════════════════════
      // HAMBURGER MOBILE NAV
      // ══════════════════════════════════════
      window.addEventListener("load", function initHamburgerNav() {
        const hamburger = document.getElementById("hamburger-btn");
        const mobDropdown = document.getElementById("mobile-nav-dropdown");
        const mobClose = document.getElementById("mob-nav-close");
        if (!hamburger || !mobDropdown) return;

        function openMobNav() {
          hamburger.classList.add("open");
          mobDropdown.classList.add("open");
          document.body.style.overflow = "hidden";
        }
        function closeMobNav() {
          hamburger.classList.remove("open");
          mobDropdown.classList.remove("open");
          document.body.style.overflow = "";
        }

        hamburger.addEventListener("click", () => {
          mobDropdown.classList.contains("open") ? closeMobNav() : openMobNav();
        });
        if (mobClose) mobClose.addEventListener("click", closeMobNav);

        // Mobile nav buttons → navigate page + close dropdown
        mobDropdown.querySelectorAll(".mob-nav-btn").forEach((btn) => {
          btn.addEventListener("click", () => {
            const target = btn.dataset.mobPage;
            document
              .querySelectorAll(".page")
              .forEach((p) => p.classList.remove("active"));
            document
              .querySelectorAll(".nav-btn")
              .forEach((b) => b.classList.remove("active"));
            document
              .querySelectorAll(".mob-nav-btn")
              .forEach((b) => b.classList.remove("active"));
            const pageEl = document.getElementById("page-" + target);
            const navBtn = document.querySelector(
              '[data-page="' + target + '"]',
            );
            if (pageEl) pageEl.classList.add("active");
            if (navBtn) navBtn.classList.add("active");
            btn.classList.add("active");
            closeMobNav();
            window.scrollTo(0, 0);
            if (target === "resume") animateSkills();
          });
        });
      });

      // ══════════════════════════════════════
      // LOGO BUTTON → Navigate to Home
      // ══════════════════════════════════════
      const aeLogoBtn = document.getElementById("ae-logo-home");
      if (aeLogoBtn) {
        aeLogoBtn.addEventListener("click", () => {
          document
            .querySelectorAll(".page")
            .forEach((p) => p.classList.remove("active"));
          document
            .querySelectorAll(".nav-btn")
            .forEach((b) => b.classList.remove("active"));
          const homePage = document.getElementById("page-about");
          const homeBtn = document.querySelector('[data-page="about"]');
          if (homePage) homePage.classList.add("active");
          if (homeBtn) homeBtn.classList.add("active");
          window.scrollTo(0, 0);
        });
      }

      // ══════════════════════════════════════
      // HOME PAGE CAROUSEL
      // ══════════════════════════════════════
      (function initHomeCarousel() {
        const track = document.getElementById("home-carousel-track");
        const prevBtn = document.getElementById("home-carousel-prev");
        const nextBtn = document.getElementById("home-carousel-next");
        const dotsWrap = document.getElementById("home-carousel-dots");
        const counter = document.getElementById("home-slide-counter");
        const progress = document.getElementById("home-carousel-progress");
        if (!track) return;

        const slides = track.querySelectorAll(".carousel-slide");
        const total = slides.length;
        let current = 0;
        let timer = null;
        const AUTO_DELAY = 4000;

        // Build dots
        slides.forEach((_, i) => {
          const btn = document.createElement("button");
          btn.className = "dot-btn" + (i === 0 ? " active" : "");
          btn.textContent = String(i + 1).padStart(2, "0");
          btn.addEventListener("click", () => {
            goTo(i);
            resetTimer();
          });
          dotsWrap.appendChild(btn);
        });

        function goTo(idx) {
          slides[current].classList.remove("active");
          dotsWrap
            .querySelectorAll(".dot-btn")
            [current].classList.remove("active");
          current = (idx + total) % total;
          slides[current].classList.add("active");
          dotsWrap
            .querySelectorAll(".dot-btn")
            [current].classList.add("active");
          if (counter)
            counter.textContent =
              String(current + 1).padStart(2, "0") +
              " / " +
              String(total).padStart(2, "0");
        }

        function startTimer() {
          if (progress) {
            progress.style.transition = "none";
            progress.style.width = "0%";
            requestAnimationFrame(() =>
              requestAnimationFrame(() => {
                progress.style.transition = "width " + AUTO_DELAY + "ms linear";
                progress.style.width = "100%";
              }),
            );
          }
          timer = setTimeout(() => {
            goTo(current + 1);
            startTimer();
          }, AUTO_DELAY);
        }
        function resetTimer() {
          clearTimeout(timer);
          startTimer();
        }

        if (prevBtn)
          prevBtn.addEventListener("click", () => {
            goTo(current - 1);
            resetTimer();
          });
        if (nextBtn)
          nextBtn.addEventListener("click", () => {
            goTo(current + 1);
            resetTimer();
          });

        // Keyboard (only when home page active)
        document.addEventListener("keydown", (e) => {
          const homeActive = document
            .getElementById("page-about")
            ?.classList.contains("active");
          if (!homeActive) return;
          if (e.key === "ArrowLeft") {
            goTo(current - 1);
            resetTimer();
          }
          if (e.key === "ArrowRight") {
            goTo(current + 1);
            resetTimer();
          }
        });

        startTimer();
      })();
