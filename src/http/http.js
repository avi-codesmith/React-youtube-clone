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
  }
};

export const fetchVidByCategory = async (category) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${category}&type=video&maxResults=10&key=${VID_APIKEY_BY_CATEGORY}`,
      {
        method: "GET",
      },
    );
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
