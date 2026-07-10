/* ==========================================================================
   ROBLOX CRUISE SHIP SIMULATOR JS - BY TABLEBOARD STUDIOS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- MOBILE HAMBURGER MENU ---
  const hamburger = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close nav on menu item click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // --- SMOOTH ACTIVE NAV SCROLLING HIGHLIGHT ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // --- HERO STATS COUNTER ANIMATION ---
  const stats = document.querySelectorAll('.stat-number');
  const speed = 100; // lower is faster

  const startCounters = () => {
    stats.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = Math.ceil(target / speed);

        if (count < target) {
          counter.innerText = count + inc;
          setTimeout(updateCount, 15);
        } else {
          // Format with commas if large number
          counter.innerText = target.toLocaleString();
        }
      };
      updateCount();
    });
  };

  // Trigger counters on load (or could use IntersectionObserver)
  startCounters();


  // --- FLEET SHOWCASE DATABASE & INTERACTIVITY ---
  const shipData = {
    allegra: {
      name: "The Allegra Class",
      desc: "The perfect vessel for starting Captains. Compact, nimble, and highly maneuverable, the Allegra Class lets you learn the ropes of docking and navigating narrow ports with ease.",
      badge: "ENTRY CLASS",
      length: "180m",
      capacity: "1,200 Passengers",
      speed: "21 knots",
      difficulty: "Easy",
      lenPercent: 35,
      capPercent: 25,
      spdPercent: 60,
      diffPercent: 20,
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
      features: [
        "Highly responsive twin rudders",
        "Great for shallow water harbor entry",
        "Optimized fuel consumption"
      ]
    },
    vista: {
      name: "The Vista Class",
      desc: "A massive modern cruiser balancing luxurious comfort and powerful cruising capabilities. Equipped with side-thrusters, the Vista Class provides smooth docking without tugboats.",
      badge: "MID-TIER CLASS",
      length: "300m",
      capacity: "3,800 Passengers",
      speed: "24 knots",
      difficulty: "Moderate",
      lenPercent: 65,
      capPercent: 60,
      spdPercent: 75,
      diffPercent: 55,
      image: "https://images.unsplash.com/photo-1548543604-a87c9909abec?q=80&w=800&auto=format&fit=crop",
      features: [
        "Dynamic Azipod propulsion systems",
        "Dual lateral bow and stern thrusters",
        "Mid-deck high glass sky-walk"
      ]
    },
    oasis: {
      name: "The Oasis Class",
      desc: "An almighty floating city. The crown jewel of any Elite Captain's harbor. Command the oceans in a ship that spans over 1,100 feet. Heavy inertia makes stopping a strategic art form.",
      badge: "PINNACLE CLASS",
      length: "362m",
      capacity: "6,780 Passengers",
      speed: "22.5 knots",
      difficulty: "Hard",
      lenPercent: 95,
      capPercent: 98,
      spdPercent: 70,
      diffPercent: 90,
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop",
      features: [
        "Unrivaled scale and double-hull construction",
        "Three powerful bow thruster turbines",
        "Massive cash bonuses for successful voyages"
      ]
    },
    specialty: {
      name: "The Specialty Support Fleet",
      desc: "Change your perspective on maritime operations. Tow massive liners with high-bollard pull harbor tugs, or sail specialized LNG tankers to replenish cruise ships mid-route.",
      badge: "CO-OP UTILITY",
      length: "Varies (40m - 290m)",
      capacity: "Crew-Only / Fuel",
      speed: "16 - 20 knots",
      difficulty: "Specialized",
      lenPercent: 45,
      capPercent: 10,
      spdPercent: 50,
      diffPercent: 75,
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
      features: [
        "High tension towing lines for tug operations",
        "At-sea refueling mechanics (earn shared cash)",
        "Unique harbor authority clearance privileges"
      ]
    }
  };

  const fleetTabs = document.querySelectorAll('.fleet-tab');
  const shipCard = document.getElementById('shipCard');

  // Element selectors in card
  const shipName = document.getElementById('shipName');
  const shipDesc = document.getElementById('shipDesc');
  const shipImage = document.getElementById('shipImage');
  const shipClassBadge = document.getElementById('shipClassBadge');
  const statLength = document.getElementById('statLength');
  const valLength = document.getElementById('valLength');
  const statCapacity = document.getElementById('statCapacity');
  const valCapacity = document.getElementById('valCapacity');
  const statSpeed = document.getElementById('statSpeed');
  const valSpeed = document.getElementById('valSpeed');
  const statDifficulty = document.getElementById('statDifficulty');
  const valDifficulty = document.getElementById('valDifficulty');
  const shipFeaturesList = document.getElementById('shipFeatures');

  fleetTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Manage active states
      fleetTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const shipKey = tab.getAttribute('data-ship');
      const data = shipData[shipKey];

      // Add fade animation reset
      shipCard.style.animation = 'none';
      setTimeout(() => {
        shipCard.style.animation = 'fadeIn 0.5s ease';
      }, 10);

      // Populate Data
      shipName.textContent = data.name;
      shipDesc.textContent = data.desc;
      shipClassBadge.textContent = data.badge;
      shipImage.src = data.image;

      // Stats Bars
      statLength.style.width = data.lenPercent + '%';
      valLength.textContent = data.length;

      statCapacity.style.width = data.capPercent + '%';
      valCapacity.textContent = data.capacity;

      statSpeed.style.width = data.spdPercent + '%';
      valSpeed.textContent = data.speed;

      statDifficulty.style.width = data.diffPercent + '%';
      valDifficulty.textContent = data.difficulty;

      // Features list
      shipFeaturesList.innerHTML = '';
      data.features.forEach(feat => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${feat}`;
        shipFeaturesList.appendChild(li);
      });
    });
  });


  // --- INTERACTIVE COURSE MAP PORT SELECTION ---
  const portData = {
    barcelona: {
      name: "Barcelona Port",
      region: "MEDITERRANEAN",
      desc: "The cultural capital of Catalonia. Offers tight dockings alongside the world's most luxurious mega-yachts. Navigating the outer wall requires careful speed management.",
      reward: "$2,500 + XP",
      difficulty: "Moderate",
      size: "All Classes"
    },
    santorini: {
      name: "Santorini Caldera",
      region: "MEDITERRANEAN",
      desc: "One of the world's most beautiful volcanic craters. No dock exists, requiring Captains to successfully anchor in the deep caldera bay and deploy passenger tenders.",
      reward: "$4,200 + XP",
      difficulty: "Hard",
      size: "Allegra & Vista"
    },
    venice: {
      name: "Venice Canals",
      region: "MEDITERRANEAN",
      desc: "Navigate beautiful, highly-restricted lagoon waterways. Watch your wake! Over-speeding causes water surge damage resulting in heavy fines from the local authorities.",
      reward: "$5,500 + XP",
      difficulty: "Expert",
      size: "Allegra Class Only"
    },
    nassau: {
      name: "Nassau Harbour",
      region: "THE BAHAMAS",
      desc: "A wide, tropical channel that accommodates up to six mega-liners side-by-side. Beware of sudden tropical trade winds that can push large ships off course.",
      reward: "$2,000 + XP",
      difficulty: "Easy",
      size: "All Classes"
    },
    cococay: {
      name: "CocoCay Island",
      region: "THE BAHAMAS",
      desc: "A custom private resort island terminal. Features high currents along the dock. Perfect for practicing the usage of lateral thrusters in high winds.",
      reward: "$3,800 + XP",
      difficulty: "Moderate",
      size: "Vista & Oasis Classes"
    }
  };

  const mapMarkers = document.querySelectorAll('.map-marker');
  const portDetailCard = document.getElementById('portDetailCard');
  const portRegion = document.getElementById('portRegion');
  const portName = document.getElementById('portName');
  const portDesc = document.getElementById('portDesc');
  const portReward = document.getElementById('portReward');
  const portDifficulty = document.getElementById('portDifficulty');
  const portSize = document.getElementById('portSize');

  mapMarkers.forEach(marker => {
    marker.addEventListener('click', () => {
      mapMarkers.forEach(m => m.classList.remove('active'));
      marker.classList.add('active');

      const portKey = marker.getAttribute('data-port');
      const data = portData[portKey];

      // Add fade animation reset
      portDetailCard.style.animation = 'none';
      setTimeout(() => {
        portDetailCard.style.animation = 'fadeIn 0.4s ease';
      }, 10);

      // Populate details
      portRegion.textContent = data.region;
      portName.textContent = data.name;
      portDesc.textContent = data.desc;
      portReward.textContent = data.reward;
      portDifficulty.textContent = data.difficulty;
      portSize.textContent = data.size;
    });
  });


  // --- CAPTAIN'S BRIDGE MINI-SIMULATOR GAMEPLAY ---
  let heading = 0; // Degrees (0 - 359)
  let speedKts = 0.0; // Current Speed
  let depth = 124.5; // Ocean depth
  let rudderAngle = 0; // Angle of rudder (-35 to +35 degrees)
  let targetThrust = 0; // Desired thrust percentage from slider (0 - 100)
  let currentThrust = 0; // Actual current engine thrust ramping up/down

  // DOM bridge elements
  const teleHeading = document.getElementById('teleHeading');
  const teleSpeed = document.getElementById('teleSpeed');
  const teleDepth = document.getElementById('teleDepth');
  const teleRudder = document.getElementById('teleRudder');
  const teleThrust = document.getElementById('teleThrust');
  const teleAlert = document.getElementById('teleAlert');

  const steeringWheel = document.getElementById('steeringWheel');
  const thrustSlider = document.getElementById('thrustSlider');
  const thrustSliderReadout = document.getElementById('thrustSliderReadout');

  // Steering controls buttons
  const steerLeft = document.getElementById('steerLeft');
  const steerCenter = document.getElementById('steerCenter');
  const steerRight = document.getElementById('steerRight');

  // --- RADAR CANVAS SIMULATION RENDERING ---
  const canvas = document.getElementById('radarCanvas');
  const ctx = canvas.getContext('2d');
  const radarRadius = canvas.width / 2;

  // Blips data (simulating nearby islands / obstacles)
  let blips = [
    { angle: 45, dist: 0.4, size: 5, pulse: 1, label: "TUG-1" },
    { angle: 160, dist: 0.7, size: 12, pulse: 0.5, label: "SHOAL" },
    { angle: 280, dist: 0.3, size: 8, pulse: 0.8, label: "BUOY 4A" },
    { angle: 320, dist: 0.85, size: 16, pulse: 0.3, label: "ISLAND EDGE" }
  ];

  const drawRadarBlips = () => {
    blips.forEach(blip => {
      // Calculate coordinates relative to center
      const angleRad = (blip.angle - heading - 90) * (Math.PI / 180);
      const r = blip.dist * (radarRadius - 15);
      const x = radarRadius + r * Math.cos(angleRad);
      const y = radarRadius + r * Math.sin(angleRad);

      // Draw blip halo/pulse
      ctx.beginPath();
      ctx.arc(x, y, blip.size * (1 + blip.pulse * 0.4), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 242, 254, ${0.1 * blip.pulse})`;
      ctx.fill();

      // Draw solid blip center
      ctx.beginPath();
      ctx.arc(x, y, blip.size / 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 242, 254, ${blip.pulse})`;
      ctx.fill();

      // Draw text label
      ctx.font = "7px 'Orbitron', sans-serif";
      ctx.fillStyle = "rgba(0, 242, 254, 0.6)";
      ctx.fillText(blip.label, x + blip.size, y + 3);

      // Pulse fade cycling
      blip.pulse -= 0.01;
      if (blip.pulse <= 0) {
        blip.pulse = 1;
      }
    });

    // Draw Central Ship marker
    ctx.beginPath();
    ctx.moveTo(radarRadius, radarRadius - 8);
    ctx.lineTo(radarRadius + 4, radarRadius + 5);
    ctx.lineTo(radarRadius - 4, radarRadius + 5);
    ctx.closePath();
    ctx.fillStyle = "#ff9f43";
    ctx.fill();
  };

  const clearRadar = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // --- PHYSICS ENGINE TICK (Simulation Loop) ---
  const updateSimulation = () => {
    // 1. Engine thrust easing towards target slider thrust
    const thrustDiff = targetThrust - currentThrust;
    if (Math.abs(thrustDiff) > 0.5) {
      currentThrust += thrustDiff * 0.05; // ease thrust
    } else {
      currentThrust = targetThrust;
    }
    teleThrust.textContent = `${Math.round(currentThrust)}%`;

    // 2. Speed formula based on current thrust and inertia
    const maxSpeed = 24.5; // knots
    const theoreticalSpeed = (currentThrust / 100) * maxSpeed;
    const speedDiff = theoreticalSpeed - speedKts;
    speedKts += speedDiff * 0.015; // slow speed adjustment to simulate heavy ship mass
    teleSpeed.textContent = `${speedKts.toFixed(1)} KTS`;

    // 3. Rudder effect based on velocity
    if (speedKts > 0.1) {
      // Turning speed depends on current speed and rudder angle
      const turnRate = (rudderAngle / 35) * (speedKts / maxSpeed) * 0.8;
      heading = (heading + turnRate + 360) % 360;
    }

    // Format heading text
    const roundedHeading = Math.round(heading);
    teleHeading.textContent = `${roundedHeading.toString().padStart(3, '0')}°`;

    // 4. Update Depth depending on speed and slight noise
    if (speedKts > 0.5) {
      depth += (Math.sin(Date.now() / 8000) * 0.1) - (speedKts * 0.01);
      if (depth < 10) depth = 120.0; // reset/wrap
    }
    teleDepth.textContent = `${depth.toFixed(1)} M`;

    // 5. Alarms / Alerts trigger
    if (depth < 15.0) {
      teleAlert.textContent = "SHALLOW WATER";
      teleAlert.className = "tele-val value-alert";
    } else if (speedKts > 22.0) {
      teleAlert.textContent = "CRITICAL VELOCITY";
      teleAlert.className = "tele-val value-alert";
    } else {
      teleAlert.textContent = "CLEAR / NORMAL";
      teleAlert.className = "tele-val value-green";
    }

    // --- RENDER VISUALS ---
    // Steering Wheel graphic rotation
    steeringWheel.style.transform = `rotate(${rudderAngle * 5}deg)`;

    // Rudder numerical value readout
    let directionWord = "MID";
    if (rudderAngle > 0) directionWord = `${rudderAngle}° STBD`;
    if (rudderAngle < 0) directionWord = `${Math.abs(rudderAngle)}° PORT`;
    teleRudder.textContent = directionWord;

    // Refresh Canvas Radar display
    clearRadar();
    drawRadarBlips();

    requestAnimationFrame(updateSimulation);
  };

  // --- CONTROLLER EVENTS & COMMANDS ---

  // Throttle (Telegraph) slider
  thrustSlider.addEventListener('input', (e) => {
    targetThrust = +e.target.value;
    thrustSliderReadout.textContent = `${targetThrust}%`;
  });

  // Manual Steering Buttons
  steerLeft.addEventListener('click', () => {
    rudderAngle = Math.max(-35, rudderAngle - 5);
  });

  steerCenter.addEventListener('click', () => {
    rudderAngle = 0;
  });

  steerRight.addEventListener('click', () => {
    rudderAngle = Math.min(35, rudderAngle + 5);
  });

  // Handle keyboard inputs for accessibility and premium feel
  document.addEventListener('keydown', (e) => {
    const isBridgeInView = document.getElementById('simulator').getBoundingClientRect().top < window.innerHeight;
    if (!isBridgeInView) return; // Only process when simulator is scrolled into view

    if (e.key === "ArrowLeft") {
      rudderAngle = Math.max(-35, rudderAngle - 5);
      e.preventDefault();
    }
    if (e.key === "ArrowRight") {
      rudderAngle = Math.min(35, rudderAngle + 5);
      e.preventDefault();
    }
    if (e.key === "ArrowUp") {
      targetThrust = Math.min(100, targetThrust + 10);
      thrustSlider.value = targetThrust;
      thrustSliderReadout.textContent = `${targetThrust}%`;
      e.preventDefault();
    }
    if (e.key === "ArrowDown") {
      targetThrust = Math.max(0, targetThrust - 10);
      thrustSlider.value = targetThrust;
      thrustSliderReadout.textContent = `${targetThrust}%`;
      e.preventDefault();
    }
  });

  // Drag steering wheel directly
  let isDraggingWheel = false;
  let startAngle = 0;

  steeringWheel.addEventListener('mousedown', (e) => {
    isDraggingWheel = true;
    const rect = steeringWheel.getBoundingClientRect();
    const center_x = rect.left + rect.width / 2;
    const center_y = rect.top + rect.height / 2;
    startAngle = Math.atan2(e.clientY - center_y, e.clientX - center_x);
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDraggingWheel) return;

    const rect = steeringWheel.getBoundingClientRect();
    const center_x = rect.left + rect.width / 2;
    const center_y = rect.top + rect.height / 2;
    const currentAngle = Math.atan2(e.clientY - center_y, e.clientX - center_x);

    // Angle delta
    let delta = (currentAngle - startAngle) * (180 / Math.PI);

    // Smooth boundary clamp
    let proposedRudder = Math.round(rudderAngle + delta * 0.3);
    rudderAngle = Math.max(-35, Math.min(35, proposedRudder));
    startAngle = currentAngle;
  });

  document.addEventListener('mouseup', () => {
    isDraggingWheel = false;
  });

  // Touch Support for Mobile
  steeringWheel.addEventListener('touchstart', (e) => {
    isDraggingWheel = true;
    const rect = steeringWheel.getBoundingClientRect();
    const center_x = rect.left + rect.width / 2;
    const center_y = rect.top + rect.height / 2;
    const touch = e.touches[0];
    startAngle = Math.atan2(touch.clientY - center_y, touch.clientX - center_x);
  });

  document.addEventListener('touchmove', (e) => {
    if (!isDraggingWheel) return;

    const rect = steeringWheel.getBoundingClientRect();
    const center_x = rect.left + rect.width / 2;
    const center_y = rect.top + rect.height / 2;
    const touch = e.touches[0];
    const currentAngle = Math.atan2(touch.clientY - center_y, touch.clientX - center_x);

    let delta = (currentAngle - startAngle) * (180 / Math.PI);
    let proposedRudder = Math.round(rudderAngle + delta * 0.3);
    rudderAngle = Math.max(-35, Math.min(35, proposedRudder));
    startAngle = currentAngle;
  });

  document.addEventListener('touchend', () => {
    isDraggingWheel = false;
  });


  // --- AUDIO SYNTHESIZER: SHIP'S HORN ---
  const hornBtn = document.getElementById('hornBtn');
  let audioCtx = null;

  hornBtn.addEventListener('click', () => {
    try {
      // Lazy-init Audio Context
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }

      // Resume context if suspended
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // Generate deep rich cruise ship horn tone (Combining low frequencies)
      const duration = 1.8; // Seconds
      const gainNode = audioCtx.createGain();

      // Dual oscillator setup to synthesize deep rumble
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(55, audioCtx.currentTime); // A1 note - deep rumbling frequency

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(82.4, audioCtx.currentTime); // E2 note - harmonic frequency

      // Audio envelope
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.6, audioCtx.currentTime + 0.1); // Fast attack
      gainNode.gain.setValueAtTime(0.6, audioCtx.currentTime + duration - 0.3);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration); // Smooth decay

      // High shelf filter to soften harsh sawtooth harmonic peaks
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, audioCtx.currentTime);

      // Connect nodes
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      // Start & Stop
      osc1.start();
      osc2.start();
      osc1.stop(audioCtx.currentTime + duration);
      osc2.stop(audioCtx.currentTime + duration);

      // Visual feedback to button during sound play
      hornBtn.style.backgroundColor = '#ff9f43';
      hornBtn.style.color = '#050b14';
      hornBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i> HONK HONK!`;

      setTimeout(() => {
        hornBtn.style.backgroundColor = '';
        hornBtn.style.color = '';
        hornBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i> SOUND SHIP'S HORN`;
      }, duration * 1000);

    } catch (err) {
      console.warn("Web Audio API is blocked or not fully supported in this browser environment.", err);
    }
  });

  // --- COCKPIT/EMERGENCY ALARM CONTROLLER ---
  const alarmBtn = document.getElementById('alarmBtn');
  const simulatorSection = document.getElementById('simulator');
  let alarmAudio = null;
  let isAlarmPlaying = false;
  let synthAlarmInterval = null;
  let customAlarmAudio = null; // Store user-uploaded audio

  // Track active synthesized nodes to force terminate them immediately when turning off the alarm
  let activeSynthOscillators = [];
  let activeSynthGains = [];

  // Synthesize standard cruise ship emergency alarm sound (7 short and 1 long blast)
  const playSynthesizedEmergencyAlarm = () => {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      let blastCount = 0;

      const fireBlast = (duration) => {
        if (!isAlarmPlaying) return;
        const gainNode = audioCtx.createGain();
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();

        // Replicate deep, powerful, low-frequency Carnival Cruise horn blasts (55Hz / 82.4Hz)
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(55, audioCtx.currentTime); // A1 note - deep rumbling frequency
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(82.4, audioCtx.currentTime); // E2 note - harmonic frequency

        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.6, audioCtx.currentTime + 0.1); // Fast attack
        gainNode.gain.setValueAtTime(0.6, audioCtx.currentTime + duration - 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration); // Smooth decay

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(300, audioCtx.currentTime); // Soften high harmonic peaks

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc1.start();
        osc2.start();

        // Save references so we can stop them instantly if the user clicks "TURN OFF ALARM"
        activeSynthOscillators.push(osc1, osc2);
        activeSynthGains.push(gainNode);

        // Schedule normal stop
        osc1.stop(audioCtx.currentTime + duration);
        osc2.stop(audioCtx.currentTime + duration);

        // Cleanup references after playback completes
        setTimeout(() => {
          activeSynthOscillators = activeSynthOscillators.filter(o => o !== osc1 && o !== osc2);
          activeSynthGains = activeSynthGains.filter(g => g !== gainNode);
        }, duration * 1000 + 100);
      };

      const tickAlarm = () => {
        if (!isAlarmPlaying) return;
        if (blastCount < 7) {
          // Play a short blast (300ms)
          fireBlast(0.30);
          blastCount++;
          synthAlarmInterval = setTimeout(tickAlarm, 600); // Wait 600ms between short blasts
        } else {
          // Play 1 long blast (2.0s)
          fireBlast(2.0);
          blastCount = 0;
          synthAlarmInterval = setTimeout(tickAlarm, 3000); // Wait 3.0s after long blast to loop
        }
      };

      tickAlarm();

    } catch (err) {
      console.warn("Synth warning:", err);
    }
  };

  alarmBtn.addEventListener('click', () => {
    isAlarmPlaying = !isAlarmPlaying;

    if (isAlarmPlaying) {
      alarmBtn.classList.add('active');
      alarmBtn.innerHTML = `<i class="fa-solid fa-bell-slash"></i> TURN OFF ALARM`;
      simulatorSection.classList.add('red-alert-active');
      teleAlert.textContent = "GENERAL EMERGENCY ALARM";
      teleAlert.className = "tele-val value-alert";

      // Priority: Use custom uploaded audio if available
      if (customAlarmAudio) {
        customAlarmAudio.currentTime = 0;
        customAlarmAudio.loop = true;
        customAlarmAudio.play()
          .then(() => {
            console.log("Custom alarm audio played successfully.");
          })
          .catch(err => {
            console.warn("Custom audio playback failed, falling back to synthesis...", err);
            playSynthesizedEmergencyAlarm();
          });
      } else {
        // Fallback to synthesized alarm
        playSynthesizedEmergencyAlarm();
      }

    } else {
      alarmBtn.classList.remove('active');
      alarmBtn.innerHTML = `<i class="fa-solid fa-bell"></i> TURN ON EVAC ALARM`;
      simulatorSection.classList.remove('red-alert-active');
      teleAlert.textContent = "CLEAR / NORMAL";
      teleAlert.className = "tele-val value-green";

      // 1. Stop custom audio if playing
      if (customAlarmAudio) {
        customAlarmAudio.pause();
        customAlarmAudio.currentTime = 0;
      }

      // 2. Stop scheduled Synth timeouts
      if (synthAlarmInterval) {
        clearTimeout(synthAlarmInterval);
        synthAlarmInterval = null;
      }

      // 3. Immediately silence and stop all currently active synthesized sound blasts
      activeSynthGains.forEach(gainNode => {
        try {
          gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
          gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        } catch(e){}
      });
      activeSynthOscillators.forEach(osc => {
        try {
          osc.stop();
        } catch(e){}
      });

      // Clear arrays
      activeSynthOscillators = [];
      activeSynthGains = [];
    }
  });

  // --- AUDIO FILE UPLOAD HANDLER ---
  const audioUploadBtn = document.getElementById('audioUploadBtn');
  const audioFileInput = document.getElementById('audioFileInput');
  const uploadStatus = document.getElementById('uploadStatus');

  audioUploadBtn.addEventListener('click', () => {
    audioFileInput.click();
  });

  audioFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB in bytes
    if (file.size > maxSize) {
      uploadStatus.textContent = '❌ File too large (max 50MB)';
      uploadStatus.style.color = '#e74c3c';
      setTimeout(() => {
        uploadStatus.textContent = '';
      }, 3000);
      return;
    }

    // Validate file type
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/webm', 'audio/mp4'];
    if (!validTypes.includes(file.type)) {
      uploadStatus.textContent = '❌ Invalid audio format (MP3, WAV, OGG, WebM supported)';
      uploadStatus.style.color = '#e74c3c';
      setTimeout(() => {
        uploadStatus.textContent = '';
      }, 3000);
      return;
    }

    // Create blob URL from file
    const audioURL = URL.createObjectURL(file);
    
    // Create audio element and set source
    customAlarmAudio = new Audio();
    customAlarmAudio.src = audioURL;
    
    // Show success message
    uploadStatus.textContent = `✓ Loaded: ${file.name}`;
    uploadStatus.style.color = '#2ecc71';
    audioUploadBtn.innerHTML = `<i class="fa-solid fa-check"></i> CUSTOM ALARM LOADED`;
    audioUploadBtn.style.background = 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)';

    setTimeout(() => {
      uploadStatus.textContent = '';
    }, 4000);
  });

  // --- FAQ ACCORDION INTERACTIVITY ---
  const faqToggles = document.querySelectorAll('.faq-toggle');

  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const parent = toggle.parentElement;
      const content = toggle.nextElementSibling;

      // Toggle Active class
      parent.classList.toggle('active');

      if (parent.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = 0;
      }

      // Smoothly close other accordion rows
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== parent && item.classList.contains('active')) {
          item.classList.remove('active');
          item.querySelector('.faq-content').style.maxHeight = 0;
        }
      });
    });
  });

  // Start the Bridge Simulator simulation loops
  updateSimulation();

});
