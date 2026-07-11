export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function runFiveTimes() {
  for (let i = 0; i < 5; i++) {
    console.log(`第：${i + 1}次`);
    await delay(3000); // Wait for 3 seconds
  }
}