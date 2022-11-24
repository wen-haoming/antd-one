// vite.config.ts
import presetIcons from "file:///Users/wenhaoming/Desktop/%E6%9E%81%E5%AE%A2%E6%97%B6%E9%97%B4%E7%BB%83%E4%B9%A0%E9%A2%98/new-antd-one/node_modules/.pnpm/@unocss+preset-icons@0.45.30/node_modules/@unocss/preset-icons/dist/index.mjs";
import react from "file:///Users/wenhaoming/Desktop/%E6%9E%81%E5%AE%A2%E6%97%B6%E9%97%B4%E7%BB%83%E4%B9%A0%E9%A2%98/new-antd-one/node_modules/.pnpm/@vitejs+plugin-react@2.2.0_vite@3.2.3/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import { presetWind } from "file:///Users/wenhaoming/Desktop/%E6%9E%81%E5%AE%A2%E6%97%B6%E9%97%B4%E7%BB%83%E4%B9%A0%E9%A2%98/new-antd-one/node_modules/.pnpm/unocss@0.45.30_vite@3.2.3/node_modules/unocss/dist/index.mjs";
import Unocss from "file:///Users/wenhaoming/Desktop/%E6%9E%81%E5%AE%A2%E6%97%B6%E9%97%B4%E7%BB%83%E4%B9%A0%E9%A2%98/new-antd-one/node_modules/.pnpm/unocss@0.45.30_vite@3.2.3/node_modules/unocss/dist/vite.mjs";
import { defineConfig } from "file:///Users/wenhaoming/Desktop/%E6%9E%81%E5%AE%A2%E6%97%B6%E9%97%B4%E7%BB%83%E4%B9%A0%E9%A2%98/new-antd-one/node_modules/.pnpm/vite@3.2.3_less@4.1.3/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "/Users/wenhaoming/Desktop/\u6781\u5BA2\u65F6\u95F4\u7EC3\u4E60\u9898/new-antd-one/packages/codegen";
var vite_config_default = defineConfig({
  base: "/antd-one/antd-one-codegen/",
  build: {
    outDir: "dist",
    lib: {
      entry: resolve(__vite_injected_original_dirname, "./src/App.tsx"),
      fileName: "index.js"
    },
    rollupOptions: {
      external: ["react", "react-dom"]
    }
  },
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: ""
      },
      {
        find: "@",
        replacement: resolve(__vite_injected_original_dirname, "./src")
      }
    ]
  },
  plugins: [
    Unocss({
      presets: [presetIcons(), presetWind()],
      shortcuts: {
        btn: "inline-flex py-.5 px-2 font-semibold rounded bg-brand-primary text-white cursor-pointer hover:bg-brand-hover justify-center items-center",
        widgetBtn: "inline-block py-3 px-3	text-brand-primary font-semibold rounded-md text-brand-txt  cursor-pointer hover:bg-brand-grey hover:text-brand-primary text-left",
        "btn-block": "block py-1	 px-3	font-semibold rounded-md bg-brand-primary text-white cursor-pointer hover:bg-brand-hover text-center",
        "f-center": "flex justify-center items-center"
      },
      rules: [
        [
          "editor-hover",
          {
            outline: "1.5px dotted #2558fb",
            "outline-offset": "1px"
          }
        ]
      ],
      theme: {
        colors: {
          brand: {
            radius: "4px",
            primary: "#2558fb",
            hover: "#507ff7",
            grey: "#eff0f3",
            line: "#e1e2e8",
            txt: "#1e2128",
            subTxt: "#505968"
          }
        }
      }
    }),
    react()
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvd2VuaGFvbWluZy9EZXNrdG9wL1x1Njc4MVx1NUJBMlx1NjVGNlx1OTVGNFx1N0VDM1x1NEU2MFx1OTg5OC9uZXctYW50ZC1vbmUvcGFja2FnZXMvY29kZWdlblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3dlbmhhb21pbmcvRGVza3RvcC9cdTY3ODFcdTVCQTJcdTY1RjZcdTk1RjRcdTdFQzNcdTRFNjBcdTk4OTgvbmV3LWFudGQtb25lL3BhY2thZ2VzL2NvZGVnZW4vdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3dlbmhhb21pbmcvRGVza3RvcC8lRTYlOUUlODElRTUlQUUlQTIlRTYlOTclQjYlRTklOTclQjQlRTclQkIlODMlRTQlQjklQTAlRTklQTIlOTgvbmV3LWFudGQtb25lL3BhY2thZ2VzL2NvZGVnZW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcHJlc2V0SWNvbnMgZnJvbSAnQHVub2Nzcy9wcmVzZXQtaWNvbnMnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IHByZXNldFdpbmQgfSBmcm9tICd1bm9jc3MnO1xuaW1wb3J0IFVub2NzcyBmcm9tICd1bm9jc3Mvdml0ZSc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsYnVpbGQgfSBmcm9tICd2aXRlJztcbi8vIGltcG9ydCB7IEFudGRSZXNvbHZlLCBjcmVhdGVTdHlsZUltcG9ydFBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN0eWxlLWltcG9ydCc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBiYXNlOiAnL2FudGQtb25lL2FudGQtb25lLWNvZGVnZW4vJyxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6ICdkaXN0JyxcbiAgICBsaWI6e1xuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvQXBwLnRzeCcpLFxuICAgICAgZmlsZU5hbWU6J2luZGV4LmpzJyxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIC8vIFx1Nzg2RVx1NEZERFx1NTkxNlx1OTBFOFx1NTMxNlx1NTkwNFx1NzQwNlx1OTBBM1x1NEU5Qlx1NEY2MFx1NEUwRFx1NjBGM1x1NjI1M1x1NTMwNVx1OEZEQlx1NUU5M1x1NzY4NFx1NEY5RFx1OEQ1NlxuICAgICAgZXh0ZXJuYWw6IFsncmVhY3QnLCdyZWFjdC1kb20nXSxcbiAgICB9XG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczogW1xuICAgICAge1xuICAgICAgICBmaW5kOiAvXn4vLFxuICAgICAgICByZXBsYWNlbWVudDogJycsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBmaW5kOiAnQCcsXG4gICAgICAgIHJlcGxhY2VtZW50OiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICAvLyBjcmVhdGVTdHlsZUltcG9ydFBsdWdpbih7IHJlc29sdmVzOiBbQW50ZFJlc29sdmUoKV0gfSksXG4gICAgVW5vY3NzKHtcbiAgICAgIHByZXNldHM6IFtwcmVzZXRJY29ucygpLCBwcmVzZXRXaW5kKCldLFxuICAgICAgc2hvcnRjdXRzOiB7XG4gICAgICAgIGJ0bjogJ2lubGluZS1mbGV4IHB5LS41IHB4LTIgZm9udC1zZW1pYm9sZCByb3VuZGVkIGJnLWJyYW5kLXByaW1hcnkgdGV4dC13aGl0ZSBjdXJzb3ItcG9pbnRlciBob3ZlcjpiZy1icmFuZC1ob3ZlciBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXInLFxuICAgICAgICB3aWRnZXRCdG46XG4gICAgICAgICAgJ2lubGluZS1ibG9jayBweS0zIHB4LTNcdHRleHQtYnJhbmQtcHJpbWFyeSBmb250LXNlbWlib2xkIHJvdW5kZWQtbWQgdGV4dC1icmFuZC10eHQgIGN1cnNvci1wb2ludGVyIGhvdmVyOmJnLWJyYW5kLWdyZXkgaG92ZXI6dGV4dC1icmFuZC1wcmltYXJ5IHRleHQtbGVmdCcsXG4gICAgICAgICdidG4tYmxvY2snOlxuICAgICAgICAgICdibG9jayBweS0xXHQgcHgtM1x0Zm9udC1zZW1pYm9sZCByb3VuZGVkLW1kIGJnLWJyYW5kLXByaW1hcnkgdGV4dC13aGl0ZSBjdXJzb3ItcG9pbnRlciBob3ZlcjpiZy1icmFuZC1ob3ZlciB0ZXh0LWNlbnRlcicsXG4gICAgICAgICdmLWNlbnRlcic6ICdmbGV4IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlcicsXG4gICAgICB9LFxuICAgICAgcnVsZXM6IFtcbiAgICAgICAgW1xuICAgICAgICAgICdlZGl0b3ItaG92ZXInLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dGxpbmU6ICcxLjVweCBkb3R0ZWQgIzI1NThmYicsXG4gICAgICAgICAgICAnb3V0bGluZS1vZmZzZXQnOiAnMXB4JyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgXSxcbiAgICAgIHRoZW1lOiB7XG4gICAgICAgIGNvbG9yczoge1xuICAgICAgICAgIGJyYW5kOiB7XG4gICAgICAgICAgICByYWRpdXM6ICc0cHgnLFxuICAgICAgICAgICAgcHJpbWFyeTogJyMyNTU4ZmInLFxuICAgICAgICAgICAgaG92ZXI6ICcjNTA3ZmY3JyxcbiAgICAgICAgICAgIGdyZXk6ICcjZWZmMGYzJyxcbiAgICAgICAgICAgIGxpbmU6ICcjZTFlMmU4JyxcbiAgICAgICAgICAgIHR4dDogJyMxZTIxMjgnLFxuICAgICAgICAgICAgc3ViVHh0OiAnIzUwNTk2OCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgcmVhY3QoKSxcbiAgXSxcbiAgY3NzOiB7XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgbGVzczoge1xuICAgICAgICBtb2RpZnlWYXJzOiB7XG4gICAgICAgICAgLy8gJ2xpbmstY29sb3InOiAnIzFEQTU3QScsXG4gICAgICAgICAgLy8gJ2JvcmRlci1yYWRpdXMtYmFzZSc6ICcycHgnLFxuICAgICAgICB9LFxuICAgICAgICAvLyBcdTY1MkZcdTYzMDFcdTUxODVcdTgwNTQgamF2YXNjcmlwdFxuICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1YSxPQUFPLGlCQUFpQjtBQUMvYixPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsa0JBQWtCO0FBQzNCLE9BQU8sWUFBWTtBQUNuQixTQUFTLG9CQUEwQjtBQUxuQyxJQUFNLG1DQUFtQztBQVN6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixLQUFJO0FBQUEsTUFDRixPQUFPLFFBQVEsa0NBQVcsZUFBZTtBQUFBLE1BQ3pDLFVBQVM7QUFBQSxJQUNYO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFFYixVQUFVLENBQUMsU0FBUSxXQUFXO0FBQUEsSUFDaEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYTtBQUFBLE1BQ2Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3pDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUVQLE9BQU87QUFBQSxNQUNMLFNBQVMsQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO0FBQUEsTUFDckMsV0FBVztBQUFBLFFBQ1QsS0FBSztBQUFBLFFBQ0wsV0FDRTtBQUFBLFFBQ0YsYUFDRTtBQUFBLFFBQ0YsWUFBWTtBQUFBLE1BQ2Q7QUFBQSxNQUNBLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRTtBQUFBLFVBQ0E7QUFBQSxZQUNFLFNBQVM7QUFBQSxZQUNULGtCQUFrQjtBQUFBLFVBQ3BCO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE9BQU87QUFBQSxRQUNMLFFBQVE7QUFBQSxVQUNOLE9BQU87QUFBQSxZQUNMLFFBQVE7QUFBQSxZQUNSLFNBQVM7QUFBQSxZQUNULE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxZQUNOLEtBQUs7QUFBQSxZQUNMLFFBQVE7QUFBQSxVQUNWO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixZQUFZLENBR1o7QUFBQSxRQUVBLG1CQUFtQjtBQUFBLE1BQ3JCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
