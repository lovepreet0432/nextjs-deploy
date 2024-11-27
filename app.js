// Grab all the necessary elements
const floors = document.querySelectorAll(".floor");

import { elevators } from "./constants.js";
import { pendingLifts } from "./util.js";
import { play } from "./util.js";
import { arrivedElevator, progressElevator } from "./util.js";
import {
  setElevatorBusy,
  changeElevatorFloor,
  getCurrentFloorNumber,
  getNearestElevator,
} from "./util.js";

// Add event listeners to the "Call" buttons on each floor
floors.forEach((floor) => {
  const button = floor.querySelector(".call-button");

  button.addEventListener("click", () => {
    const targetFloor = parseInt(button.getAttribute("data-floor"), 10);

    const closestElevator = getNearestElevator(targetFloor, button);

    button.textContent = "Waiting";
    button.style.backgroundColor = "red";
    button.disabled = true;
    if (closestElevator) {
      const currentFloorNumber = getCurrentFloorNumber(closestElevator);

      moveElevatorToFloor(
        currentFloorNumber,
        targetFloor,
        button,
        closestElevator
      );
      changeElevatorFloor(closestElevator, targetFloor);
    }
  
  });
});

// Function to move elevator to the selected floor
function moveElevatorToFloor(currentFloorNumber, targetFloor, button, res) {
  if (currentFloorNumber === targetFloor) {
    return;
  }
  const index = setElevatorBusy(res);
  const targetFloorDiv = document.getElementById(`floor-${targetFloor}`);
  const targetDivs = targetFloorDiv.querySelectorAll(".floorCol");
  targetDivs[index].textContent = `${elevators[index].time} sec`;

  let currentStep = parseInt(currentFloorNumber);
  let interval = setInterval(() => {
    if (currentStep < targetFloor) {
      moveStep(
        currentStep,
        currentStep + 1,
        index,
        targetFloor,
        button,
        targetDivs
      );
      currentStep++;
    } else if (currentStep > targetFloor) {
      moveStep(
        currentStep,
        currentStep - 1,
        index,
        targetFloor,
        button,
        targetDivs
      );
      currentStep--;
    } else {
      clearInterval(interval); // Stop the interval once the elevator reaches the target floor
    }
  }, 2000);
}

const moveStep = (
  fromFloor,
  toFloor,
  index,
  targetFloor,
  button,
  targetDivs
) => {
  const fromFloorDiv = document.getElementById(`floor-${fromFloor}`);
  const toFloorDiv = document.getElementById(`floor-${toFloor}`);

  const fromFloorDivs = fromFloorDiv.querySelectorAll(".floorCol");
  const currentElevatorContainer =
    fromFloorDivs[index].querySelector(".elevator");

  if (currentElevatorContainer) {
    elevators[index].time = elevators[index].time - 2;
    targetDivs[index].textContent = `${elevators[index].time} sec`;
    currentElevatorContainer.remove();
  }

  // Create a new elevator div and append it to the target floor
  let newElevator = "";
  if (toFloor == targetFloor) {
    newElevator = arrivedElevator();
    targetDivs[index].textContent = "";
    button.textContent = "Arrived";
    button.style.backgroundColor = "green";

    setTimeout(() => {
      const imgElement = targetDivs[index].querySelector(".elevator img");
      if (imgElement) {
        imgElement.src = "images/icons8-elevator.svg";
      }
      button.textContent = "Call";
      button.style.backgroundColor = "#1cc31f";
      button.disabled = false;
    }, 2000);
    elevators[index].busy = false;
    elevators[index].floor = targetFloor;
    elevators[index].elevator = `floor-${targetFloor}`;

    if (pendingLifts.length > 0) {
      const element = pendingLifts.shift();
      if (element) {
        const closestElevator = getNearestElevator(element.targetFloor);
        const currentFloorNumber = getCurrentFloorNumber(closestElevator);

        moveElevatorToFloor(
          currentFloorNumber,
          element.targetFloor,
          element.button,
          closestElevator
        );
        changeElevatorFloor(closestElevator, element.targetFloor);
      }
    }
    play();
  } else {
    newElevator = progressElevator();
  }
  const floorDivs = toFloorDiv.querySelectorAll(".floorCol");
  floorDivs[index].appendChild(newElevator);
};
