import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages publica el proyecto en https://<usuario>.github.io/<repositorio>/
const REPO_NAME = 'Exp1_S2_Cristian_Torres_DESARROLLO-FRONTEND-II_004A'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? `/${REPO_NAME}/` : '/',
  plugins: [react()],
}))
