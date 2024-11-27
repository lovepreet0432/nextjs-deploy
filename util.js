export let currentFirstElevatorFloor = "floor-0";
export let currentSecondElevatorFloor = "floor-0";
export let currentThirdElevatorFloor = "floor-0";
export let currentFourthElevatorFloor = "floor-0";
export let currentFifthElevatorFloor = "floor-0";

export let pendingLifts = [];

import { elevators } from "./constants.js";

export function play() {
  let audio = new Audio(
    "https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3"
  );
  audio.play();
}

export function changeElevatorFloor(res, targetFloor) {
  if (res.id == "first") {
    currentFirstElevatorFloor = `floor-${targetFloor}`;
  } else if (res.id == "second") {
    currentSecondElevatorFloor = `floor-${targetFloor}`;
  } else if (res.id == "third") {
    currentThirdElevatorFloor = `floor-${targetFloor}`;
  } else if (res.id == "fourth") {
    currentFourthElevatorFloor = `floor-${targetFloor}`;
  } else if (res.id == "fifth") {
    currentFifthElevatorFloor = `floor-${targetFloor}`;
  }
}

export function getCurrentFloorNumber(currentFloorDiv) {
  const currentFloor = document.getElementById(
    `floor-${currentFloorDiv.floor}`
  );
  const floorId = currentFloor ? currentFloor.id : null;
  const currentFloorNumber = floorId ? floorId.split("-")[1] : null;
  return currentFloorNumber;
}

export function getNearestElevator(targetFloor, button) {
  const availableElevators = elevators.filter(
    (elevator) => !elevator.busy && elevator.floor != targetFloor
  );
  if (availableElevators.length > 0) {
    let closestElevator = availableElevators[0];
    let minDifference = Math.abs(targetFloor - closestElevator.floor);

    availableElevators.forEach((elevator) => {
      const difference = Math.abs(targetFloor - elevator.floor);
      if (difference < minDifference) {
        minDifference = difference;
        closestElevator = elevator;
      }
    });
    setElevatorTime(closestElevator, minDifference);
    return closestElevator;
  } else {
    pendingLifts.push({ targetFloor, button });
  }
}

export function setElevatorBusy(elevator) {
  let index = 0;
  if (elevator.id == "first") {
    elevators[0].busy = true;
    return (index = 0);
  } else if (elevator.id == "second") {
    elevators[1].busy = true;
    return (index = 1);
  } else if (elevator.id == "third") {
    elevators[2].busy = true;
    return (index = 2);
  } else if (elevator.id == "fourth") {
    elevators[3].busy = true;
    return (index = 3);
  } else if (elevator.id == "fifth") {
    elevators[4].busy = true;
    return (index = 4);
  }
}

export function setElevatorTime(elevator, min) {
  if (elevator.id == "first") {
    elevators[0].time = min * 2;
  } else if (elevator.id == "second") {
    elevators[1].time = min * 2;
  } else if (elevator.id == "third") {
    elevators[2].time = min * 2;
  } else if (elevator.id == "fourth") {
    elevators[3].time = min * 2;
  } else if (elevator.id == "fifth") {
    elevators[4].time = min * 2;
  }
}

export function arrivedElevator() {
  const newElevator = document.createElement("div");
  newElevator.classList.add("elevator");
  newElevator.innerHTML = '<img src="images/Vector-Green.svg" height="50px" />';
  return newElevator;
}

export function progressElevator() {
  const newElevator = document.createElement("div");
  newElevator.classList.add("elevator");
  newElevator.innerHTML = '<img src="images/Vector-Red.svg" height="50px" />';
  return newElevator;
}
