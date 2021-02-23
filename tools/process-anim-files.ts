import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import * as YAML from 'yamljs';
import { glob as globRegular } from 'glob';
const glob = promisify(globRegular);

const start = async () => {
    const files = await glob(path.resolve(__dirname, '../static-files/anims/*.anim'));
    files.forEach(file => {
        const data = YAML.load(file);
        const animationData = data.AnimationClip;
        const curves = animationData.m_FloatCurves
            .filter((curve: any) => !!curve.attribute)
            .map((curve: any) => ({
                attribute: curve.attribute,
                data: curve.curve.m_Curve.map((c: any) => ({
                    time: c.time,
                    value: c.value,
                    inSlope: c.inSlope,
                    outSlope: c.outSlope,
                    tangentMode: c.tangentMode,
                    weightedMode: c.weightedMode,
                    inWeight: c.inWeight,
                    outWeight: c.outWeight,
                })),
            }));
        const finalData = {
            name: animationData.m_Name,
            curves,
        };

        const fileNameSplit = file.split('/');
        const fileNameYaml = fileNameSplit[fileNameSplit.length - 1];
        const fileNameSplit2 = fileNameYaml.split('.');
        fileNameSplit2[fileNameSplit2.length - 1] = 'json';

        const fileName = fileNameSplit2.join('.');
        const filePath = path.resolve(__dirname, `../dist/anim-files/${fileName}`);
        fs.writeFileSync(filePath, JSON.stringify(finalData, null, 0));
    });
};

start()
    .then(() => {
        console.log('Script finished');
    })
    .catch(e => {
        console.error('Script failed');
        console.error(e);
    });
