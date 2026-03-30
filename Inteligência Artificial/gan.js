async function carregarMNIST() {
    const MNIST_IMAGES_SPRITE_PATH =
        'https://storage.googleapis.com/learnjs-data/model-builder/mnist_images.png';

    const img = new Image();
    img.crossOrigin = '';
    img.src = MNIST_IMAGES_SPRITE_PATH;

    await new Promise(resolve => {
        img.onload = resolve;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const numImages = 65000;
    const imageSize = 28;

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const pixels = imageData.data;
    const images = [];

    for (let i = 0; i < numImages; i++) {
        const image = [];

        for (let j = 0; j < imageSize * imageSize; j++) {
            const pixelIndex = i * imageSize * imageSize * 4 + j * 4;
            image.push(pixels[pixelIndex] / 255);
        }

        images.push(image);
    }

    return tf.tensor2d(images);
}