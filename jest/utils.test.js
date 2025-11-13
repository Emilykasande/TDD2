const utils = require("./utils");

// Exact Equality Matchers

describe("Exact Equality Matchers", () => {
  test("toBe — exact number equality", () => {
    expect(utils.sum(2, 2)).toBe(4); 
    expect(utils.sum(2, 3)).toBe(4); 
  });

  test("toEqual — object structural equality", () => {
    const mockDate = new Date("2020-01-01T00:00:00Z");
    const expectedUser = { name: "Alice", age: 30, createdAt: mockDate };
    const actualUser = { name: "Alice", age: 30, createdAt: mockDate };

    expect(actualUser).toEqual(expectedUser); 
    expect(actualUser).toEqual({ name: "Bob", age: 30, createdAt: mockDate }); 
  });

  test("toStrictEqual — detects extra undefined or missing properties", () => {
    const mockDate = new Date("2020-01-01T00:00:00Z");
    const userA = { name: "Alice", age: 30, createdAt: mockDate };
    const userB = {
      name: "Alice",
      age: 30,
      createdAt: mockDate,
      extra: undefined,
    };

    expect(userA).toStrictEqual(userA); 
    expect(userB).toStrictEqual(userA); 
  });
});

// Negation Matchers (.not)

describe("Negation Matchers", () => {
  test("using .not with toBe", () => {
    expect(utils.sum(1, 1)).not.toBe(3); 
    expect(utils.sum(2, 2)).not.toBe(4); 
  });

  test("using .not with toMatch (string pattern)", () => {
    const user = utils.createUser("Alice", 25);
    expect(user.name).not.toMatch(/Bob/); 
    expect(user.name).not.toMatch(/lice/); 
  });

  test("using .not with toContain (array membership)", () => {
    const fruits = ["apple", "banana"];
    expect(fruits).not.toContain("mango"); 
    expect(fruits).not.toContain("apple"); 
  });
});

// Truthiness Matchers

describe("Truthiness Matchers", () => {
  test("toBeNull", () => {
    const value = null;
    expect(value).toBeNull(); 
    expect(utils.sum(1, 1)).toBeNull(); 
  });

  test("toBeUndefined and toBeDefined", () => {
    let value;
    expect(value).toBeUndefined(); 
    expect(utils.sum).toBeDefined();
    expect(value).toBeDefined(); 
  });

  test("toBeTruthy and toBeFalsy using findInArray()", () => {
    expect(utils.findInArray([1, 2, 3], 2)).toBeTruthy(); 
    expect(utils.findInArray([1, 2, 3], 4)).toBeFalsy(); 
    expect(utils.findInArray([1, 2, 3], 2)).toBeFalsy(); 
  });
});

// Number Matchers

describe("Number Matchers", () => {
  test("toBeGreaterThan and toBeGreaterThanOrEqual", () => {
    expect(utils.sum(2, 3)).toBeGreaterThan(4); 
    expect(utils.sum(2, 2)).toBeGreaterThanOrEqual(4); 
    expect(utils.sum(1, 1)).toBeGreaterThan(5); 
  });

  test("toBeLessThan and toBeLessThanOrEqual", () => {
    expect(utils.approximateDivision(10, 2)).toBeLessThanOrEqual(5); 
    expect(utils.sum(1, 1)).toBeLessThan(5); 
    expect(utils.sum(10, 2)).toBeLessThan(5); 
  });

  test("toBeCloseTo for floating-point math", () => {
    expect(utils.approximateDivision(0.3, 0.1)).toBeCloseTo(3); 
    expect(utils.approximateDivision(0.3, 0.1)).toBeCloseTo(5); 
  });
});

// String Matchers

describe("String Matchers", () => {
  test("toMatch with regex", () => {
    const user = utils.createUser("John Doe", 25);
    expect(user.name).toMatch(/John/); 
    expect(user.name).toMatch(/Alice/); 
  });

  test("not.toMatch", () => {
    const json = JSON.stringify({ name: "Alice", age: 30 });
    expect(json).not.toMatch(/Bob/); 
    expect(json).not.toMatch(/Alice/); 
  });
});

// Arrays 

describe("Iterable Matchers", () => {
  test("toContain and not.toContain for arrays and sets", () => {
    const arr = ["apple", "banana", "cherry"];
    const set = new Set(arr);

    expect(arr).toContain("banana"); 
    expect(set).toContain("apple"); 
    expect(arr).not.toContain("mango"); 
    expect(arr).toContain("mango"); 
  });
});

// Exception Matchers

describe("Exception Matchers", () => {
  test("toThrow when invalid or empty JSON provided", () => {
    expect(() => utils.parseJSON("invalid-json")).toThrow(); 
    expect(() => utils.parseJSON()).toThrow("No JSON string provided"); 
  });

  test("does NOT throw for valid JSON", () => {
    expect(() => utils.parseJSON('{"name":"Alice"}')).not.toThrow(); 
    expect(() => utils.parseJSON("")).not.toThrow(); 
  });
});
