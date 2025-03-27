import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { copyFileSync, mkdirSync } from 'fs'

// Função para copiar arquivos estáticos
function copyStaticFiles() {
  return {
    name: 'copy-static-files',
    closeBundle() {
      // Criar pasta assets se não existir
      try {
        mkdirSync(resolve(__dirname, 'dist/assets'), { recursive: true })
      } catch (err) {
        // Pasta já existe
      }

      // Copiar manifest.json
      copyFileSync(
        resolve(__dirname, 'manifest.json'),
        resolve(__dirname, 'dist/manifest.json')
      )

      // Copiar ícones
      const icons = ['icon16.png', 'icon48.png', 'icon128.png']
      icons.forEach(icon => {
        try {
          copyFileSync(
            resolve(__dirname, `assets/${icon}`),
            resolve(__dirname, `dist/assets/${icon}`)
          )
        } catch (err) {
          console.warn(`Ícone ${icon} não encontrado`)
        }
      })

      // Copiar CSS
      try {
        copyFileSync(
          resolve(__dirname, 'src/styles/content.css'),
          resolve(__dirname, 'dist/content.css')
        )
      } catch (err) {
        console.warn('Arquivo content.css não encontrado')
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), copyStaticFiles()],
  build: {
    rollupOptions: {
      input: {
        background: resolve(__dirname, 'src/background.ts'),
        content: resolve(__dirname, 'src/content.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
