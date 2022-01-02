module.exports = [
    {
      mode: 'development',
      entry: './src/server/electron.ts',
      target: 'electron-main',
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: [/node_modules/, __dirname + "/preload.ts"],
          }
        ]
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
      output: {
        path: __dirname + '/dist', 
        filename: 'electron.js'
      }
    }
  ];
  