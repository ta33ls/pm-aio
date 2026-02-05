import { toolModules } from "@/lib/tool-modules";
import { ModuleCard, GradientButton } from "@/components";

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="container-wide py-24 md:py-40">
        <div className="max-w-3xl fade-in-up">
          {/* Main Headline */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#141413] leading-[1.1] mb-8">
            让产品思考，
            <br />
            如诗般流动
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-[#5E5D59] max-w-xl mb-10 leading-relaxed">
            为产品经理打造的智能工具集。从需求到交付，让每一步都优雅高效。
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <GradientButton href="/tools" size="lg">
              开始使用
            </GradientButton>
            <GradientButton href="#features" variant="secondary" size="lg">
              了解更多
            </GradientButton>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container-wide">
        <hr className="divider" />
      </div>

      {/* Features Section */}
      <section id="features" className="container-wide py-24">
        <div className="mb-16 fade-in">
          <h2 className="font-serif text-3xl md:text-4xl text-[#141413] mb-4">
            模块化工具，按需取用
          </h2>
          <p className="text-[#5E5D59] text-lg max-w-lg">
            每一个工具都是独立的效率单元，组合使用，威力倍增
          </p>
        </div>

        {/* Module Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {toolModules.map((module, index) => (
            <div
              key={module.id}
              className="fade-in-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <ModuleCard {...module} />
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section id="about" className="container-wide py-24">
        <div className="mb-16 fade-in">
          <h2 className="font-serif text-3xl md:text-4xl text-[#141413] mb-4">

          </h2>
          <p className="text-[#5E5D59] text-lg max-w-lg">

          </p>
        </div>
      </section>
    </div>
  );
}
