# Tessa - Setup & Usage Guide

An AI-powered Figma plugin that analyzes your design files and provides intelligent insights using Google's Gemini AI.

## Features

- 🔍 **Entire File Analysis**: Analyze complete Figma files including all pages, frames, components, and styles
- 🎯 **Selection Analysis**: Deep-dive analysis of selected layers
- 📊 **Visual Statistics**: See quick metrics about your design file
- 🤖 **AI-Powered Insights**: Get design system observations, consistency analysis, and improvement suggestions
- 💡 **Best Practices**: Receive accessibility considerations and UX/UI recommendations

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Gemini API Key

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Open `ui.html` and find this line (around line 133):

```javascript
const API_KEY = "YOUR_GEMINI_API_KEY_HERE";
```

3. Replace it with your actual API key:

```javascript
const API_KEY = "AIzaSy...your-key-here";
```

### 3. Build the Plugin

```bash
npm run build
```

### 4. Load in Figma

1. Open **Figma Desktop App** (plugin development requires desktop, not web)
2. Go to **Menu → Plugins → Development → Import plugin from manifest...**
3. Navigate to this folder and select `manifest.json`
4. The plugin "Tessa" will now appear in your plugins list

## Usage

### Analyze Entire File

1. Open any Figma file
2. Run **Plugins → Development → Tessa**
3. Click **"Analyze Entire File"** button
4. Wait for the AI analysis (this may take a few seconds)
5. View comprehensive insights including:
   - **File Summary**: Quick stats (pages, frames, components, layers)
   - **Design System Observations**: Component usage patterns
   - **Organizational Insights**: File structure analysis
   - **Potential Improvements**: Actionable recommendations
   - **Consistency Analysis**: Style and naming conventions

### Analyze Selection

1. Select one or more layers in your Figma file
2. Run the Tessa plugin
3. Click **"Analyze Selection"** button
4. Get detailed AI feedback on:
   - Design quality assessment
   - Layout and hierarchy evaluation
   - Accessibility considerations
   - Best practice recommendations

## What Gets Analyzed

The plugin extracts and analyzes:

- **File Structure**: Pages, frames, and layer hierarchy
- **Components**: Local components and instances
- **Styles**: Color styles and text styles
- **Layer Properties**: Names, types, dimensions
- **Colors**: Fill colors and opacity values
- **Typography**: Font families, sizes, and text content
- **Dimensions**: Width, height, and positioning

## Development

### Watch Mode (Auto-rebuild)

```bash
npm run watch
```

This will automatically rebuild `dist/code.js` whenever you save changes to `code.ts`.

### Project Structure

```
Tessa/
├── code.ts          # Main plugin logic (TypeScript)
├── ui.html          # Plugin UI with Gemini AI integration
├── manifest.json    # Plugin manifest configuration
├── package.json     # Dependencies and scripts
├── tsconfig.json    # TypeScript configuration
└── dist/            # Compiled output (generated)
    └── code.js      # Built JavaScript file
```

## Technologies

- **TypeScript**: Type-safe plugin backend
- **Figma Plugin API**: Access to design data
- **Google Gemini AI**: AI-powered analysis (gemini-1.5-flash model)
- **HTML/CSS/JavaScript**: Modern UI interface

## Tips for Best Results

- **Organization**: Keep your design files well-organized with clear naming conventions
- **Selection Analysis**: Use for focused feedback on specific components
- **Entire File Analysis**: Great for design system audits and consistency checks
- **Components**: The AI recognizes and analyzes component patterns
- **Styles**: Named color and text styles provide better analysis

## Troubleshooting

### "Error: API key not valid"
- Verify you replaced `YOUR_GEMINI_API_KEY_HERE` with your actual API key
- Check that your API key is active at [Google AI Studio](https://makersuite.google.com/)
- Ensure there are no extra spaces or quotes around the key

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Make sure TypeScript compiles: `npm run build`
- Check for errors in the terminal output

### Plugin Not Loading in Figma
- **Must use Figma Desktop App** (web version doesn't support development plugins)
- Verify `dist/code.js` exists (run `npm run build` if not)
- Try removing and re-importing the plugin
- Check the Figma console for errors (Plugins → Development → Open Console)

### "No layers selected" Error
- Make sure you've selected at least one layer before clicking "Analyze Selection"
- Or use "Analyze Entire File" instead to analyze everything

### Analysis Too Long / Timeout
- For very large files, try analyzing specific pages or selections
- The plugin limits traversal depth to 3 levels to avoid excessive data

## API Usage Note

This plugin uses the Google Gemini API which may have:
- Rate limits on free tier
- Request quotas
- Cost considerations for high usage

Check [Google AI Studio pricing](https://ai.google.dev/pricing) for details.

## Future Enhancements

Possible improvements:
- Export analysis reports
- Compare design files
- Track changes over time
- Custom analysis prompts
- Multiple AI model support

## License

MIT

---

**Need help?** Check the [Figma Plugin Documentation](https://www.figma.com/plugin-docs/)
