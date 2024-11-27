import {
  currentFirstElevatorFloor,
  currentFifthElevatorFloor,
  currentFourthElevatorFloor,
  currentSecondElevatorFloor,
  currentThirdElevatorFloor,
} from "./util.js";

function getFloorNumber(floorId) {
  const floorNumber = floorId.split("-").pop();
  return parseInt(floorNumber, 10);
}

export const elevators = [
  {
    id: "first",
    floor: getFloorNumber(currentFirstElevatorFloor),
    elevator: currentFirstElevatorFloor,
    busy: false,
    time: "",
  },
  {
    id: "second",
    floor: getFloorNumber(currentSecondElevatorFloor),
    elevator: currentSecondElevatorFloor,
    busy: false,
    time: "",
  },
  {
    id: "third",
    floor: getFloorNumber(currentThirdElevatorFloor),
    elevator: currentThirdElevatorFloor,
    busy: false,
    time: "",
  },
  {
    id: "fourth",
    floor: getFloorNumber(currentFourthElevatorFloor),
    elevator: currentFourthElevatorFloor,
    busy: false,
    time: "",
  },
  {
    id: "fifth",
    floor: getFloorNumber(currentFifthElevatorFloor),
    elevator: currentFifthElevatorFloor,
    busy: false,
    time: "",
  },
];
