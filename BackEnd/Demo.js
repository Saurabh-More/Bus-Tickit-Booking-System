import os from "os";
let totalCpu;
totalCpu=os.cpus().length;

console.log("Total No of CPUs: ",totalCpu);