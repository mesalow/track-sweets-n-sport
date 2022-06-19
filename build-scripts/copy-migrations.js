//typescript-eslint-ignore-next
const { copyFile, readdir, mkdir,  } = require("fs/promises");
const path = require( "path");

module.exports = function copyMigrations(extractPath, electronVersion, platform, arch, done) {
    console.log('copying migrations');
    const migrationsDir = './resources/migrations';
    readdir(migrationsDir).then(files => {

        const promises = files.map(filePath => {
            console.log('copying file', filePath);
            const destDir = path.join(extractPath,'../migrations');
            const dest = path.join(destDir, filePath);
            console.log('copying to destination', dest);
            return copyFile(migrationsDir + '/'+filePath,dest).catch(async () => {
                await mkdir(destDir);
                return copyFile(migrationsDir + '/'+filePath,dest)
            });
        })
        
        Promise.all(promises).then(() => {
            console.log('copying done');
            done()
        }).catch(console.error);
    })
}