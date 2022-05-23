const fs = require('fs');

const packagesLocation = __dirname + '/packages'
const packageNames = fs.readdirSync(packagesLocation).map(item => item);

packageNames.map(packageName => {
  const packageLocation = `${packagesLocation}/${packageName}/package.json`
  const packageData = require(packageLocation);
  packageData.main = packageData.main.replace('dist/index.js', 'src/index.ts');
  packageData.module = packageData.module.replace('dist/index.js', 'src/index.ts');
  packageData.types = packageData.types.replace('typings/index.d.ts', 'src/index.d.ts');
  fs.writeFile(packageLocation, JSON.stringify(packageData, null, 2), function (err) {
    if (err) throw err;
  });
  fs.appendFile(packageLocation, "\n",function (err) {
    if (err) throw err;
  })
})
