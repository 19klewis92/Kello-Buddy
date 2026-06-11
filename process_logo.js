import { Jimp } from "jimp";

(async () => {
    console.log("Reading image...");
    const image = await Jimp.read('public/logo.png');
    console.log("Size:", image.bitmap.width, image.bitmap.height);
    
    // We want to keep from y=250 to y=1000 approximately
    // And strip the tower on the left and pine tree on the right.
    // Let's crop: x=800, y=250, w=1450, h=750
    // (This centers the tiger and text)
    image.crop({ x: 800, y: 250, w: 1450, h: 750 });
    
    console.log("Processing pixels...");
    // Replace light colors with transparent to fix the textured background
    // If r>220, g>220, b>220, set alpha to 0. (Simple background removal)
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        var red   = this.bitmap.data[idx + 0];
        var green = this.bitmap.data[idx + 1];
        var blue  = this.bitmap.data[idx + 2];
        
        // The background is a light textured paper.
        // It has RGB generally > 200, often a bit yellow/gray (e.g. 230, 225, 220)
        // If it's bright enough, make it transparent
        if(red > 200 && green > 200 && blue > 190) {
            this.bitmap.data[idx + 3] = 0; // making it transparent
        }
    });

    console.log("Saving image...");
    await image.write('public/logo_transparent.png');
    console.log("Done!");
})();
