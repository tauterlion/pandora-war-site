// Reassemble byte-identical, user-exported modpacks from shared binary parts.
// The build fails rather than serving an incomplete or changed archive.
const fs = require('node:fs');
const path = require('node:path');
const {createHash} = require('node:crypto');
const root = path.resolve(__dirname, '..');
const parts = path.join(root, 'pack-parts');
const output = path.join(root, 'public', 'downloads');
const expected = {
  "Performance": {
    "bytes": 10883752,
    "sha256": "1eb74f834d4b0c3fbeb3c4faa95048a05947b3ff61b64231950b72d5cc4cd2ca"
  },
  "Balanced": {
    "bytes": 10883782,
    "sha256": "1b22b078a5b0b4264e8aedf84f8e4fb2121a38ba9c38d54414e70a0fdc9674f4"
  },
  "Cinematic": {
    "bytes": 10884340,
    "sha256": "80f9736245b6ddad35c60dacec3c44a9a686aceb24098efc7107339b8e810b14"
  }
};
const read = name => fs.readFileSync(path.join(parts, name));
const common = Buffer.concat(Array.from({length:14}, (_,i)=>read('common-'+String(i).padStart(2,'0')+'.bin')));
if (common.length !== 10768356 || createHash('sha256').update(common).digest('hex') !== 'a1e3b28ebdd546b9627216d7a4c03bc6025484d6480f19c35182b41c7ead58d6') throw Error('Shared modpack data failed integrity check');
fs.mkdirSync(output,{recursive:true});
for (const [name, spec] of Object.entries(expected)) {
  const data = Buffer.concat([read(name.toLowerCase()+'-prefix.bin'),common,read(name.toLowerCase()+'-suffix.bin')]);
  const sha = createHash('sha256').update(data).digest('hex');
  if(data.length !== spec.bytes || sha !== spec.sha256) throw Error(name+' archive failed integrity check');
  const filename = 'Pandora-'+name+'-1.0.0.mrpack';
  fs.writeFileSync(path.join(output,filename),data);
  console.log(filename+' '+data.length+' bytes SHA256 '+sha);
}
