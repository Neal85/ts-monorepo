const path = require('path');
const fs = require('fs');

const PkgName = 'package.json';
const Dist = 'dist';
const includes = [
    {
        folder: 'packages',
        dist: 'dist',
    }
];


function copyToDit(original, target) {
    if (!fs.existsSync(original)) return;
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
    };

    const files = fs.readdirSync(original);
    
    for (const f of files) {
        const srcPath = path.join(original, f);
        const targetPath = path.join(target, f);

        const s = fs.statSync(srcPath);

        if (s.isFile()) {
            fs.copyFileSync(srcPath, targetPath);
        } else if (s.isDirectory()) {
            copyToDit(srcPath, targetPath);
        }
    }
}



async function build() {
    console.info('Scripts: build');

    const rootPath = process.cwd();
    const distPath = path.join(rootPath, Dist);
    const rootPkgPath = path.join(rootPath, PkgName);

    const mainPkg = require(rootPkgPath);

    const allModules = includes
                            .map(f => 
                                fs.readdirSync(path.join(rootPath, f.folder))
                                    .map(x => ({ ...f, name: x, path: path.join(rootPath, f.folder, x)}))
                            )
                            .flat()
                            .filter(f => fs.statSync(f.path).isDirectory());


    fs.existsSync(distPath) && fs.rmdirSync(distPath, { maxRetries: 2, recursive: true, });
    fs.mkdirSync(distPath);

    for (const m of allModules) {
        const targetPath = path.join(rootPath, m.dist, m.name);

        fs.mkdirSync(targetPath);

        copyToDit(path.join(m.path, Dist), path.join(targetPath, Dist));

        fs.copyFileSync(path.join(m.path, PkgName), path.join(targetPath, PkgName));
    }
}


build();