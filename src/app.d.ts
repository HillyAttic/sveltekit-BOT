declare global {
  namespace App {
    interface Platform {
      // Provided by adapters such as @sveltejs/adapter-vercel.
      context?: { waitUntil(promise: Promise<unknown>): void }
    }
  }
}

export {}
