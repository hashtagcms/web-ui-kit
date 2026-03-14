const express = require('express');
const path = require('path');
const chokidar = require('chokidar');
const fs = require('fs-extra');
const Renderer = require('./src/lib/renderer');

const app = express();
const port = 3000;

const DEFAULT_THEME = 'modern';
const THEMES_SRC_DIR = path.resolve(__dirname, 'src/themes');
const THEMES_DIST_DIR = path.resolve(__dirname, 'dist/themes');
const SITE_CONFIG_PATH = path.join(__dirname, 'fake-data', 'site-config.json');
const LINK_MAP_PATH = path.join(__dirname, 'src', 'core', 'data', 'link-map.json');

/**
 * Get all available themes (directories inside src/themes)
 */
function getAvailableThemes() {
  try {
    return fs.readdirSync(THEMES_SRC_DIR).filter(name => {
      const themePath = path.join(THEMES_SRC_DIR, name);
      return fs.statSync(themePath).isDirectory() && !name.startsWith('.');
    });
  } catch (e) {
    return [DEFAULT_THEME];
  }
}

/**
 * Resolve theme-specific paths
 */
function getThemePaths(themeName) {
  const validThemes = getAvailableThemes();
  const theme = validThemes.includes(themeName) ? themeName : DEFAULT_THEME;
  return {
    name: theme,
    viewsDir: path.resolve(THEMES_SRC_DIR, theme, 'views'),
    distDir: path.resolve(THEMES_DIST_DIR, theme),
    assetBase: `/assets/hashtagcms/fe/${theme}`,
  };
}

// Load site config and link map
async function loadConfigs() {
  try {
    const siteConfig = await fs.readJson(SITE_CONFIG_PATH);
    const linkMap = await fs.readJson(LINK_MAP_PATH);
    return { siteConfig, linkMap };
  } catch (err) {
    console.error('Error loading config files:', err.message);
    return { siteConfig: {}, linkMap: {} };
  }
}

/**
 * Patch all theme asset references in pageData to point to the right theme
 */
function patchAssetPaths(pageData, themePaths) {
  const json = JSON.stringify(pageData);
  // Replace any /assets/hashtagcms/fe/<theme_name>/ with the current theme's asset base
  const patched = json.replace(/\/assets\/hashtagcms\/fe\/[a-z0-9_-]+\//g, `${themePaths.assetBase}/`);
  return JSON.parse(patched);
}

async function handleRequest(req, res) {
  try {
    const requestedTheme = req.query.theme || DEFAULT_THEME;
    const themePaths = getThemePaths(requestedTheme);

    const { siteConfig, linkMap } = await loadConfigs();
    const urlPath = req.path.replace(/^\//, '') || '/';

    // Look for matching data file in link-map
    let dataFilePath = linkMap[urlPath] || linkMap['/' + urlPath] || linkMap['home'];

    if (!dataFilePath && urlPath === '/') {
      dataFilePath = linkMap['/'] || linkMap['home'];
    }

    if (!dataFilePath) {
      console.warn(`No mapping found for path: ${urlPath}. Falling back to home.json`);
      dataFilePath = 'fake-data/home.json';
    }

    const fullDataPath = path.join(__dirname, dataFilePath);

    if (!(await fs.pathExists(fullDataPath))) {
      throw new Error(`Data file not found: ${fullDataPath}`);
    }

    let pageData = await fs.readJson(fullDataPath);

    // Patch asset paths to point to the correct theme
    pageData = patchAssetPaths(pageData, themePaths);

    // Merge site config
    if (siteConfig.site) {
      pageData.site = siteConfig.site;
    }
    if (siteConfig.langs) {
      pageData.langs = siteConfig.langs;
    }

    // Check if the theme's views directory exists
    if (!(await fs.pathExists(themePaths.viewsDir))) {
      throw new Error(`Theme views directory not found: ${themePaths.viewsDir}`);
    }

    const renderer = new Renderer(themePaths.viewsDir);

    // Extract nav categories from home page's header module data
    if (!siteConfig.navCategories) {
      try {
        const homeData = await fs.readJson(path.join(__dirname, 'fake-data/home.json'));
        const headerHook = (homeData?.meta?.theme?.hooks || []).find(h => h.alias === 'HOOK_HEADER');
        const headerModule = headerHook?.modules?.find(m => m.viewName === 'header');
        if (headerModule?.data?.length > 0) {
          siteConfig.navCategories = headerModule.data;
        }
      } catch(e) { /* ignore */ }
    }

    renderer.setSiteConfig(siteConfig);

    let html = await renderer.render(pageData);

    // --- Build the switcher widgets ---
    const availableThemes = getAvailableThemes();
    const currentRoute = req.path;
    const themeQuery = `?theme=${themePaths.name}`;

    // Theme Switcher Widget
    const themeListItems = availableThemes.map(t => {
      const isActive = t === themePaths.name;
      return `
        <a href="${currentRoute}?theme=${t}"
           style="display: flex; align-items: center; gap: 8px; padding: 8px 15px; color: ${isActive ? '#6366f1' : '#334155'}; text-decoration: none; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: ${isActive ? '700' : '400'}; background: ${isActive ? '#f0f0ff' : 'transparent'};">
          ${isActive ? `<span style="width:8px;height:8px;border-radius:50%;background:#6366f1;display:inline-block;flex-shrink:0;"></span>` : `<span style="width:8px;height:8px;border-radius:50%;background:#cbd5e1;display:inline-block;flex-shrink:0;"></span>`}
          ${t.charAt(0).toUpperCase() + t.slice(1)}
        </a>
      `;
    }).join('');

    const switcherHtml = `
      <div id="htcms-playground-toolbar" style="position: fixed; bottom: 20px; right: 20px; z-index: 10000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; display: flex; align-items: flex-end; gap: 10px;">

        <!-- Theme Switcher -->
        <div id="htcms-theme-switcher" style="position: relative;">
          <button
            id="htcms-theme-toggle-btn"
            onclick="(function(){var el=document.getElementById('htcms-theme-list'); el.style.display = el.style.display === 'none' ? 'block' : 'none'; document.getElementById('htcms-page-list').style.display='none';})()"
            style="background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border: none; padding: 10px 16px; cursor: pointer; border-radius: 8px; font-weight: 600; font-size: 13px; box-shadow: 0 4px 14px rgba(99,102,241,0.4); display: flex; align-items: center; gap: 6px; white-space: nowrap;"
            title="Switch Theme">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
            Theme: <strong style="text-transform:capitalize;">${themePaths.name}</strong>
          </button>
          <div id="htcms-theme-list" style="display: none; position: absolute; bottom: calc(100% + 8px); right: 0; background: white; border: 1px solid #e2e8f0; border-radius: 10px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.15), 0 4px 6px -2px rgba(0,0,0,0.05); min-width: 180px; overflow: hidden;">
            <div style="padding: 10px 15px 8px; border-bottom: 1px solid #f1f5f9; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px;">Select Theme</div>
            ${themeListItems}
          </div>
        </div>

        <!-- Page Switcher -->
        <div id="htcms-page-switcher" style="position: relative;">
          <button
            id="htcms-page-toggle-btn"
            onclick="(function(){var el=document.getElementById('htcms-page-list'); el.style.display = el.style.display === 'none' ? 'block' : 'none'; document.getElementById('htcms-theme-list').style.display='none';})()"
            style="background: #1e293b; color: white; border: none; padding: 10px 16px; cursor: pointer; border-radius: 8px; font-weight: 600; font-size: 13px; box-shadow: 0 4px 14px rgba(30,41,59,0.35); display: flex; align-items: center; gap: 6px; white-space: nowrap;"
            title="Switch Page">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><polyline points="9 18 15 12 9 6"/></svg>
            Switch Page
          </button>
          <div id="htcms-page-list" style="display: none; position: absolute; bottom: calc(100% + 8px); right: 0; background: white; border: 1px solid #e2e8f0; border-radius: 10px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.15), 0 4px 6px -2px rgba(0,0,0,0.05); min-width: 200px; overflow: hidden;">
            <div style="padding: 10px 15px 8px; border-bottom: 1px solid #f1f5f9; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px;">Select Page</div>
            ${Object.keys(linkMap).map(route => {
              const href = (route.startsWith('/') ? route : '/' + route) + `?theme=${themePaths.name}`;
              const label = route === '/' ? 'Home (/)' : route;
              const isCurrentPage = ('/' + urlPath === route || urlPath === route.replace(/^\//, ''));
              return `
                <a href="${href}" style="display: flex; align-items: center; gap: 8px; padding: 8px 15px; color: ${isCurrentPage ? '#1e293b' : '#334155'}; text-decoration: none; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: ${isCurrentPage ? '700' : '400'}; background: ${isCurrentPage ? '#f8fafc' : 'transparent'};">
                  ${isCurrentPage ? `<span style="width:8px;height:8px;border-radius:50%;background:#1e293b;display:inline-block;flex-shrink:0;"></span>` : `<span style="width:8px;height:8px;border-radius:50%;background:#cbd5e1;display:inline-block;flex-shrink:0;"></span>`}
                  ${label}
                </a>
              `;
            }).join('')}
          </div>
        </div>

      </div>

      <script>
        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
          if (!document.getElementById('htcms-playground-toolbar').contains(e.target)) {
            var themeList = document.getElementById('htcms-theme-list');
            var pageList = document.getElementById('htcms-page-list');
            if (themeList) themeList.style.display = 'none';
            if (pageList) pageList.style.display = 'none';
          }
        });
      </script>
    `;

    html = html.replace('</body>', `${switcherHtml}</body>`);

    res.send(html);
  } catch (err) {
    console.error('Render error:', err);
    res.status(500).send(`
      <div style="padding: 20px; font-family: sans-serif;">
        <h1 style="color: #e11d48">Rendering Error</h1>
        <pre style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; overflow: auto">${err.stack}</pre>
        <p>Check the console for more details.</p>
      </div>
    `);
  }
}

// Dynamic static asset serving for all themes
// Maps /assets/hashtagcms/fe/<theme>/... to dist/themes/<theme>/...
app.use('/assets/hashtagcms/fe/:theme', (req, res, next) => {
  const { theme } = req.params;
  const availableThemes = getAvailableThemes();
  if (!availableThemes.includes(theme)) return next();

  const distDir = path.join(THEMES_DIST_DIR, theme);
  const url = req.url;

  if (url.includes('/css/app.css')) return res.sendFile(path.join(distDir, 'app.css'));
  if (url.includes('/js/app.js')) return res.sendFile(path.join(distDir, 'app.js'));
  if (url.includes('/img/')) {
    const imgPath = path.join(distDir, 'img', path.basename(url));
    if (fs.existsSync(imgPath)) return res.sendFile(imgPath);
  }
  next();
});

// Fallback static serving for all theme dist assets
app.use('/assets/hashtagcms/fe/:theme', (req, res, next) => {
  const { theme } = req.params;
  const availableThemes = getAvailableThemes();
  if (!availableThemes.includes(theme)) return next();
  express.static(path.join(THEMES_DIST_DIR, theme))(req, res, next);
});

app.use('/dist', express.static(path.resolve(__dirname, 'dist')));

// Routes
const routes = ['/', '/home', '/blog', '/blog/blog-test', '/blog/test-blog', '/contact', '/example', '/login', '/register'];
routes.forEach(route => {
  app.get(route, handleRequest);
});

app.listen(port, () => {
  console.log('--------------------------------------------------');
  console.log(`HashtagCMS Playground running at http://localhost:${port}`);
  console.log(`Available themes: ${getAvailableThemes().join(', ')}`);
  console.log(`Use ?theme=<name> to switch themes, e.g. http://localhost:${port}/?theme=basic`);
  console.log('--------------------------------------------------');
});

// Watch for changes
const watcher = chokidar.watch([
  path.resolve(__dirname, 'src/themes'),
  path.resolve(__dirname, 'fake-data'),
], {
  persistent: true,
  ignoreInitial: true,
});

watcher.on('all', (event, changedPath) => {
  console.log(`[Watcher] File ${changedPath} changed (${event}). Refresh the browser to see changes.`);
});
