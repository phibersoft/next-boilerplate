module.exports = (env) => {
  const friendship = {
    PHIBER_TOKEN: "Lappaletta8!",
    PHIBER_SECRET: "18f1f537c1fa1fcc12a3c0476e19c98c",
    GOOGLE_CLOUD_URI: "https://storage.googleapis.com/**",
  };

  if (env === "production") {
    return {
      DB_USER: "",
      DB_PASSWORD:
        "",
      DB_HOST: "",
      DB_DATABASE: "",
      RUNNER: "https://**.herokuapp.com",
      ...friendship,
    };
  } else {
    return {
      DB_USER: "",
      DB_PASSWORD: "",
      DB_HOST: "",
      DB_DATABASE: "",
      ...friendship,
    };
  }
};
