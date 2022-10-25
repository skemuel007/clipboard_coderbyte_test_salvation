const crypto = require("crypto");

/* 
  Function names should be verbs and not adjectives 
  and parameter name should be more descriptive
*/
exports.determineCandidatePartitionKey = (keyGenerationInfo) => {
  /*
    DEFAULT_PARTITION_KEY describe the intent for the variable well 
    which is a predefined key option if alternative is not derived from the event .
  */
  const DEFAULT_PARTITION_KEY = "0";

  const MAX_PARTITION_KEY_LENGTH = 256;

  /* 
    this tells us more about the what the variable holds 
    that is the candidate's partition key instead of just 
    candidate which can be confused for candidate complete detail.
  */
  let candidatePartitionKey;

  // Nesting of if statements reduces code readability
  if (keyGenerationInfo && keyGenerationInfo.partitionKey) {
    candidatePartitionKey = keyGenerationInfo.partitionKey;
  }

  if (keyGenerationInfo) {
    /*
     Renamed data to eventInJSONStringFormat as it fully 
     defined the value of the variable and its format
    */
    const keyGenerationInfoInJSONStringFormat =
      JSON.stringify(keyGenerationInfo);

    candidatePartitionKey = crypto
      .createHash("sha3-512")
      .update(keyGenerationInfoInJSONStringFormat)
      .digest("hex");
  }

  // Nesting of if statements reduces code readability
  if (candidatePartitionKey && typeof candidatePartitionKey !== "string") {
    candidatePartitionKey = JSON.stringify(candidatePartitionKey);
  } else {
    candidatePartitionKey = DEFAULT_PARTITION_KEY;
  }

  if (candidatePartitionKey.length > MAX_PARTITION_KEY_LENGTH) {
    candidatePartitionKey = crypto
      .createHash("sha3-512")
      .update(candidatePartitionKey)
      .digest("hex");
  }

  return candidatePartitionKey;
};
