This project contains two challenges - a "Ticket Breakdown" challenge and a "Refactoring" challenge. The two challenges are unrelated, but you should complete both in the same folder and share the link in Coderbyte. Any written answers should be included in markdown files within this folder.

## [Ticket Breakdown](Ticket_Breakdown.md)

## Task Breakdown

Assuming an agent can work for multiple facilities

### Task

1. Create a new table _agent_facility_ with columns as foreign key relationship to _facility_ and _agent_ tables repectively
   id, agent_id *[FK], *facility_id *[FK], *custom_facility_id, created_at, updated_at

#### Aceptance Criteria For Task 1

- Create new table _agent_facility_ to store details of agents assigned to a facilities using migrations
- Ensure agent cannot be assigned to same facility twice.
- As a staffing company, I should be able to assign an agent to a facility providing a custom_facility_id

_Story Point_: 1

2. To book agents for shifts in different facilities, _agent_facility_ id should be a foreign key in the _shift_ table

_Story Point_: 2

#### Aceptance Criteria For Task 2

- _shift_ table should have the following columns, id, agent_facility_id *[FK], *start_date_time, end_date_time, created_at, updated_at
- To assign agents for shifts in a facility, I should pass the _agent_facility_ table id
- To generate a report for agents that work in, I should be able to pass the custom*facility_id(s) joining the \_shifts* table to generate quaterly report for facilities
- When booking agent shift, ensure that agent assigned to a particular facility cannot be added in the same time period

### Resource Allocation

Task can be completed by 1 Engineer 1 day and half assuming TDD is carried out

## [Refactoring](Refactoring.md)

- Function names should be verbs and not adjectives and parameter name should be more descriptive as shown in the code snippet below

```bash
exports.deterministicPartitionKey = (event)

to

exports.determineCandidatePartitionKey = (keyGenerationInfo)
```

- DEFAULT_PARTITION_KEY describe the intent for the variable well which is a predefined key option if alternative is not derived from the event

```bash
TRIVIAL_PARTITION_KEY

to

DEFAULT_PARTITION_KEY
```

- Variable Name should be more decriptive tells us more about the what the variable holds that is the candidate's partition key instead of just candidate which can be confused for candidate complete detail.

```bash
candidate

to

candidatePartitionKey
```

- Nesting of if statements reduces code readability

```bash
if(event) {
    if(event.partitionKey) {
        candidate = event.partitionKey
    } else {
     const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
}

to

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
```

1. [Install Node.js](https://nodejs.org/en/download/) (we use `^16`, the latest LTS)
2. Run `npm i` in this repo to install dependencies
3. Run `npm test` to run the automated tests
4. Run `npm start` to launch `index.js` for any manual testing
