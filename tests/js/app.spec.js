/**
 * @jest-environment jsdom
 */
import { FormSubmitter, Analytics, AppConfig } from "@hashtagcms/web-sdk";

// Mock the web-sdk modules
jest.mock("@hashtagcms/web-sdk", () => ({
    FormSubmitter: jest.fn(),
    Analytics: jest.fn(),
    AppConfig: jest.fn()
}));

describe('Basic Theme App Initialization', () => {

    beforeEach(() => {
        // Clear window object
        window.HashtagCms = undefined;
        // Reset mocks
        jest.clearAllMocks();
    });

    it('initializes window.HashtagCms and components on load', () => {
        // Require the file to execute it
        jest.isolateModules(() => {
            require('../../src/themes/basic/js/app.js');
        });

        // Check global namespace
        expect(window.HashtagCms).toBeDefined();
        expect(window.HashtagCms.configData).toEqual({});

        // Check Components initialization
        expect(FormSubmitter).toHaveBeenCalled();
        expect(Analytics).toHaveBeenCalled();
        expect(AppConfig).toHaveBeenCalled();

        // Check property assignment
        expect(window.HashtagCms.FormSubmitter).toBeInstanceOf(FormSubmitter);
        expect(window.HashtagCms.Analytics).toBeInstanceOf(Analytics);
        expect(window.HashtagCms.AppConfig).toBeInstanceOf(AppConfig);
        
        // Check legacy aliases
        expect(window.HashtagCms.Newsletter).toBe(window.HashtagCms.FormSubmitter);
        expect(window.HashtagCms.Subscribe).toBe(window.HashtagCms.FormSubmitter);
    });
});
