console.log('Collector service started');

async function main() {
  console.log('Collecting news...');
  // TODO: Implement news collection logic
}

main().catch((error) => {
  console.error('Error in collector:', error);
  process.exit(1);
});
