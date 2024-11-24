/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

//provides type checking and autocompletion for the Vite configuration options
import { defineConfig } from 'vite';
//enables React support in the Vite build process, allowing use of React components and JSX syntax
import react from '@vitejs/plugin-react';
//run ESLint checks (Linter, checks JS code for problematic patterns/potential errors) during development and build time
import eslint from 'vite-plugin-eslint';

/***********************************************************************************************************************************************/
//*                             CONFIG
/***********************************************************************************************************************************************/

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({ //takes current mode dev/prod
  plugins: [ //plugins to be used by vite
    react(),
    eslint({
      lintOnStart: true,
      failOnError: mode === "production"
    })
  ],
  server: { //server configuration
    proxy: { //acts as an intermediary for HTTP requests, useful for handling cross-origin requests and bypassing CORS restrictions during development
      '/api': 'http://localhost:8000' //Configures requests starting with '/api' to be proxied to this URL
    },
  }
}));