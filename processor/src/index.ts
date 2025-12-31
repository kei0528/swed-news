console.log('Processor service started');

async function main() {
  console.log('Processing news...');
  // TODO: Implement news processing logic
}

main().catch((error) => {
  console.error('Error in processor:', error);
  process.exit(1);
});
