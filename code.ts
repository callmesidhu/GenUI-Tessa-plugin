figma.showUI(__html__, { width: 500, height: 600 });

// Helper function to traverse nodes
function traverseNode(node: SceneNode, depth = 0): any {
  const nodeData: any = {
    name: node.name,
    type: node.type,
    id: node.id,
  };

  // Add dimension data for nodes that have it
  if ('width' in node && 'height' in node) {
    nodeData.width = Math.round(node.width);
    nodeData.height = Math.round(node.height);
  }

  // Add fill colors
  if ('fills' in node && node.fills !== figma.mixed) {
    const fills = node.fills as Paint[];
    nodeData.fills = fills.map(fill => {
      if (fill.type === 'SOLID') {
        return {
          type: fill.type,
          color: fill.color,
          opacity: fill.opacity
        };
      }
      return { type: fill.type };
    });
  }

  // Add text properties
  if (node.type === 'TEXT') {
    nodeData.fontSize = (node as TextNode).fontSize;
    nodeData.fontName = (node as TextNode).fontName;
    nodeData.characters = (node as TextNode).characters.substring(0, 100); // Limit text length
  }

  // Recursively process children
  if ('children' in node && depth < 3) { // Limit depth to avoid too much data
    nodeData.children = node.children.map(child => traverseNode(child, depth + 1));
  }

  return nodeData;
}

// Analyze the entire file
function analyzeFile() {
  const fileData: any = {
    fileName: figma.root.name,
    pages: [],
    components: [],
    styles: {
      colors: [],
      textStyles: []
    },
    summary: {
      totalPages: 0,
      totalFrames: 0,
      totalComponents: 0,
      totalLayers: 0
    }
  };

  // Analyze pages
  figma.root.children.forEach(page => {
    const pageData: any = {
      name: page.name,
      frames: []
    };

    page.children.forEach(child => {
      if (child.type === 'FRAME' || child.type === 'COMPONENT') {
        pageData.frames.push(traverseNode(child));
      }
    });

    fileData.pages.push(pageData);
    fileData.summary.totalPages++;
    fileData.summary.totalFrames += pageData.frames.length;
  });

  // Get local components
  const components = figma.root.findAll(node => node.type === 'COMPONENT');
  fileData.summary.totalComponents = components.length;
  fileData.components = components.slice(0, 10).map(comp => ({
    name: comp.name,
    id: comp.id
  }));

  // Get paint styles (colors)
  const paintStyles = figma.getLocalPaintStyles();
  fileData.styles.colors = paintStyles.slice(0, 10).map(style => ({
    name: style.name,
    id: style.id
  }));

  // Get text styles
  const textStyles = figma.getLocalTextStyles();
  fileData.styles.textStyles = textStyles.slice(0, 10).map(style => ({
    name: style.name,
    id: style.id
  }));

  // Count total layers
  const allNodes = figma.currentPage.findAll();
  fileData.summary.totalLayers = allNodes.length;

  return fileData;
}

figma.ui.onmessage = async (msg) => {
  if (msg.type === "analyze-file") {
    figma.ui.postMessage({ type: "analyzing", message: "Analyzing file..." });
    
    try {
      const fileData = analyzeFile();
      figma.ui.postMessage({ type: "fileData", data: fileData });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      figma.ui.postMessage({ type: "error", message: errorMessage });
    }
  }

  if (msg.type === "analyze-selection") {
    const selection = figma.currentPage.selection;
    if (selection.length === 0) {
      figma.ui.postMessage({ type: "error", message: "No layers selected! Please select one or more layers." });
      return;
    }

    const data = selection.map(node => traverseNode(node));
    figma.ui.postMessage({ type: "selectionData", data });
  }
};
