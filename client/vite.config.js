import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
        output:{
            manualChunks(id) {
                if (id.includes('node_modules')) {
                    return id.toString().split('node_modules/')[1].split('/')[0].toString();
                }
            }
        }
    }
},
rules: [
  {
    test: /\.(png|mp3)$/,
    use: [
      {
        loader: 'url-loader',
        // Add any additional options for the loader if needed
        options: {
          limit: 8192, // Specify the file size limit for inlining as a data URL
          outputPath: 'assets', // Specify the output directory for the assets
          name: '[name].[hash].[ext]', // Specify the filename pattern for the assets
        },
      },
    ],
  },
],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001',
        secure: false,
        changeOrigin: true
      } 
    }
  }

})
