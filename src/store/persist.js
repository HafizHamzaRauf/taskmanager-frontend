const initialState = {
  user: {
    id: "",
    token: "",
    username: "",
    boards: [],
  },
  board: { show: false, currentBoardId: "" },
};
export const firstLoad = () => {
  // Check if data exists in local storage
  const storedData = localStorage.getItem("data"); // Replace "yourStorageKey" with your actual key

  // If data exists in local storage, parse and return it
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (error) {
      console.error("Error parsing data from local storage:", error);
    }
  }

  // If no data exists in local storage or there was an error, return default data
  return initialState;
};

export const updateStorage = (data, a) => {
  if (data) {
    localStorage.setItem("data", JSON.stringify(data));
  } else {
    localStorage.setItem("data", JSON.stringify(initialState));
  }
};
