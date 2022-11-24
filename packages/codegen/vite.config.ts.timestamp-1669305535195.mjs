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
    outDir: "../../docs-dist/antd-one-codegen"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvd2VuaGFvbWluZy9EZXNrdG9wL1x1Njc4MVx1NUJBMlx1NjVGNlx1OTVGNFx1N0VDM1x1NEU2MFx1OTg5OC9uZXctYW50ZC1vbmUvcGFja2FnZXMvY29kZWdlblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3dlbmhhb21pbmcvRGVza3RvcC9cdTY3ODFcdTVCQTJcdTY1RjZcdTk1RjRcdTdFQzNcdTRFNjBcdTk4OTgvbmV3LWFudGQtb25lL3BhY2thZ2VzL2NvZGVnZW4vdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3dlbmhhb21pbmcvRGVza3RvcC8lRTYlOUUlODElRTUlQUUlQTIlRTYlOTclQjYlRTklOTclQjQlRTclQkIlODMlRTQlQjklQTAlRTklQTIlOTgvbmV3LWFudGQtb25lL3BhY2thZ2VzL2NvZGVnZW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcHJlc2V0SWNvbnMgZnJvbSAnQHVub2Nzcy9wcmVzZXQtaWNvbnMnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IHByZXNldFdpbmQgfSBmcm9tICd1bm9jc3MnO1xuaW1wb3J0IFVub2NzcyBmcm9tICd1bm9jc3Mvdml0ZSc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbi8vIGltcG9ydCB7IEFudGRSZXNvbHZlLCBjcmVhdGVTdHlsZUltcG9ydFBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN0eWxlLWltcG9ydCc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBiYXNlOiAnL2FudGQtb25lL2FudGQtb25lLWNvZGVnZW4vJyxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6ICcuLi8uLi9kb2NzLWRpc3QvYW50ZC1vbmUtY29kZWdlbicsXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczogW1xuICAgICAge1xuICAgICAgICBmaW5kOiAvXn4vLFxuICAgICAgICByZXBsYWNlbWVudDogJycsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBmaW5kOiAnQCcsXG4gICAgICAgIHJlcGxhY2VtZW50OiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICAvLyBjcmVhdGVTdHlsZUltcG9ydFBsdWdpbih7IHJlc29sdmVzOiBbQW50ZFJlc29sdmUoKV0gfSksXG4gICAgVW5vY3NzKHtcbiAgICAgIHByZXNldHM6IFtwcmVzZXRJY29ucygpLCBwcmVzZXRXaW5kKCldLFxuICAgICAgc2hvcnRjdXRzOiB7XG4gICAgICAgIGJ0bjogJ2lubGluZS1mbGV4IHB5LS41IHB4LTIgZm9udC1zZW1pYm9sZCByb3VuZGVkIGJnLWJyYW5kLXByaW1hcnkgdGV4dC13aGl0ZSBjdXJzb3ItcG9pbnRlciBob3ZlcjpiZy1icmFuZC1ob3ZlciBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXInLFxuICAgICAgICB3aWRnZXRCdG46XG4gICAgICAgICAgJ2lubGluZS1ibG9jayBweS0zIHB4LTNcdHRleHQtYnJhbmQtcHJpbWFyeSBmb250LXNlbWlib2xkIHJvdW5kZWQtbWQgdGV4dC1icmFuZC10eHQgIGN1cnNvci1wb2ludGVyIGhvdmVyOmJnLWJyYW5kLWdyZXkgaG92ZXI6dGV4dC1icmFuZC1wcmltYXJ5IHRleHQtbGVmdCcsXG4gICAgICAgICdidG4tYmxvY2snOlxuICAgICAgICAgICdibG9jayBweS0xXHQgcHgtM1x0Zm9udC1zZW1pYm9sZCByb3VuZGVkLW1kIGJnLWJyYW5kLXByaW1hcnkgdGV4dC13aGl0ZSBjdXJzb3ItcG9pbnRlciBob3ZlcjpiZy1icmFuZC1ob3ZlciB0ZXh0LWNlbnRlcicsXG4gICAgICAgICdmLWNlbnRlcic6ICdmbGV4IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlcicsXG4gICAgICB9LFxuICAgICAgcnVsZXM6IFtcbiAgICAgICAgW1xuICAgICAgICAgICdlZGl0b3ItaG92ZXInLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dGxpbmU6ICcxLjVweCBkb3R0ZWQgIzI1NThmYicsXG4gICAgICAgICAgICAnb3V0bGluZS1vZmZzZXQnOiAnMXB4JyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgXSxcbiAgICAgIHRoZW1lOiB7XG4gICAgICAgIGNvbG9yczoge1xuICAgICAgICAgIGJyYW5kOiB7XG4gICAgICAgICAgICByYWRpdXM6ICc0cHgnLFxuICAgICAgICAgICAgcHJpbWFyeTogJyMyNTU4ZmInLFxuICAgICAgICAgICAgaG92ZXI6ICcjNTA3ZmY3JyxcbiAgICAgICAgICAgIGdyZXk6ICcjZWZmMGYzJyxcbiAgICAgICAgICAgIGxpbmU6ICcjZTFlMmU4JyxcbiAgICAgICAgICAgIHR4dDogJyMxZTIxMjgnLFxuICAgICAgICAgICAgc3ViVHh0OiAnIzUwNTk2OCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgcmVhY3QoKSxcbiAgXSxcbiAgY3NzOiB7XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgbGVzczoge1xuICAgICAgICBtb2RpZnlWYXJzOiB7XG4gICAgICAgICAgLy8gJ2xpbmstY29sb3InOiAnIzFEQTU3QScsXG4gICAgICAgICAgLy8gJ2JvcmRlci1yYWRpdXMtYmFzZSc6ICcycHgnLFxuICAgICAgICB9LFxuICAgICAgICAvLyBcdTY1MkZcdTYzMDFcdTUxODVcdTgwNTQgamF2YXNjcmlwdFxuICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1YSxPQUFPLGlCQUFpQjtBQUMvYixPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsa0JBQWtCO0FBQzNCLE9BQU8sWUFBWTtBQUNuQixTQUFTLG9CQUFvQjtBQUw3QixJQUFNLG1DQUFtQztBQVN6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0w7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWE7QUFBQSxNQUNmO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUN6QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFFUCxPQUFPO0FBQUEsTUFDTCxTQUFTLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztBQUFBLE1BQ3JDLFdBQVc7QUFBQSxRQUNULEtBQUs7QUFBQSxRQUNMLFdBQ0U7QUFBQSxRQUNGLGFBQ0U7QUFBQSxRQUNGLFlBQVk7QUFBQSxNQUNkO0FBQUEsTUFDQSxPQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0U7QUFBQSxVQUNBO0FBQUEsWUFDRSxTQUFTO0FBQUEsWUFDVCxrQkFBa0I7QUFBQSxVQUNwQjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxPQUFPO0FBQUEsUUFDTCxRQUFRO0FBQUEsVUFDTixPQUFPO0FBQUEsWUFDTCxRQUFRO0FBQUEsWUFDUixTQUFTO0FBQUEsWUFDVCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUEsWUFDTixLQUFLO0FBQUEsWUFDTCxRQUFRO0FBQUEsVUFDVjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osWUFBWSxDQUdaO0FBQUEsUUFFQSxtQkFBbUI7QUFBQSxNQUNyQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
