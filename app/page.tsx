import Game from "@/components/Game";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-4 pb-16 pt-6 sm:pt-10">
      <header className="mb-6 flex items-end justify-between border-b border-line pb-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-paper">
            Ophthodle
          </h1>
          <p className="text-sm text-fog">
            One case a day. Five clues. Name the diagnosis.
          </p>
        </div>
        <span
          aria-hidden
          className="mb-1 h-8 w-8 rounded-full border-2 border-beam bg-gradient-to-br from-beam/30 to-transparent"
          title="Ophthodle"
        />
      </header>
      <Game />
    </main>
  );
}
