import { Database, Brain, Lightbulb, Handshake } from "lucide-react";

const steps = [
  {
    icon: Database,
    number: "01",
    title: "Data Collection",
    description: "We analyze public performance data, audience quality signals, and historical collaboration patterns.",
  },
  {
    icon: Brain,
    number: "02",
    title: "Trust Analysis",
    description: "Our algorithms calculate Trust Scores based on authenticity, consistency, and partnership reliability.",
  },
  {
    icon: Lightbulb,
    number: "03",
    title: "Explainable Insights",
    description: "Every score comes with clear explanations. See exactly what drives each recommendation.",
  },
  {
    icon: Handshake,
    number: "04",
    title: "Better Decisions",
    description: "Make partnership choices based on trust and fit, not vanity metrics. Track outcomes and improve continuously.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="section-header">How it works</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            From data to decision
          </h2>
          <p className="text-muted-foreground text-lg">
            A transparent process that puts intelligence in your hands.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute left-[39px] top-10 bottom-10 w-px bg-border" />

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="flex gap-6 md:gap-8 items-start"
                >
                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-card border border-border shadow-card flex flex-col items-center justify-center">
                      <step.icon className="w-6 h-6 text-accent mb-1" />
                      <span className="text-xs font-bold text-muted-foreground">{step.number}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-3">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
