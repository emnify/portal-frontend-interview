export default {
  plugins: {
    'postcss-import': {},
    '@csstools/postcss-global-data': {
      files: []
    },
    'postcss-nested': {},
    'postcss-preset-env': {
      stage: 1,
      autoprefixer: {
        grid: true,
      },
    }
  }
}
