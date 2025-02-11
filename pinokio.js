const path = require('path')
module.exports = {
  version: "3.0",
  title: "HunyuanVideo GPU Poor",
  description: "Gradio UI for Hunyuan Video Generator that works on GPU poor machines https://github.com/deepbeepmeep/HunyuanVideoGP",
  icon: "icon.png",
  menu: async (kernel, info) => {
    let installed = info.exists("app/env")
    let running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      update: info.running("update.js"),
      reset: info.running("reset.js")
    }
    if (running.install) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
      if (running.start) {
        let local = info.local("start.js")
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url,
          }, {
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }]
        } else {
          return [{
            default: true,
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }]
        }
      } else if (running.update) {
        return [{
          default: true,
          icon: 'fa-solid fa-terminal',
          text: "Updating",
          href: "update.js",
        }]
      } else if (running.reset) {
        return [{
          default: true,
          icon: 'fa-solid fa-terminal',
          text: "Resetting",
          href: "reset.js",
        }]
      } else {
        return [{
          icon: "fa-solid fa-power-off",
          text: "Fastest (Hunyuan Fast + Compiled + Cache)",
          href: "start.js",
          params: {
            profile: 4,
            fastest: true,
            compile: true
          }
        }, {
          icon: "fa-solid fa-power-off",
          text: "Fast (HunyuanFast + Cache)",
          href: "start.js",
          params: {
            profile: 4,
            fast: true
          }
        }, {
          icon: "fa-solid fa-power-off",
          text: "Original Compiled (highest quality + slower)",
          href: "start.js",
          params: {
            profile: 4,
            compile: true
          }
        }, {
          icon: "fa-solid fa-power-off",
          text: "Original (highest quality + slowest)",
          href: "start.js",
          params: {
            profile: 4
          }
        }, {
          icon: "fa-regular fa-folder-open",
          text: "Loras (save lora files here)",
          href: "loras",
          fs: true
        }, {
          icon: "fa-solid fa-plug",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }, {
          icon: "fa-regular fa-circle-xmark",
          text: "Reset",
          href: "reset.js",
        }]
      }
    } else {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }]
    }
  }
}
