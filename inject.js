(async function () {
    try {
      // URL of your hosted app files
      const BASE_URL = "https://tamir-entitle.github.io/acronyms-public";
  
      // Fetch the manifest.json file
      const response = await fetch(`${BASE_URL}/.vite/manifest.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch manifest.json: ${response.statusText}`);
      }
      const manifest = await response.json();

      console.log(manifest);
  
      // Extract the JavaScript and CSS file paths from the manifest
      const jsFile = manifest["index.html"].file;
      const cssFile = manifest["index.html"].css[0];
  
      // Load the CSS file
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `${BASE_URL}/${cssFile}`;
      document.head.appendChild(link);
  
      // Load the JavaScript file
      const script = document.createElement("script");
      script.type = "module";
      script.src = `${BASE_URL}/${jsFile}`;
      script.onload = () => {
        // Mount the React app into the div with id="game"
        const rootDiv = document.getElementById("game");
        if (!rootDiv) {
          console.error('No element with id="game" found on the page.');
          return;
        }
  
        // Assuming your app exports a function to mount it
        if (window.mountReactApp) {
          window.mountReactApp(rootDiv);
        } else {
          console.error("mountReactApp function not found in the loaded script.");
        }
      };
      document.body.appendChild(script);
    } catch (error) {
      console.error("Error loading the app:", error);
    }
  })();