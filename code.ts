import { config } from "dotenv";
config();

function analyzeFile() {
  const pages = figma.root.children.map(page => ({
    name: page.name,
    frames: page.findAll(node => node.type === "FRAME").length,
    components: page.findAll(node => node.type === "COMPONENT").length,
    textLayers: page.findAll(node => node.type === "TEXT").length,
    totalLayers: page.findAll().length
  }));

  return {
    summary: {
      totalPages: pages.length,
      totalFrames: pages.reduce((a, b) => a + b.frames, 0),
      totalComponents: pages.reduce((a, b) => a + b.components, 0),
      totalLayers: pages.reduce((a, b) => a + b.totalLayers, 0)
    },
    pages
  };
}

figma.ui.onmessage = async (msg) => {
  if (msg.type === "analyze-file") {
    try {
      const data = analyzeFile();
      figma.ui.postMessage({ type: "fileData", data });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      figma.ui.postMessage({ type: "error", message });
    }
  }

  if (msg.type === "close-plugin") {
    figma.closePlugin();
  }
};

figma.showUI(__html__, { width: 400, height: 520 });
