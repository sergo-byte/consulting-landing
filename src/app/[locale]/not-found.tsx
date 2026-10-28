import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Primitives";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pt-32">
      <div aria-hidden="true" className="absolute inset-0 grid-veil opacity-40" />
      <div className="container-page relative">
        <span className="eyebrow">404</span>
        <h1 className="display-lg mt-8 max-w-3xl text-balance">
          Такой страницы нет.{" "}
          <em className="text-gold-400 italic">This page does not exist.</em>
        </h1>
        <p className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-fog-400">
          Возможно, адрес изменился при переезде сайта. Вернитесь на главную или
          напишите нам.
          <br />
          The address may have changed when the site moved. Go back home or write
          to us.
        </p>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/ru"
            className="group inline-flex items-center gap-3 bg-fog-50 px-7 py-4 font-mono text-[0.6875rem] tracking-[0.16em] text-ink-950 uppercase transition-colors duration-500 hover:bg-white"
          >
            На главную
            <ArrowIcon className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
          </Link>
          <Link
            href="/en"
            className="group inline-flex items-center gap-3 border border-line-strong px-7 py-4 font-mono text-[0.6875rem] tracking-[0.16em] text-fog-200 uppercase transition-colors duration-500 hover:border-fog-600 hover:text-fog-50"
          >
            Home
            <ArrowIcon className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
