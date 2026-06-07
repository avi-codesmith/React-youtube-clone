export const fetchCategories = async () => {
  try {
    const response = await fetch(
      "https://api.ayrshare.com/api/post/youTubeCategories/US",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${CATEGORIES_APIKEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchVidByCategory = async (type) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${type}&type=video&maxResults=10&key=${VID_APIKEY_BY_CATEGORY}`,
      {
        method: "GET",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Ops! API request failed!");
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
