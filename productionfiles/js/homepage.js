particlesJS("particles", {
    particles: {
      number: {
        value: 40, // Number of particles
        density: {
          enable: true,
          value_area: 800 // Adjust the density of particles
        }
      },
      color: {
        value: "#ffffff" // Change the color of particles
      },
      shape: {
        type: "circle",
        "image": {
            "src": "../static/img/tuneblaze.png",
            "width": 100,
            "height": 100
          } // Change the shape of particles (circle, edge, triangle, polygon, star, image)
      },
      size: {
        value: 3
      },
      line_linked: {
        enable: true,
        width:1,
        distance:200
      },
      move: {
        random: false, // Set to false for consistent particle movement
        speed: 5,
        attract:{
            enable:true
        },
        bounce:true
      }
      // More configuration options can be added here (e.g., size, opacity, line_linked, etc.)
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
          distance: 100,
          radius: 200
        },
        onclick: {
          enable: true,
          mode: "push" // Set mode for onclick event to "push"
        }
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 1
        }
      }
    },
    retina_detect: true
  });

  document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.getElementById('flexCheckDefault');
    const createAccountBtn = document.getElementById('createAccountBtn');

    checkbox.addEventListener('change', function () {
        createAccountBtn.disabled = !checkbox.checked;
    });
});