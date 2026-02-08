import { Analytics, FormSubmitter, AppConfig } from "@hashtagcms/web-sdk";

window.HashtagCms = window.HashtagCms || { configData: {} };
window.HashtagCms.FormSubmitter = new FormSubmitter();
window.HashtagCms.Newsletter = window.HashtagCms.FormSubmitter; // Legacy support
window.HashtagCms.Subscribe = window.HashtagCms.FormSubmitter; // Legacy support
window.HashtagCms.Analytics = new Analytics();
window.HashtagCms.AppConfig = new AppConfig();
//console.log('Basic Theme loaded');