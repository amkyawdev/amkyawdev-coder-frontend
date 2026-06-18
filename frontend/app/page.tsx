import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CoderAnimation } from "@/components/animations/CoderAnimation";
import { SearchAnimation } from "@/components/animations/SearchAnimation";
import { ConnectionAnimation } from "@/components/animations/ConnectionAnimation";
import { Sparkles, Zap, Shield, Code, Rocket, Brain } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-bg-light" />
        <div className="container px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <Badge className="mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0">
                <Sparkles className="w-4 h-4 mr-1" />
                AI-Powered Development
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Build Faster</span>
                <br />
                with AI Agents
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
                AmkyawDev provides cutting-edge AI agents for code generation, 
                debugging, and deployment. Transform your development workflow today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                  <Rocket className="w-5 h-5 mr-2" />
                  Get Started
                </Button>
                <Button size="lg" variant="outline">
                  View Demo
                </Button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <CoderAnimation size={400} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful AI Agents
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose from a variety of specialized AI agents designed to accelerate your development process
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Sparkles className="w-6 h-6" />}
              title="Skill Agents"
              description="Execute specialized skills for code review, bug detection, and documentation generation."
              gradient="from-indigo-500 to-purple-600"
            />
            <FeatureCard
              icon={<Code className="w-6 h-6" />}
              title="Long Chain Agent"
              description="Orchestrate complex multi-step workflows with chained AI operations."
              gradient="from-purple-500 to-pink-600"
            />
            <FeatureCard
              icon={<Brain className="w-6 h-6" />}
              title="Script Agent"
              description="Generate, optimize, and debug code scripts with AI assistance."
              gradient="from-pink-500 to-red-600"
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Fast Deployment"
              description="Deploy your projects to multiple cloud providers with a single click."
              gradient="from-yellow-500 to-orange-600"
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Secure & Reliable"
              description="Enterprise-grade security with encrypted data and secure deployments."
              gradient="from-green-500 to-emerald-600"
            />
            <FeatureCard
              icon={<SearchAnimation size={48} />}
              title="Smart Memory"
              description="AI-powered memory system that learns from your patterns and preferences."
              gradient="from-blue-500 to-cyan-600"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get started in minutes with our intuitive workflow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number={1}
              title="Create Workspace"
              description="Set up your development environment and connect your repositories."
            />
            <StepCard
              number={2}
              title="Choose Your Agent"
              description="Select from our library of specialized AI agents for your needs."
            />
            <StepCard
              number={3}
              title="Deploy & Scale"
              description="Deploy your projects and scale effortlessly across multiple platforms."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Development?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of developers using AmkyawDev to build faster and smarter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold gradient-text">AmkyawDev</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AmkyawDev. Built with AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  gradient 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  gradient: string; 
}) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${gradient} flex items-center justify-center text-white mb-4`}>
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

function StepCard({ 
  number, 
  title, 
  description 
}: { 
  number: number; 
  title: string; 
  description: string; 
}) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
