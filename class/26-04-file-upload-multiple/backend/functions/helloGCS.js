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

exports.helloGCS = (file, context) => {
  console.log(`  Event: ${context.eventId}`);
  console.log(`  Event Type: ${context.eventType}`);
  console.log(`  Bucket: ${file.bucket}`);
  console.log(`  File: ${file.name}`);
  console.log(`  Metageneration: ${file.metageneration}`);
  console.log(`  Created: ${file.timeCreated}`);
  console.log(`  Updated: ${file.updated}`);
};
