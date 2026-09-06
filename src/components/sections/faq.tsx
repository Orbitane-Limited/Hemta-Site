import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { faq } from "@/content/site";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-16 py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <SplitHeading
          id="faq-heading"
          className="text-3xl font-semibold tracking-[-0.02em] text-balance md:text-5xl"
        >
          {faq.heading}
        </SplitHeading>
        <Reveal className="mt-10">
          <Accordion type="single" collapsible className="w-full">
            {faq.items.map((item) => (
              <AccordionItem key={item.q} value={item.q}>
                <AccordionTrigger className="text-left text-[15px] font-medium md:text-base">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
