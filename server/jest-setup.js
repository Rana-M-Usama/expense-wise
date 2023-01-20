import { jest } from "@jest/globals";

// it is a Jest function that sets the global timeout value for all test cases.
// This means that if a test case takes longer than 10,000 milliseconds
// (10 seconds) to complete, Jest will automatically fail the test.
// This can be useful in situations where a test case may become stuck or
// take an unexpectedly long time to complete.

jest.setTimeout(10000);
