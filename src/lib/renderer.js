const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

class Renderer {
  constructor(viewsDir) {
    this.viewsDir = viewsDir;
    this.phpRendererPath = path.resolve(__dirname, 'blade-renderer.php');
    this.siteConfig = {};
  }

  setSiteConfig(config) {
    this.siteConfig = config;
  }

  /**
   * Render a module using PHP Blade renderer
   */
  async renderModule(viewName, data, cms) {
    const templatePath = path.join(this.viewsDir, `${viewName}.blade.php`);
    if (!(await fs.pathExists(templatePath))) {
        console.warn(`Template not found: ${templatePath}`);
        return `<!-- Template not found: ${viewName} -->`;
    }

    const inputData = {
        templatePath: templatePath,
        data: data,
        cms: cms
    };

    try {
        const result = spawnSync('php', [this.phpRendererPath], {
            input: JSON.stringify(inputData),
            encoding: 'utf-8',
        });

        if (result.error) {
            throw result.error;
        }

        if (result.status !== 0) {
            console.error('PHP Renderer Error:', result.stderr);
            return `<!-- PHP Error in ${viewName}: ${result.stderr} -->`;
        }

        return result.stdout;
    } catch (err) {
        console.error(`Error calling PHP renderer for ${viewName}:`, err.message);
        return `<!-- Execution Error in ${viewName} -->`;
    }
  }

  /**
   * Main render entry point
   */
  async render(data) {
    // 1. Normalize data if it's an array (Listing page)
    let processedData = data;
    if (Array.isArray(data)) {
        // Use explicit nav categories from siteConfig if set (populated from the home page header module data)
        // These are already in snake_case from the fake-data JSONs
        const navCategories = (this.siteConfig?.navCategories || this.siteConfig?.categories || [])
            .filter(c => {
                // exclude_in_listing field (snake_case from fake-data) or isRootCategory
                const excluded = c.exclude_in_listing || c.excludeInListing;
                return !excluded;
            })
            .map(c => ({
                id: c.id,
                name: c.name,
                title: c.title || c.name,
                link_rewrite: c.link_rewrite || c.linkRewrite || '/',
                is_external: c.is_external || c.isExternal || 0,
                active_key: c.active_key || c.activeKey || ''
            }));

            processedData = {
            meta: {
                page: {
                    title: this.siteConfig?.site?.name || 'HashtagCMS',
                    name: 'Listing'
                },
                site: this.siteConfig?.site || {}
            },
            html: {
                body: {
                    content: {
                        hooks: [
                            { 
                                alias: 'HOOK_HEADER', 
                                modules: [{ viewName: 'header', data: navCategories }] 
                            },
                            { 
                                alias: 'HOOK_ONE_COLUMN', 
                                modules: [{ viewName: 'stories', data: { results: data } }] 
                            },
                            { 
                                alias: 'HOOK_FOOTER', 
                                modules: [{ viewName: 'footer', data: {} }] 
                            }
                        ]
                    }
                }
            }
        };
    }

    const currentData = processedData;

    // 2. Prepare Global Context
    const site = currentData.meta?.site || this.siteConfig?.site || {};
    const theme = currentData.meta?.theme || this.siteConfig?.theme || { hooks: [], skeleton: '' };
    
    const cmsBase = {
        site: site,
        meta: currentData.meta || {},
        langs: currentData.langs || [],
        siteProps: currentData.siteProps || {},
        data: currentData
    };

    // 3. Identify Hooks and Skeleton
    const hooks = currentData.meta?.theme?.hooks || currentData.html?.body?.content?.hooks || [];
    const skeleton = currentData.html?.body?.content?.skeleton || theme.skeleton || 
                   "%{cms.hook.HOOK_HEADER}%%{cms.hook.HOOK_ONE_COLUMN}%%{cms.hook.HOOK_FOOTER}%";
    let bodyContent = skeleton;

    // 4. Render Hooks
    for (const hook of hooks) {
      let hookHtml = '';
      if (hook.modules) {
        for (const module of hook.modules) {
          // Prepare module data
          let mData = module.data || {};
          const moduleContext = {
            results: Array.isArray(mData) ? mData : (mData.results || []),
            data: mData,
            module: module
          };
          
          // Only copy named properties if mData is not an array
          if (mData && typeof mData === 'object' && !Array.isArray(mData)) {
            for (const key in mData) {
                if (key !== 'results' && key !== 'data' && key !== 'module') {
                    moduleContext[key] = mData[key];
                }
            }
            // For QueryService: expose queryData and service data at top level
            if (module.dataType === 'QueryService' || (mData.queryData !== undefined)) {
                moduleContext.queryData = mData.queryData || [];
                moduleContext.serviceData = mData.data || [];
            }
          }
          
          const cmsContext = {
            ...cmsBase,
            meta: { ...cmsBase.meta, page: currentData.meta?.page || {} }
          };
          
          const rendered = await this.renderModule(module.viewName, moduleContext, cmsContext);
          hookHtml += rendered;
        }
      }
      
      const hookPlaceholder = `%{cms.hook.${hook.alias}}%`;
      bodyContent = bodyContent.replace(hookPlaceholder, hookHtml);
    }

    // Replace any remaining placeholders
    bodyContent = bodyContent.replace(/%{cms\.hook\.[A-Z_]+}%/g, '');

    // 5. Wrap in Layout
    const layoutPath = path.join(this.viewsDir, '_layout_/index.blade.php');
    if (await fs.pathExists(layoutPath)) {
        // Layout expectation: $layoutManager with getBodyContent()
        // We simulate this by passing the bodyContent in cmsContext and modifying the template 
        // OR we just use a simple placeholder replacement.
        // For now, let's use the layout renderer
        
        const layoutCmsContext = {
            ...cmsBase,
            bodyContent: bodyContent // For the layout to use
        };
        
        return await this.renderModule('_layout_/index', { bodyContent }, layoutCmsContext);
    }

    return bodyContent;
  }
}

module.exports = Renderer;
