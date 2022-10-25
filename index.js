const { determineCandidatePartitionKey } = require("./dpk");

//
console.log(determineCandidatePartitionKey({ partitionKey: 23 }));
