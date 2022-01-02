module.exports = [
    {
      mode: 'development',
      entry: './src/preload/preload.ts',
      target: 'electron-main',
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
          }
        ]
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
      output: {
        path: __dirname + '/dist', 
        filename: 'preload.js'
      }
    }
  ];
  