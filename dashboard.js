export const DashboardModule = (() => {
  const speedEl = document.getElementById("speed");
  const fuelEl = document.getElementById("fuel");
  const gaugeNeedle = document.getElementById("gaugeNeedle");
  const gaugeFill = document.getElementById("gaugeFill");
  const fuelLevel = document.getElementById("fuelLevel");
  const notification = document.getElementById("notification");
  const vehicleStatus = document.getElementById("vehicleStatus");
  const controls = document.querySelector('.controls');

  function init(vehicle) {
    update(vehicle);
    createGaugeMarks();
  }

  function update(vehicle) {
    speedEl.textContent = vehicle.speed;
    fuelEl.textContent = vehicle.fuel;
    
    vehicleStatus.textContent = vehicle.isOn ? "ON" : "OFF";
    vehicleStatus.className = vehicle.isOn ? "on" : "";
    controls.classList.toggle('disabled', !vehicle.isOn);
    
    const speedAngle = (vehicle.speed / 180) * 180; 
    gaugeNeedle.style.transform = `translateX(-50%) rotate(${speedAngle}deg)`;
    gaugeFill.style.transform = `rotate(${speedAngle}deg)`;

    fuelLevel.style.width = `${vehicle.fuel}%`;
    
    if (!vehicle.isOn && vehicle.speed > 0) {
      showNotification("Vehicle turned off. Speed reset to 0.", "warning");
    }
    
    if (vehicle.fuel <= 20 && vehicle.fuel > 0) {
      showNotification("Low fuel! Consider refueling soon.", "warning");
    } else if (vehicle.fuel === 0) {
      showNotification("Out of fuel! Please refuel to accelerate.", "warning");
    } else if (vehicle.fuel === 100) {
      showNotification("Tank refueled to full capacity!", "success");
    }
  }

  function createGaugeMarks() {
    const gaugeMarks = document.getElementById("gaugeMarks");
    for (let i = 0; i <= 180; i += 20) {
      const mark = document.createElement("div");
      mark.className = "gauge-mark";
      mark.style.transform = `translateX(-50%) rotate(${i}deg)`;
      
      if (i % 40 === 0) {
        const label = document.createElement("div");
        label.className = "gauge-label";
        label.textContent = i;
        label.style.left = `calc(50% + ${Math.sin(i * Math.PI / 180) * 70}px)`;
        label.style.bottom = `${15 - Math.cos(i * Math.PI / 180) * 70}px`;
        gaugeMarks.appendChild(label);
      }
      
      gaugeMarks.appendChild(mark);
    }
  }

  function showNotification(message, type) {
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }

  return { init, update };
})();