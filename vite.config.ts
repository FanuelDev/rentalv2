import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: '.htaccess',      // fichier source à la racine du projet
    //       dest: ''               // destination dans le dossier dist
    //     }
    //   ]
    // }),
    ],
})
