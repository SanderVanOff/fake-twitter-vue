module.exports = {
  lintOnSave: false,

  pwa: {
    name: "Chatter",
    short_name: "Chatter",
    description: "Приложение для обмена сообщениями",
    themeColor: "#4C4E4F",
    manifestOptions: {
      background_color: "#ffffff",
      icons: [
        {
          src: "/assets/logo-min.png",
          type: "image/png",
          sizes: "72x72",
        },
      ],
      start_url: ".",
      display: "standalone",
    },
  },
};
