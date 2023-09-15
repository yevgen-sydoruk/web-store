const axios = require("axios");

jest.mock("axios");

const getData = async () => {
  try {
    const response = await axios.get(process.env.REACT_APP_API_URL + "api/brand");
    return response;
  } catch (e) {
    console.log(e);
  }
};

describe("GetData", () => {
  let response;
  beforeEach(async () => {
    response = {
      data: [
        {
          _id: "64ea6a7398e58db19dfa6390",
          name: "Asus",
          __v: 0,
        },
        {
          _id: "64ea755be647edc4ef5d0699",
          name: "Acer",
          __v: 0,
        },
        {
          _id: "64ea7561e647edc4ef5d069b",
          name: "Apple",
          __v: 0,
        },
      ],
    };
  });
  test("Correct response", async () => {
    axios.get.mockReturnValue(response);
    const data = await getData();
    expect(axios.get).toBeCalledTimes(1);
    expect(data).toEqual({
      data: [
        {
          _id: "64ea6a7398e58db19dfa6390",
          name: "Asus",
          __v: 0,
        },
        {
          _id: "64ea755be647edc4ef5d0699",
          name: "Acer",
          __v: 0,
        },
        {
          _id: "64ea7561e647edc4ef5d069b",
          name: "Apple",
          __v: 0,
        },
      ],
    });
  });
});
