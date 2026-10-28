import { Hero } from "@/components/home/Hero";
import { Metrics } from "@/components/home/Metrics";
import { Principles } from "@/components/home/Principles";
import { ExpertisePreview } from "@/components/home/ExpertisePreview";
import { ClientWall } from "@/components/home/ClientWall";
import { EngagementsPreview } from "@/components/home/EngagementsPreview";
import { TeamPreview } from "@/components/home/TeamPreview";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { DiagnosticCta } from "@/components/home/DiagnosticCta";
import type { Locale } from "@/lib/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Hero locale={locale} />
      <Metrics locale={locale} />
      <Principles locale={locale} />
      <ExpertisePreview locale={locale} />
      <ClientWall locale={locale} />
      <EngagementsPreview locale={locale} />
      <TeamPreview locale={locale} />
      <InsightsPreview locale={locale} />
      <DiagnosticCta locale={locale} />
    </>
  );
}
