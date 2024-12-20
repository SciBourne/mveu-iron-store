import { defineConfig } from 'vite'
import swc from "unplugin-swc"


// Default config https://vitejs.dev/config/
/*

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})

*/


export default defineConfig(
  {
    plugins: [
      swc.vite(
        {
          jsc: {
            parser: {
              syntax: "typescript",
              decorators: true,
            },

            transform: {
              decoratorMetadata: true,
              decoratorVersion: "2022-03",
              react: {
                runtime: "automatic",
              },
            },
          },
        }
      ),
    ],
  }
)
