<?php

/**
 * HashtagCMS Blade Renderer Lite
 */

// 1. Get Data from Stdin
$jsonInput = file_get_contents('php://stdin');
$inputData = json_decode($jsonInput, true);

if (!$inputData || !isset($inputData['templatePath'])) {
    fwrite(STDERR, "Error: Invalid input data\n");
    exit(1);
}

$templatePath = $inputData['templatePath'];
file_put_contents('/tmp/renderer_debug.txt', "viewData for $templatePath: " . var_export($inputData['data'], true) . "\n", FILE_APPEND);
$viewData = $inputData['data'] ?? [];
$cmsContext = $inputData['cms'] ?? [];

// 2. Define HashtagCMS Mock Helpers
global $cms;
$cms = $cmsContext;

global $translationCache;
$translationCache = [];

function htcms_trans($key, $def = null) {
    global $cms, $translationCache, $templatePath;
    $langCode = $cms['meta']['lang']['isoCode'] ?? 'en';
    
    $parts = explode('::', $key);
    $keyPart = count($parts) > 1 ? $parts[1] : $parts[0];
    $fileParts = explode('.', $keyPart);
    $file = $fileParts[0];
    $lookupKey = implode('.', array_slice($fileParts, 1));

    $cacheKey = "$langCode:$file";
    if (!isset($translationCache[$cacheKey])) {
        $langsDir = realpath(dirname($templatePath) . '/../langs');
        if (!$langsDir) {
            // Try relative to modern theme
            $langsDir = realpath(dirname($templatePath) . '/../../langs');
        }
        $filePath = "$langsDir/$langCode/$file.php";
        if ($langsDir && file_exists($filePath)) {
            $translationCache[$cacheKey] = include $filePath;
        } else {
            $translationCache[$cacheKey] = [];
        }
    }

    $translations = $translationCache[$cacheKey];
    return $translations[$lookupKey] ?? ($def ?? $key);
}

function htcms_get_path($path) {
    return '/' . ltrim($path, '/');
}

function htcms_admin_path($path) {
    return '/admin/' . ltrim($path, '/');
}

function htcms_get_image_resource($name) {
    return "/assets/hashtagcms/fe/modern/img/$name";
}

function htcms_get_language_url($code) {
    return "/$code";
}

function htcms_get_site_info($key) {
    global $cms;
    return $cms['site'][$key] ?? '';
}

function htcms_get_lang_info($key) {
    global $cms;
    return $cms['meta']['lang'][$key] ?? '';
}

function htcms_get_performance($key) {
    return rand(5, 50);
}

function htcms_get_media($path) {
    return $path;
}

function htcms_get_config_data($key) {
    global $cms;
    if ($key === 'langs') return $cms['langs'] ?? [];
    return $cms['data'][$key] ?? ($cms['siteProps'][$key] ?? []);
}

function htcms_get_domain_path($path = '') {
    global $cms;
    $domain = $cms['meta']['site']['domain'] ?? 'http://localhost:3000';
    return rtrim($domain, '/') . '/' . ltrim($path, '/');
}

function env($key, $def = null) {
    return $def;
}

function htcms_get_shared_data($alias) {
    global $cms;
    $hooks = $cms['meta']['theme']['hooks'] ?? [];
    foreach ($hooks as $hook) {
        foreach ($hook['modules'] as $m) {
            if ($m['alias'] === $alias) {
                return $m['data'];
            }
        }
    }
    return null;
}

function htcms_get_category_info($key) {
    global $cms;
    return $cms['meta']['category'][$key] ?? '';
}

function now() {
    return date('Y-m-d H:i:s');
}

function old($key, $default = null) {
    return $default;
}

function session($key = null) {
    return null;
}

function request() {
    return new class {
        public function get($key, $default = null) { return $default; }
    };
}

function route($name, $params = []) {
    return '/' . str_replace('.', '/', $name);
}

function htcms_render_sub_template($_templateName, $_vars) {
    global $templatePath;
    
    // Resolve template name (e.g. "modern._layout_.lottie")
    // Replace dots with slashes
    $_cleanName = str_replace('.', '/', $_templateName);
    
    // Find views directory
    // If templatePath is .../views/_layout_/index.blade.php, dirname is .../views/_layout_
    $_dir = dirname($templatePath);
    $_viewsDir = $_dir;
    while ($_viewsDir && !str_ends_with($_viewsDir, 'views') && strlen($_viewsDir) > 5) {
        $_viewsDir = dirname($_viewsDir);
    }
    
    if (!$_viewsDir) {
       $_viewsDir = realpath($_dir . '/../..');
    }

    // Check if name contains theme prefix like "modern." or "basic."
    $_parts = explode('.', $_templateName);
    if (count($_parts) > 1) {
        $_potentialTheme = $_parts[0];
        $_themePath = realpath($_viewsDir . '/../../' . $_potentialTheme);
        if ($_themePath && is_dir($_themePath)) {
             // It's a theme prefix, e.g. "basic._layout_.lottie" -> "_layout_/lottie"
             $_cleanName = str_replace('.', '/', implode('.', array_slice($_parts, 1)));
        }
    }

    $_subPath = "$_viewsDir/$_cleanName.blade.php";
    
    if (!file_exists($_subPath)) {
        return "<!-- Sub-template not found: $_subPath (from $_templateName) -->";
    }

    // Compile and render
    $_subContent = file_get_contents($_subPath);
    $_compiled = compileBlade($_subContent);
    
    $_tmpFile = tempnam(sys_get_temp_dir(), 'blade_sub_');
    file_put_contents($_tmpFile, $_compiled);
    
    // Extract variables
    extract($_vars);
    
    ob_start();
    try {
        include $_tmpFile;
    } catch (Throwable $th) {
        echo "<!-- Error in sub-template $_templateName: " . $th->getMessage() . " -->";
    }
    $_out = ob_get_clean();
    unlink($_tmpFile);
    return $_out;
}

function __($key, $def = null) {
    return htcms_trans($key, $def);
}

function config($key = null) {
    return []; // Return empty array for media config etc
}

function htcms_get_site_props($json = false) {
    global $cmsContext;
    $props = $cmsContext['siteProps'] ?? [];
    return $json ? json_encode($props) : $props;
}

function app($name = null) {
    $layoutManager = new class {
        public function getHeaderContent() { 
            return '<script>window.HashtagCms = window.HashtagCms || { Analytics: { trackCmsPage: function(){} } };</script>'; 
        }
        public function getMetaContent() { return ''; }
        public function getTitle() { global $cms; return $cms['meta']['page']['title'] ?? 'HashtagCMS'; }
        public function getFooterContent() { return ''; }
        public function getBodyContent() { global $viewData; return $viewData['bodyContent'] ?? ''; }
        public function renderStack($name) { 
            global $cms;
            $theme = $cms['meta']['theme']['alias'] ?? 'MODERN';
            $themeDir = strtolower($theme);
            if ($name === 'scripts') {
                return '<script src="/assets/hashtagcms/fe/'.$themeDir.'/js/app.js"></script>';
            }
            if ($name === 'styles') {
                return '<link rel="stylesheet" href="/assets/hashtagcms/fe/'.$themeDir.'/css/app.css">';
            }
            return ''; 
        }
        public function isRtl() { return 'ltr'; }
        public function getViewThemeFolder() { 
            global $cms;
            return strtolower($cms['meta']['theme']['alias'] ?? 'modern'); 
        }
        public function getFestivalCss() { return ''; }
        public function getBodyBackgroundImage() { return ''; }
        public function getFestivalObject() { return []; }
    };

    if ($name === 'HashtagCmsLayoutManager') {
        return $layoutManager;
    }

    return new class($layoutManager) {
        public $HashtagCms;
        public function __construct($lm) {
            $this->HashtagCms = new class($lm) {
                private $lm;
                public function __construct($lm) { $this->lm = $lm; }
                public function layoutManager() { return $this->lm; }
            };
        }
        public function getLocale() { return 'en'; }
    };
}

function csrf_token() { return 'mock-csrf-token'; }

function getFormattedDate($dateStr) {
    if (!$dateStr) return '';
    try {
        return date('M d, Y', strtotime($dateStr));
    } catch (Exception $e) {
        return $dateStr;
    }
}

function e($str) {
    if ($str === null) return '';
    if (is_array($str) || is_object($str)) return '[Object]';
    return htmlspecialchars((string)$str, ENT_QUOTES, 'UTF-8');
}

function auth() {
    return new class {
        public function check() { return false; }
        public function user() { return (object)['name' => 'Guest', 'email' => 'guest@example.com']; }
    };
}

$errors = new class {
    public function has($key) { return false; }
    public function first($key) { return ''; }
    public function all() { return []; }
    public function any() { return false; }
};

// 3. Blade Compiler
function compileBlade($content) {
    // Comments
    $content = preg_replace('/\{\{--\s*(.+?)\s*--\}\}/s', '', $content);
    // Unescaped
    $content = preg_replace('/\{!!\s*(.+?)\s*!!\}/s', '<?php echo $1; ?>', $content);
    // Escaped
    $content = preg_replace('/\{\{\s*(.+?)\s*\}\}/s', '<?php echo e($1); ?>', $content);
    
    // Directives with balanced parentheses
    $p = '(\((?:[^()]++|(?1))*\))';
    
    // Helper to strip outer parens
    $strip = function($m) {
        $inner = substr($m[1], 1, -1);
        return $inner;
    };

    // @include
    $content = preg_replace_callback('/@include\s*'.$p.'/', function($m) {
        return '<?php echo htcms_render_sub_template('.substr($m[1], 1, -1).', get_defined_vars()); ?>';
    }, $content);

    $content = preg_replace_callback('/@if\s*'.$p.'/', function($m) {
        return '<?php if('.substr($m[1], 1, -1).'): ?>';
    }, $content);

    $content = preg_replace_callback('/@elseif\s*'.$p.'/', function($m) {
        return '<?php elseif('.substr($m[1], 1, -1).'): ?>';
    }, $content);

    $content = preg_replace_callback('/@unless\s*'.$p.'/', function($m) {
        return '<?php if(!('.substr($m[1], 1, -1).')): ?>';
    }, $content);

    $content = preg_replace_callback('/@foreach\s*'.$p.'/', function($m) {
        return '<?php foreach('.substr($m[1], 1, -1).'): ?>';
    }, $content);

    $content = preg_replace_callback('/@isset\s*'.$p.'/', function($m) {
        return '<?php if(isset('.substr($m[1], 1, -1).')): ?>';
    }, $content);

    $content = preg_replace_callback('/@empty\s*'.$p.'/', function($m) {
        return '<?php if(empty('.substr($m[1], 1, -1).'): ?>';
    }, $content);
    
    $content = preg_replace('/@else/', '<?php else: ?>', $content);
    $content = preg_replace('/@endif/', '<?php endif; ?>', $content);
    $content = preg_replace('/@endunless/', '<?php endif; ?>', $content);
    $content = preg_replace('/@endforeach/', '<?php endforeach; ?>', $content);
    $content = preg_replace('/@endisset/', '<?php endif; ?>', $content);
    $content = preg_replace('/@endempty/', '<?php endif; ?>', $content);
    
    $content = preg_replace('/@auth/', '<?php if(auth()->check()): ?>', $content);
    $content = preg_replace('/@endauth/', '<?php endif; ?>', $content);
    $content = preg_replace('/@guest/', '<?php if(!auth()->check()): ?>', $content);
    $content = preg_replace('/@endguest/', '<?php endif; ?>', $content);
    $content = preg_replace('/@csrf/', '', $content);
    
    // @push / @endpush - capture and discard (no real stack in playground)
    $content = preg_replace('/@push\s*\(\s*[\'"][^\'"]*[\'"]\s*\)/', '<?php ob_start(); ?>', $content);
    $content = preg_replace('/@endpush/', '<?php ob_end_clean(); ?>', $content);
    // @stack - renders nothing in playground
    $content = preg_replace('/@stack\s*\(\s*[\'"][^\'"]*[\'"]\s*\)/', '', $content);
    
    // @php block
    $content = preg_replace('/@php\s+([\s\S]+?)\s+@endphp/s', '<?php $1 ?>', $content);
    
    return $content;
}

// 4. Render
if (!file_exists($templatePath)) {
    fwrite(STDERR, "Error: Template not found at $templatePath\n");
    exit(1);
}

$content = file_get_contents($templatePath);
$compiled = compileBlade($content);

// Temporary file
$tmpFile = tempnam(sys_get_temp_dir(), 'blade_');
file_put_contents($tmpFile, $compiled);

// DATA PREPARATION
// HashtagCMS templates expect $data, $results, $module, $cms
// Ensure $data is an object (array in PHP) that contains 'results'
$data = isset($viewData['data']) ? $viewData['data'] : (isset($viewData['results']) ? $viewData : []);
$results = isset($viewData['results']) ? $viewData['results'] : (isset($data['results']) ? $data['results'] : (is_array($data) && !isset($data['results']) ? $data : []));
$module = $viewData['module'] ?? [];
$moduleInfo = $module;

// In case $data was the array itself, wrap it
if (is_array($data) && !isset($data['results']) && count($data) > 0 && isset($data[0])) {
    $results = $data;
    $data = ['results' => $results];
}
$module = $viewData['module'] ?? [];

// Buffering
ob_start();
try {
    include $tmpFile;
} catch (Throwable $th) {
    echo "<!-- Error rendering template: " . $th->getMessage() . " at line " . $th->getLine() . " -->\n";
    $lines = explode("\n", file_get_contents($tmpFile));
    $errLine = $th->getLine() - 1;
    if (isset($lines[$errLine])) {
        echo "<!-- Line content: " . htmlspecialchars($lines[$errLine]) . " -->";
    }
}
$output = ob_get_clean();

unlink($tmpFile);
echo $output;
