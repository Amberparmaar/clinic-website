document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("hamburgerBtn");

  if (btn) {
    btn.addEventListener("click", toggleMobileMenu);
  }
});

function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("hidden");
}

function showBookingModal() {
  document.getElementById("bookingModal").classList.remove("hidden");
  document.getElementById("bookingModal").classList.add("flex");
}

function hideBookingModal() {
  const modal = document.getElementById("bookingModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

function handleBooking(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const service = document.getElementById("service").value;

  if (!name || !phone || !service) {
    alert("Please fill all required fields");
    return;
  }

  // WhatsApp Integration
  const message = `Hello MediCare Clinic,%0A%0AI would like to book an appointment:%0AName: ${name}%0APhone: ${phone}%0AService: ${service}`;
  const whatsappURL = `https://wa.me/923128568372?text=${message}`;

  window.open(whatsappURL, "_blank");

  // Show success toast
  showToast("Appointment request sent via WhatsApp!");

  hideBookingModal();
  e.target.reset();
}

// Toast Notification
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = `fixed bottom-6 left-1/2 -translate-x-1/2 bg-teal-700 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50`;
  toast.innerHTML = `
    <i class="fa-solid fa-check-circle"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = "all 0.4s";
    toast.style.opacity = "0";
    toast.style.transform = "translate(-50%, 20px)";
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// Close modal when clicking outside
document.addEventListener("click", function (e) {
  const modal = document.getElementById("bookingModal");
  if (e.target === modal) {
    hideBookingModal();
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.getAttribute("href") !== "#") {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
// Filter Services (for services.html)
const servicesData = [
  {
    id: 1,
    category: "dental",
    title: "Dental Care",
    desc: "Complete dental solutions including cleaning, fillings, root canals and cosmetic dentistry.",
    icon: "🦷",
  },
  {
    id: 2,
    category: "skin",
    title: "Skin & Dermatology",
    desc: "Treatment for acne, eczema, pigmentation, laser treatments and anti-aging procedures.",
    icon: "🧴",
  },
  {
    id: 3,
    category: "general",
    title: "General Checkup",
    desc: "Comprehensive health screening and preventive care packages.",
    icon: "🩺",
  },
  {
    id: 4,
    category: "dental",
    title: "Teeth Whitening",
    desc: "Professional teeth whitening and smile makeover services.",
    icon: "✨",
  },
  {
    id: 5,
    category: "skin",
    title: "Laser Hair Removal",
    desc: "Safe and effective permanent hair reduction using advanced laser technology.",
    icon: "🔬",
  },
  {
    id: 6,
    category: "general",
    title: "Vaccination",
    desc: "All routine and travel vaccinations with proper documentation.",
    icon: "💉",
  },
];

function renderServices(filteredServices) {
  const container = document.getElementById("servicesContainer");
  if (!container) return;

  container.innerHTML = filteredServices
    .map(
      (service) => `
    <div class="service-card glass border border-gray-100 rounded-3xl p-8">
      <div class="text-5xl mb-6">${service.icon}</div>
      <h3 class="text-2xl font-semibold mb-3">${service.title}</h3>
      <p class="text-gray-600 mb-8">${service.desc}</p>
      <button onclick="bookService('${service.title}')" 
              class="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-2xl font-medium transition">
        Book This Service
      </button>
    </div>
  `,
    )
    .join("");
}

function filterServices(category) {
  const buttons = document.querySelectorAll("#filterButtons button");
  buttons.forEach((btn) =>
    btn.classList.remove("active-filter", "border-teal-600", "text-teal-600"),
  );

  if (category === "all") {
    renderServices(servicesData);
  } else {
    const filtered = servicesData.filter((s) => s.category === category);
    renderServices(filtered);
  }
}

function bookService(serviceName) {
  showBookingModal();
  setTimeout(() => {
    const select = document.getElementById("service");
    if (select) select.value = serviceName;
  }, 500);
}

// Contact Form Handler
function handleContactForm(e) {
  e.preventDefault();
  showToast(
    "Thank you! Your message has been received. We'll contact you soon.",
  );
  e.target.reset();
}

// Initialize services on load
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("servicesContainer")) {
    renderServices(servicesData);
  }
});
