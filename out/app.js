function scheduleDeliveries(deliveries, vehicles) {
    //Sort the deliveries in ascending order of duration.
    deliveries.sort((a, b) => a.duration - b.duration);
    //Keep track of when each vehicle type is available.
    const availableAt = {
        truck: new Array(vehicles.trucks).fill(0),
        plane: new Array(vehicles.planes).fill(0),
    };
    //Keep track of when each delivery finishes.
    const finishesAt = new Map();
    //Loop through each delivery and schedule it.
    for (const delivery of deliveries) {
        //Including a start time so that we do not have to loop through the entire availableAt array.to get final time.
        let startTime = 0;
        //Loop through each vehicle type for the delivery.
        for (const vehicle of delivery.transports) {
            //Find the earliest available vehicle.
            const earliestAvailable = Math.min(...availableAt[vehicle]);
            startTime = Math.max(startTime, earliestAvailable);
            //Update the available time for the vehicle we're using.
            const index = availableAt[vehicle].indexOf(earliestAvailable);
            availableAt[vehicle][index] = startTime + delivery.duration;
        }
        //Record the finish time for the delivery.
        //Can i just keep track to the largest finish time instead of mapping it?
        finishesAt[delivery.id] = startTime + delivery.duration;
    }
    //The max finish time.
    const totalCompletionTime = Math.max(...Object.values(finishesAt));
    return totalCompletionTime;
}
const deliveries = [
    {
        id: "1",
        duration: 120,
        transports: ["truck", "plane"],
    },
    {
        id: "2",
        duration: 60,
        transports: ["truck"],
    },
    {
        id: "3",
        duration: 30,
        transports: ["plane"],
    },
    {
        id: "4",
        duration: 30,
        transports: ["truck", "plane"],
    },
    {
        id: "5",
        duration: 80,
        transports: ["truck", "truck", "truck"],
    },
    {
        id: "6",
        duration: 160,
        transports: ["plane", "truck"],
    },
];
const fleet = {
    trucks: 2,
    planes: 2,
};
console.log(scheduleDeliveries(deliveries, fleet)); //280
//# sourceMappingURL=app.js.map