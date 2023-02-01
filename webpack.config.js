// webpack.config.js
const path = require("path"); // подключаем path к конфигу вебпак. Переписали точку выхода, используя утилиту path
const HtmlWebpackPlugin = require("html-webpack-plugin"); // подключите плагин HtmlWebpackPlugin
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // подключили плагин CleanWebpackPlugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // подключите к проекту mini-css-extract-plugin

module.exports = {
  entry: { main: "./src/scripts/index.js" }, // указали первое место, куда заглянет webpack, — файл index.js в папке src
  output: {
    path: path.resolve(__dirname, "dist"), // указали в какой файл будет собираться весь js. __dirname - это корневая папка проекта.
    filename: "main.js", // и дали ему имя
    publicPath: "",
  },
  mode: "development", // добавили режим разработчика
  devServer: {
    static: path.resolve(__dirname, "./dist"), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

    open: true, // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: "/node_modules/",
      },
      // добавили правило для обработки файлов
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            // добавьте объект options
            options: { importLoaders: 1 },
          },
          // Добавьте postcss-loader
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // путь к файлу index.html
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(), // подключение плагина для объединения файлов
  ],
};

// module.exports — это синтаксис экспорта в Node.js
