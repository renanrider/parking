import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
  },
  env: {
    adminEmail: 'renansmit@gmail.com',
    adminPassword: '3@yu1ZK$jY%GvLJKoyPIfAzH65NWXBLA!4hsQtzfRuOcjhj2jJ',
    studentEmail: 'renansmit90@gmail.com',
    studentPassword: 'rna@4718',
  },
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
  },
});
