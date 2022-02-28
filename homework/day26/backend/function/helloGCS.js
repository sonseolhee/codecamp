/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
// exports.helloGCS = (event, context) => {
//   console.log(`event : ${JSON.stringify(event)}`);
//   console.log(`context : ${JSON.stringify(context)}`);
//   // const gcsEvent = event;
//   // console.log(`Processing file: ${gcsEvent.name}`);
// };

const sharp = require('sharp');
const { Storage } = require('@google-cloud/storage');

exports.helloGCS = async (event, context) => {
  const dir = event.name;
  if (dir.includes('thumb')) {
    return;
  }

  const storage = new Storage().bucket('codecamp-image-storage-bucket');

  const sizes = [
    ['l', 1280],
    ['m', 640],
    ['s', 320],
  ];

  await Promise.all(
    sizes.map((size) => {
      return new Promise((resolve, reject) => {
        storage
          .file(`${event.name}`)
          .createReadStream() //readableStream
          .pipe(sharp().resize(size[1])) //resizing
          .pipe(
            storage.file(`thumb/${size[0]}/${event.name}`).createWriteStream(),
          ) //writableStream
          .on('finish', () => resolve('성공'))
          .on('error', (error) => reject(error));
      });
    }),
  );
};
