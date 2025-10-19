export const VehicleFactory = (() => {
  function createVehicle(type, speed, fuel) {
    const base = {
      type,
      speed,
      fuel,
      isOn: false,  
      
      togglePower() {
        this.isOn = !this.isOn;
        if (!this.isOn) {
          this.speed = 0; 
        }
      },
      
      accelerate() {
        if (this.isOn && this.fuel > 0) {
          this.speed += 10;
          this.fuel -= 5;
        }
      },
      
      brake() {
        if (this.isOn) {
          this.speed = Math.max(0, this.speed - 10);
        }
      },
      
      refuel() {
        this.fuel = 100;
      }
    };
    return base;
  }

  return { createVehicle };
})();