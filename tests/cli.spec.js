const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');

// Mock dependencies
jest.mock('inquirer');
jest.mock('fs-extra', () => {
    return {
        existsSync: jest.fn().mockImplementation((p) => { 
            console.log('existsSync:', p); 
            return true; 
        }),
        readdir: jest.fn().mockImplementation((p) => {
            console.log('readdir:', p);
            return Promise.resolve([]);
        }),
        stat: jest.fn().mockImplementation((p) => {
            console.log('stat:', p);
            return Promise.resolve({ isDirectory: () => true });
        }),
        pathExists: jest.fn().mockImplementation((p) => {
             console.log('pathExists:', p);
             return Promise.resolve(true);
        }),
        copy: jest.fn().mockImplementation((src, dest) => {
            console.log('copy:', src, '->', dest);
            return Promise.resolve();
        }),
        // Add other used methods if any
    };
});
jest.mock('chalk', () => ({
    red: jest.fn(txt => txt),
    blue: jest.fn(txt => txt),
    gray: jest.fn(txt => txt),
    green: jest.fn(txt => txt),
    yellow: jest.fn(txt => txt),
}));

describe('CLI Script', () => {
    let mockExit;
    // ...
    let mockLog;
    let mockError;
    let mockWarn;

    const sourceThemePath = path.resolve(__dirname, '../src/themes');
    const mockCwd = '/user/project';

    beforeEach(() => {
        mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
        mockLog = jest.spyOn(console, 'log').mockImplementation(() => {});
        mockError = jest.spyOn(console, 'error').mockImplementation(() => {});
        mockWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        
        jest.spyOn(process, 'cwd').mockReturnValue(mockCwd);

        // Default fs mocks
        fs.existsSync.mockReturnValue(true);
        fs.readdir.mockResolvedValue(['basic', 'modern']);
        fs.stat.mockResolvedValue({ isDirectory: () => true });
        
        // Use implementations that return promises but don't log
        fs.pathExists.mockImplementation(() => Promise.resolve(true));
        fs.copy.mockImplementation(() => Promise.resolve());
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const { run } = require('../bin/cli.js');

    const runCli = async () => {
        await run();
    };

    it('exits if source directory does not exist', async () => {
        fs.existsSync.mockReturnValue(false);

        await runCli();

        expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Source themes directory not found'));
        expect(process.exit).toHaveBeenCalledWith(1);
    });

    it('exits if no themes are found', async () => {
        fs.readdir.mockResolvedValue([]); // No files

        await runCli();

        expect(console.error).toHaveBeenCalledWith(expect.stringContaining('No themes found'));
        expect(process.exit).toHaveBeenCalledWith(1);
    });

    it('copies assets for selected theme', async () => {
        // Setup Answers
        inquirer.prompt.mockResolvedValueOnce({
            theme: 'basic',
            destination: './public/assets'
        }); // First prompt (theme, dest)

        inquirer.prompt.mockResolvedValueOnce({
            copyViews: false
        }); // Second prompt (views)

        await runCli();

        // Verify Inquirer called
        expect(inquirer.prompt).toHaveBeenCalledTimes(2);

        // Verify Copies
        // Should copy img, fonts, images, vendor
        expect(fs.copy).toHaveBeenCalledTimes(4); 
        
        const expectedDestBase = path.resolve(mockCwd, './public/assets/basic');
        expect(fs.copy).toHaveBeenCalledWith(expect.stringContaining('basic/img'), path.join(expectedDestBase, 'img'));
        expect(fs.copy).toHaveBeenCalledWith(expect.stringContaining('basic/fonts'), path.join(expectedDestBase, 'fonts'));

        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Success! Assets for \'basic\' copied'));
    });

    it('copies views when requested', async () => {
        // Setup Answers
        inquirer.prompt.mockResolvedValueOnce({
            theme: 'modern',
            destination: './public/assets'
        }); 

        // Second Prompt: Copy views = true
        inquirer.prompt.mockResolvedValueOnce({
            copyViews: true,
            viewDestination: './resources/views/fe'
        }); 

        // Third Prompt: Overwrite = true (triggered because pathExists=true)
        inquirer.prompt.mockResolvedValueOnce({
            overwrite: true
        }); 

        await runCli();

        // Verify Assets Copy (4 folders) + Views Copy (1 folder)
        expect(fs.copy).toHaveBeenCalledTimes(5);
        
        const expectedViewDest = path.resolve(mockCwd, './resources/views/fe/modern');
        expect(fs.copy).toHaveBeenCalledWith(expect.stringContaining('modern/views'), expectedViewDest);

        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Views copied'));
    });

    it('handles copy error gracefully', async () => {
        inquirer.prompt.mockResolvedValue({ theme: 'basic', destination: '.' });
        fs.copy.mockRejectedValue(new Error('Permission denied'));

        await runCli();

        expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Error copying assets'), expect.any(Error));
        expect(process.exit).toHaveBeenCalledWith(1);
    });
});
