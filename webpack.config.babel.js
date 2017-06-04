const env = require('dotenv').config();
import webpack from 'webpack';
import path from 'path';

const config = {
  entry: './client/src/app',
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'client/src'),
        exclude: ['node_modules'],
        use: [
          { loader: 'babel-loader',
            options: {
              presets: ['react', 'es2015'],
              plugins: [require('babel-plugin-transform-object-rest-spread')]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin(['GOOGLE_MAPS_API_KEY'])
  ]
};

export default config;
