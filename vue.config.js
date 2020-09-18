module.exports = {
  // css: {
  //   // Enable CSS source maps.
  //   sourceMap: process.env.NODE_ENV !== 'production'
  // },
  devServer: {
  //  proxy: 'http://localhost:4000/',
    proxy: 'https://node-test-app-v1.herokuapp.com/',
}
};
