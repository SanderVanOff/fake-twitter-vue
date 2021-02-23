module.exports = {
  lintOnSave: false,
  chainWebpack: config => {			
    if (process.env.NODE_ENV === 'production') {			
      config.module.rule('vue').uses.delete('cache-loader');			
      config.module.rule('js').uses.delete('cache-loader');			
      config.module.rule('ts').uses.delete('cache-loader');			
      config.module.rule('tsx').uses.delete('cache-loader');			
    }			
  },
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
