// https://github.com/thymikee/jest-preset-angular#brief-explanation-of-config
module.exports = {
  // preset: 'jest-preset-angular',
  // // roots: ['src'],
  // setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  // moduleNameMapper: {
  //   '@app/(.*)': '<rootDir>/src/app/$1',
  //   '@assets/(.*)': '<rootDir>/src/assets/$1',
  //   '@core/(.*)': '<rootDir>/src/app/core/$1',
  //   '@env': '<rootDir>/src/environments/environment',
  //   '@src/(.*)': '<rootDir>/src/src/$1',
  //   '@state/(.*)': '<rootDir>/src/app/state/$1',
  // },
  // transformIgnorePatterns: [
  //   '<rootDir>/src/test.ts',
  //   'node_modules/(?!(jest-test))',
  // ],
  // coverageReporters: ['json', 'html', 'cobertura', 'text-summary'],

  preset: 'jest-preset-angular',
  roots: ['src'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@assets/(.*)': '<rootDir>/src/assets/$1',
    '@core/(.*)': '<rootDir>/src/app/core/$1',
    '@env': '<rootDir>/src/environments/environment',
    '@src/(.*)': '<rootDir>/src/src/$1',
    '@state/(.*)': '<rootDir>/src/app/state/$1',
  },
  transformIgnorePatterns: ['node_modules/(?!(jest-test))'],
  testPathIgnorePatterns: ['<rootDir>/src/test.ts'],
  coverageReporters: ['json', 'html', 'cobertura', 'text-summary'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/src/tsconfig.jest.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: [
        'jest-preset-angular/build/InlineFilesTransformer',
        'jest-preset-angular/build/StripStylesTransformer',
      ],
    },
  },
};
