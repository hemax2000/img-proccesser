import supertest from "supertest";
import app from "../index";
import imgProccesser from "../services/imgProccesser";

const request = supertest(app);

describe("Test endpoint responses", () => {
  it("gets the api/image endpoint", async () => {
    const response = await request.get("/api/image");
    expect(response.status).toBe(200);
  });
});

describe("Test sending request without parameters", () => {
  it("get missing inputs massege displayed", async () => {
    const response = await request.get("/api/image");
    expect(response.text).toBe("missing inputs");
  });
});

describe("Test sending request with appropriate parameters", () => {
  it("get image displayed displayed", async () => {
    const response = await request.get(
      "/api/image?filename=test.jpg&width=300&height=150"
    );
    expect(response.header["content-type"].includes("image")).toBe(true);
  });
});

describe("Test imgProccessing functionality", () => {
  it("function will not throw any errors", async () => {
    const testName = "test.jpg";
    const testWidth = 200;
    const testHeight = 200;
    expect(async () => {
      await imgProccesser(testName, testWidth, testHeight);
    }).not.toThrow();
  });
});
