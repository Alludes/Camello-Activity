import { VehicleFactory } from "./modules/factory.js";
import { DashboardModule } from "./modules/dashboard.js";
import { vehicleObserver } from "./modules/observer.js";

const car = VehicleFactory.createVehicle("Car", 0, 100);

DashboardModule.init(car);
vehicleObserver.subscribe(DashboardModule.update);

document.getElementById("accelerateBtn").addEventListener("click", () => {
  car.accelerate();
  vehicleObserver.notify(car);
});

document.getElementById("brakeBtn").addEventListener("click", () => {
  car.brake();
  vehicleObserver.notify(car);
});

document.getElementById("refuelBtn").addEventListener("click", () => {
  car.refuel();
  vehicleObserver.notify(car);
});

document.getElementById("togglePowerBtn").addEventListener("click", () => {
  car.togglePower();
  vehicleObserver.notify(car);
});