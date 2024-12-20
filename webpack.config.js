const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/app.js', // Caminho para o seu app.js
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'assets/[name][ext]', // Para assets como imagens e modelos
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Processar arquivos CSS
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // Imagens
        type: 'asset/resource',
      },
      {
        test: /\.(mp4|webm|ogg)$/i, // Vídeos
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // Fontes
        type: 'asset/resource',
      },
      {
        test: /\.(pdf|txt|glb|gltf)$/i, // Modelos 3D e outros arquivos
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // HTML principal
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets', // Copiar assets diretamente
          to: 'assets',
        },
        {
          from: 'src/css', // Copiar CSS diretamente
          to: 'css',
        },
      ],
    }),
  ],
  mode: 'production',
};
