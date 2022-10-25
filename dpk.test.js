const { determineCandidatePartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const defaultKey = determineCandidatePartitionKey();
    expect(defaultKey).toBe("0");
  });

  it("Return the literal '0' when object is passed with field partitionKey set to integer  eg 23", () => {
    const candidatePartitionKey = determineCandidatePartitionKey({
      partitionKey: 23,
    });
    expect(candidatePartitionKey).toBe("0");
  });

  it("Return type string when object is passed with field partitionKey set to string literal eg  '23'", () => {
    const candidatePartitionKey = determineCandidatePartitionKey({
      partitionKey: "23",
    });
    expect(typeof candidatePartitionKey).toBe("string");
  });

  it("Return the literal 0 when  integer value is passed", () => {
    const candidatePartitionKey = determineCandidatePartitionKey(23);
    expect(candidatePartitionKey).toBe("0");
  });

  it("Return the literal 0 when string value is passed", () => {
    const candidatePartitionKey = determineCandidatePartitionKey("23");
    expect(candidatePartitionKey).toBe("0");
  });
});
