const APIKEY = "123";

export const fetchCategories = async () => {
  try {
    const response = await fetch(
      "https://api.ayrshare.com/api/post/youTubeCategories/US",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${APIKEY}`,
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
